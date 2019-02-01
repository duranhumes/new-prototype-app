import { Router, Response, Request } from 'express';

import * as httpMessages from '../../utils/httpMessages';
import { EventsRepository } from '../../repositories';
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
    eventsRepo: EventsRepository;

    constructor() {
        this.router = Router();
        this.routes();

        this.eventsRepo = new EventsRepository();
    }

    routes() {
        this.router.get('/', this.getEvents);
    }

    getEvents = async (req: Request, res: Response) => {
        const params = req.query;
        const url = formatURL(req);
        const pagination = createPaginationObject({
            limit: Number(escapeString(params.limit)),
            page: Number(escapeString(params.page)),
        });
        const links = createLinksObject(url, pagination);

        // Replace api url names with actual db column names
        const sortStr = params.sort
            .replace('shortDescription', 'short_description')
            .replace('fullDescription', 'full_description')
            .replace('startDate', 'start')
            .replace('endDate', 'end');

        const sort = createSortObject(sortStr);
        const query = { ...pagination, ...sort };

        const [events, eventsErr] = await promiseWrapper(
            this.eventsRepo.findQuery(query)
        );
        if (eventsErr) {
            logging.error(eventsErr);

            return res.status(500).json(httpMessages.code500());
        }

        const [count, countErr] = await promiseWrapper(
            this.eventsRepo.countQuery(query)
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
            const response = filterEntity(events, fields);

            return res.status(200).json(
                httpMessages.code200({
                    metadata,
                    results: response,
                })
            );
        }

        return res
            .status(200)
            .json(httpMessages.code200({ metadata, results: events }));
    };
}

export const EventsController = new Controller().router;
