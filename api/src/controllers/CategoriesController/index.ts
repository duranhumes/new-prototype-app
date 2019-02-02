import { Router, Response, Request } from 'express';

import * as httpMessages from '../../utils/httpMessages';
import { CategoryRepository, ListingRepository } from '../../repositories';
import { validationRules, validationFunc } from './validation';
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
    listingsRepo: ListingRepository;

    constructor() {
        this.router = Router();
        this.routes();

        this.categoriesRepo = new CategoryRepository();
        this.listingsRepo = new ListingRepository();
    }

    routes() {
        this.router.get('/', this.getCategories);
        this.router.get(
            '/:categoryId/listings',
            [...validationRules.getListingsFromCategoryId],
            validationFunc,
            this.getListingsFromCategory
        );
    }

    getCategories = async (req: Request, res: Response) => {
        const params = req.query;
        const url = formatURL(req);
        const pagination = createPaginationObject({
            limit: params.limit,
            page: params.page,
        });
        const links = createLinksObject(url, pagination);
        // Replace api url names with actual db column names
        const sortStr = params.sort && params.sort.replace('title', 'category');

        const sort = createSortObject(sortStr);
        const query = { ...pagination, ...sort };

        const [categories, categoriesErr] = await promiseWrapper(
            this.categoriesRepo.findQuery()
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

    getListingsFromCategory = async (req: Request, res: Response) => {
        const params = req.query;
        const url = formatURL(req);
        const pagination = createPaginationObject({
            limit: params.limit,
            page: params.page,
        });
        const links = createLinksObject(url, pagination);
        // Replace api url names with actual db column names
        const sortStr = params.sort.replace('title', 'category');

        const sort = createSortObject(sortStr);
        const query = { ...pagination, ...sort };
        const { categoryId } = params;

        const [[listings, totalCount], listingsErr] = await promiseWrapper(
            this.listingsRepo.findListingsByCategoryId(categoryId, query)
        );
        if (listingsErr) {
            logging.error(listingsErr);

            return res.status(500).json(httpMessages.code500());
        }

        const metadata = {
            links,
            total: totalCount,
        };

        if (params.fields) {
            const fields = params.fields
                .split(',')
                .map((f: string) => escapeString(f));
            const response = filterEntity(listings, fields);

            return res.status(200).json(
                httpMessages.code200({
                    metadata,
                    results: response,
                })
            );
        }

        return res
            .status(200)
            .json(httpMessages.code200({ metadata, results: listings }));
    };
}

export const CategoriesController = new Controller().router;
