import { Router, Response, Request } from 'express';

import * as httpMessages from '../../utils/httpMessages';
import { validationRules, validationFunc } from './validation';
import { ListingRepository } from '../../repositories';
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
    listingsRepo: ListingRepository;

    constructor() {
        this.router = Router();
        this.routes();

        this.listingsRepo = new ListingRepository();
    }

    routes() {
        this.router.get('/', this.getListings);
        this.router.get(
            '/distance',
            [...validationRules.getListingsByDistance],
            validationFunc,
            this.getListingsByDistance
        );
    }

    getListingsByDistance = async (req: Request, res: Response) => {
        const params = req.query;
        const categoryId = Number(escapeString(params.categoryId));
        const coordsParts = escapeString(params.coords).split(',');
        const coords = {
            lat: Number(coordsParts[0]),
            lng: Number(coordsParts[1]),
        };
        const distance = Number(escapeString(params.distance));

        const [listings, listingsErr] = await promiseWrapper(
            this.listingsRepo.findByDistance(coords, distance, [categoryId])
        );
        if (listingsErr) {
            logging.error(listingsErr);

            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(listings));
    };

    getListings = async (req: Request, res: Response) => {
        const params = req.query;
        const url = formatURL(req);
        const pagination = createPaginationObject({
            limit: Number(escapeString(params.limit)),
            page: Number(escapeString(params.page)),
        });
        const links = createLinksObject(url, pagination);
        const sort = createSortObject(params.sort);
        const query = { ...pagination, ...sort };

        const [listings, listingsErr] = await promiseWrapper(
            this.listingsRepo.findQuery(query)
        );
        if (listingsErr) {
            logging.error(listingsErr);

            return res.status(500).json(httpMessages.code500());
        }

        const [count, countErr] = await promiseWrapper(
            this.listingsRepo.countQuery(query)
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

export const ListingsController = new Controller().router;
