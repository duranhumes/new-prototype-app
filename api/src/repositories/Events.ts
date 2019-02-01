import { getManager, EntityManager } from 'typeorm';

import { EventsEntity } from '../entities';
import { IRepository } from './IRepository';
import { promiseWrapper, isEmpty } from '../utils';
import logging from '../utils/logging';

export class EventsRepository implements IRepository<EventsEntity> {
    manager: EntityManager;

    constructor() {
        this.manager = getManager();
    }

    findQuery = (query: object = {}) => {
        return new Promise<EventsEntity | []>(async (resolve, reject) => {
            const [events, eventsErr] = await promiseWrapper(
                this.manager.find(EventsEntity, query)
            );
            if (eventsErr) {
                logging.error(eventsErr);

                return reject({ code: 500, message: eventsErr.message });
            }

            if (!events || isEmpty(events)) {
                return resolve([]);
            }

            return resolve(events);
        });
    };

    findOneQuery = (query: object = {}) => {
        return new Promise<EventsEntity>(async (resolve, reject) => {
            const [events, eventsErr] = await promiseWrapper(
                this.manager.findOne(EventsEntity, query)
            );
            if (eventsErr) {
                logging.error(eventsErr);

                return reject({ code: 500, message: eventsErr.message });
            }

            if (!events || isEmpty(events)) {
                return reject({ code: 404, message: 'Event not found' });
            }

            return resolve(events);
        });
    };

    countQuery = (query: object = {}) => {
        return new Promise<number>(async (resolve, reject) => {
            const [count, countErr] = await promiseWrapper(
                this.manager.count(EventsEntity, query)
            );
            if (countErr) {
                logging.error(countErr);

                return reject({ code: 500, message: countErr.message });
            }

            return resolve(count);
        });
    };
}
