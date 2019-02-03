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
        categoryId: number
    ) => {
        return new Promise<ListingsEntity[]>(async (resolve, reject) => {
            const entityMetadata = this.manager.getRepository(ListingsEntity)
                .metadata;
            const tableName = entityMetadata.tableName;
            const pivotTableName = 'items_to_categories';
            const columnNames = Object.keys(entityMetadata.propertiesMap).join(
                ', '
            );
            const { lat, lng } = coords;
            const miles = 3959;
            const queryParams: any = [lat, lng, lat];

            let listingIdsQuery = '';
            if (!!categoryId) {
                const [listingIdsFromCategory] = await promiseWrapper(
                    this.manager.query(
                        `SELECT item AS listingId FROM \`${pivotTableName}\` WHERE \`category\` = ?`,
                        [categoryId]
                    )
                );

                if (!isEmpty(listingIdsFromCategory)) {
                    const listingIds = listingIdsFromCategory.map(
                        (v: any) => v.listingId
                    );
                    listingIdsQuery = `WHERE \`id\` IN (?)`;
                    queryParams.push(listingIds);
                }
            }

            queryParams.push(dist);

            const query = `SELECT ${columnNames}, (${miles} * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude)))) AS \`distance\` FROM \`${tableName}\` ${listingIdsQuery} HAVING \`distance\` <= ? ORDER BY \`distance\` ASC LIMIT 75`;

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

    findListingsByCategoryId = (
        categoryId: number,
        params: { [key: string]: any } = {}
    ) => {
        return new Promise<any[]>(async (resolve, reject) => {
            const entityMetadata = this.manager.getRepository(ListingsEntity)
                .metadata;
            const tableName = entityMetadata.tableName;
            const columnNames = Object.keys(entityMetadata.propertiesMap).join(
                ', '
            );
            const pivotTableName = 'items_to_categories';

            const [
                listingIdsFromCategory,
                listingIdsFromCategoryErr,
            ] = await promiseWrapper(
                this.manager.query(
                    `SELECT item AS listingId FROM \`${pivotTableName}\` WHERE \`category\` = ?`,
                    [Number(categoryId)]
                )
            );
            if (listingIdsFromCategoryErr) {
                logging.error(listingIdsFromCategoryErr);

                return reject({
                    code: 500,
                    message: listingIdsFromCategoryErr.message,
                });
            }

            const listingIds = listingIdsFromCategory.map(
                ({ listingId }: { listingId: number }) => Number(listingId)
            );

            if (!listingIds || isEmpty(listingIds)) {
                return resolve([[], 0]);
            }

            /**
             * This can definitely be improved,
             * couldn't find a working answer with
             * just typeorm which would have kept this
             * cleaner with the sorting and pagination.
             */
            const { take, skip, order } = params;
            const sortColumnName = Object.keys(order)[0];
            const sortDirection = Object.values(order)[0];
            const [listings, listingsErr] = await promiseWrapper(
                this.manager.query(
                    `SELECT ${columnNames} FROM \`${tableName}\` WHERE \`id\` IN (?) ORDER BY ? ? LIMIT ? OFFSET ?`,
                    [listingIds, sortColumnName, sortDirection, take, skip]
                )
            );
            if (listingsErr) {
                logging.error(listingsErr);

                return reject({ code: 500, message: listingsErr.message });
            }

            const totalListingsForCategory = listingIds.length;

            return resolve([listings, totalListingsForCategory]);
        });
    };
}
