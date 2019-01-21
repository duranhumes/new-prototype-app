import { getManager, EntityManager } from 'typeorm';

import { CategoryEntity } from '../entities';
import { IRepository } from './IRepository';
import { promiseWrapper, isEmpty } from '../utils';
import logging from '../utils/logging';

export class CategoryRepository implements IRepository<CategoryEntity> {
    manager: EntityManager;

    constructor() {
        this.manager = getManager();
    }

    findQuery = (query: object = {}) => {
        return new Promise<CategoryEntity | []>(async (resolve, reject) => {
            const [category, categoryErr] = await promiseWrapper(
                this.manager.find(CategoryEntity, query)
            );
            if (categoryErr) {
                logging.error(categoryErr);

                return reject({ code: 500, message: categoryErr.message });
            }

            if (!category || isEmpty(category)) {
                return resolve([]);
            }

            return resolve(category);
        });
    };

    findOneQuery = (query: object = {}) => {
        return new Promise<CategoryEntity>(async (resolve, reject) => {
            const [category, categoryErr] = await promiseWrapper(
                this.manager.findOne(CategoryEntity, query)
            );
            if (categoryErr) {
                logging.error(categoryErr);

                return reject({ code: 500, message: categoryErr.message });
            }

            if (!category || isEmpty(category)) {
                return reject({ code: 404, message: 'Category not found' });
            }

            return resolve(category);
        });
    };

    countQuery = (query: object = {}) => {
        return new Promise<number>(async (resolve, reject) => {
            const [count, countErr] = await promiseWrapper(
                this.manager.count(CategoryEntity, query)
            );
            if (countErr) {
                logging.error(countErr);

                return reject({ code: 500, message: countErr.message });
            }

            return resolve(count);
        });
    };
}
