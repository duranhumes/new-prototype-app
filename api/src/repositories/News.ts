import { getManager, EntityManager } from 'typeorm';

import { NewsEntity } from '../entities';
import { IRepository } from './IRepository';
import { promiseWrapper, isEmpty } from '../utils';
import logging from '../utils/logging';

export class NewsRepository implements IRepository<NewsEntity> {
    manager: EntityManager;

    constructor() {
        this.manager = getManager();
    }

    findQuery = (query: object = {}) => {
        return new Promise<NewsEntity | []>(async (resolve, reject) => {
            const [news, newsErr] = await promiseWrapper(
                this.manager.find(NewsEntity, query)
            );
            if (newsErr) {
                logging.error(newsErr);

                return reject({ code: 500, message: newsErr.message });
            }

            if (!news || isEmpty(news)) {
                return resolve([]);
            }

            return resolve(news);
        });
    };

    findOneQuery = (query: object = {}) => {
        return new Promise<NewsEntity>(async (resolve, reject) => {
            const [news, newsErr] = await promiseWrapper(
                this.manager.findOne(NewsEntity, query)
            );
            if (newsErr) {
                logging.error(newsErr);

                return reject({ code: 500, message: newsErr.message });
            }

            if (!news || isEmpty(news)) {
                return reject({ code: 404, message: 'News item not found' });
            }

            return resolve(news);
        });
    };

    countQuery = (query: object = {}) => {
        return new Promise<number>(async (resolve, reject) => {
            const [count, countErr] = await promiseWrapper(
                this.manager.count(NewsEntity, query)
            );
            if (countErr) {
                logging.error(countErr);

                return reject({ code: 500, message: countErr.message });
            }

            return resolve(count);
        });
    };
}
