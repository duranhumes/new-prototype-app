import { Router, Response, Request } from 'express';

import * as httpMessages from '../../utils/httpMessages';
// import { validationRules, validationFunc } from './validation';
import { CategoryRepository } from '../../repositories';
import {
    formatURL,
    promiseWrapper,
    createPaginationObject,
    createLinksObject,
    createSortObject,
    escapeString,
    filterEntity,
} from '../../utils';
import logging from '../../utils/logging';

class Controller {
    router: Router;
    categoriesRepo: CategoryRepository;

    constructor() {
        this.router = Router();
        this.routes();

        this.categoriesRepo = new CategoryRepository();
    }

    routes() {
        this.router.get('/', this.getCategories);
    }

    getCategories = async (req: Request, res: Response) => {
        const params = req.query;
        const url = formatURL(req);
        const pagination = createPaginationObject({
            limit: params.limit,
            page: params.page,
        });
        const links = createLinksObject(url, pagination);
        const sort = createSortObject(params.sort);
        const query = { ...pagination, ...sort };

        const [categories, categoriesErr] = await promiseWrapper(
            this.categoriesRepo.findQuery(query)
        );
        if (categoriesErr) {
            logging.error(categoriesErr);

            return res.status(500).json(httpMessages.code500());
        }

        const [count, countErr] = await promiseWrapper(
            this.categoriesRepo.countQuery(query)
        );
        if (countErr) {
            logging.error(countErr);

            return res.status(500).json(httpMessages.code500());
        }

        const metadata = {
            links,
            total: count,
        };

        if (params.fields) {
            const fields = params.fields
                .split(',')
                .map((f: string) => escapeString(f));
            const response = filterEntity(categories, fields);

            return res.status(200).json(
                httpMessages.code200({
                    metadata,
                    results: response,
                })
            );
        }

        return res
            .status(200)
            .json(httpMessages.code200({ metadata, results: categories }));
    };
}

export const CategoriesController = new Controller().router;
