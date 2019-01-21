import { getManager, EntityManager } from 'typeorm';

import { ListingsEntity } from '../entities';
import { IRepository } from './IRepository';
import { promiseWrapper, isEmpty } from '../utils';
import logging from '../utils/logging';

export class ListingRepository implements IRepository<ListingsEntity> {
    manager: EntityManager;

    constructor() {
        this.manager = getManager();
    }

    findQuery = (query: object = {}) => {
        return new Promise<ListingsEntity | []>(async (resolve, reject) => {
            const [listing, listingErr] = await promiseWrapper(
                this.manager.find(ListingsEntity, query)
            );
            if (listingErr) {
                logging.error(listingErr);

                return reject({ code: 500, message: listingErr.message });
            }

            if (!listing || isEmpty(listing)) {
                return resolve([]);
            }

            return resolve(listing);
        });
    };

    findOneQuery = (query: object = {}) => {
        return new Promise<ListingsEntity>(async (resolve, reject) => {
            const [listing, listingErr] = await promiseWrapper(
                this.manager.findOne(ListingsEntity, query)
            );
            if (listingErr) {
                logging.error(listingErr);

                return reject({ code: 500, message: listingErr.message });
            }

            if (!listing || isEmpty(listing)) {
                return reject({ code: 404, message: 'Listing not found' });
            }

            return resolve(listing);
        });
    };

    countQuery = (query: object = {}) => {
        return new Promise<number>(async (resolve, reject) => {
            const [count, countErr] = await promiseWrapper(
                this.manager.count(ListingsEntity, query)
            );
            if (countErr) {
                logging.error(countErr);

                return reject({ code: 500, message: countErr.message });
            }

            return resolve(count);
        });
    };

    findByDistance = (
        coords: { lat: number; lng: number },
        dist: number = 10,
        categoryIds: number[] = []
    ) => {
        return new Promise<ListingsEntity[]>(async (resolve, reject) => {
            const entityMetadata = this.manager.getRepository(ListingsEntity)
                .metadata;
            const tableName = entityMetadata.tableName;
            const { lat, lng } = coords;
            const miles = 3959;
            const queryParams: any = [lat, lng, lat, dist];

            let byCategoryIdQuery = '';
            // This is fragile check for the first
            // item in the array, supposedly if that
            // value exists it has non null values
            if (!!categoryIds[0]) {
                byCategoryIdQuery = `WHERE \`categories\` IN (?)`;
                queryParams.push(categoryIds);
            }

            // Get column names
            const keys = Object.keys(entityMetadata.propertiesMap).join(', ');

            const query = `SELECT ${keys}, (${miles} * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude)))) AS \`distance\` FROM \`${tableName}\` ${byCategoryIdQuery} HAVING \`distance\` <= ? ORDER BY \`distance\` ASC LIMIT 75`;

            const [listings, listingsErr] = await promiseWrapper(
                this.manager.query(query, queryParams)
            );
            if (listingsErr) {
                logging.error(listingsErr);

                return reject({ code: 500, message: listingsErr.message });
            }

            if (!listings || isEmpty(listings)) {
                return resolve([]);
            }

            return resolve(listings);
        });
    };
}
