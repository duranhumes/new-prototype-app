import { Router, Response, Request } from 'express';

import * as httpMessages from '../../utils/httpMessages';
import { NewsRepository } from '../../repositories';
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
    newsRepo: NewsRepository;

    constructor() {
        this.router = Router();
        this.routes();

        this.newsRepo = new NewsRepository();
    }

    routes() {
        this.router.get('/', this.getNews);
    }

    getNews = async (req: Request, res: Response) => {
        const params = req.query;
        const url = formatURL(req);
        const pagination = createPaginationObject({
            limit: Number(escapeString(params.limit)),
            page: Number(escapeString(params.page)),
        });
        const links = createLinksObject(url, pagination);

        // Replace api url names with actual db column names
        const sortStr = params.sort
            .replace('date', 'news_date')
            .replace('heading', 'news_heading');

        const sort = createSortObject(sortStr);
        const query = { ...pagination, ...sort };

        const [news, newsErr] = await promiseWrapper(
            this.newsRepo.findQuery(query)
        );
        if (newsErr) {
            logging.error(newsErr);

            return res.status(500).json(httpMessages.code500());
        }

        const [count, countErr] = await promiseWrapper(
            this.newsRepo.countQuery(query)
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
            const response = filterEntity(news, fields);

            return res.status(200).json(
                httpMessages.code200({
                    metadata,
                    results: response,
                })
            );
        }

        return res
            .status(200)
            .json(httpMessages.code200({ metadata, results: news }));
    };
}

export const NewsController = new Controller().router;
