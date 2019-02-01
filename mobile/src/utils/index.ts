import * as uuid from 'uuid/v4';
import { format } from 'date-fns';

/**
 * Check if object is plain or has extra properties
 * like a date object.
 *
 * @param {object} obj
 *
 * @returns boolean
 */
export function isPlainObject(obj: object) {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        obj.constructor === Object &&
        Object.prototype.toString.call(obj) === '[object Object]'
    );
}

/**
 *
 * @param {object} obj
 *
 * Check if object is empty
 *
 * @returns boolean
 */
export function isEmpty(obj: object) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

/**
 *
 * @param {object} obj
 * @param {array} keys
 *
 * Returns new object with only keys
 * specified in keys param
 */
export function pick(obj: object, keys: string[]) {
    return Object.assign(
        {},
        ...keys.map(k => (k in obj ? { [k]: obj[k] } : {}))
    );
}

/**
 *
 * @param {promise} promise
 *
 * Returns the value from a promise and an error if it exists.
 *
 * @returns {array} [value, error]
 */
interface CustomError extends Error {
    code: string | number;
}
export async function promiseWrapper<E = CustomError>(
    promise: Promise<any>
): Promise<[any | undefined, undefined | E]> {
    try {
        return [await promise, undefined];
    } catch (e) {
        return [undefined, e];
    }
}

/**
 *
 * @param {object} obj
 * @param {array} keys
 *
 * Returns new object without keys
 * specified in keys param
 */
export function reject(obj: object, keys: string[]) {
    return Object.assign(
        {},
        ...Object.keys(obj)
            .filter(k => !keys.includes(k))
            .map(k => ({ [k]: obj[k] }))
    );
}

/**
 *
 * @param {object} entity
 * @param {array} fields
 *
 * @returns An object with all entity
 * properties except fields specified
 */
export function filterEntity(
    entity: object = {},
    fields: string[] = []
): object {
    const fieldsToExclude = ['password'].concat(fields);

    // If entity param is an array of entities loop through
    // and return the new array.
    if (Array.isArray(entity)) {
        return entity.map(e => {
            Object.assign(e, entityRecurse(e, fieldsToExclude));

            return reject(e, fieldsToExclude);
        });
    }

    Object.assign(entity, entityRecurse(entity, fieldsToExclude));

    return reject(entity, fieldsToExclude);
}

function entityRecurse(obj: object = {}, fieldsToExclude: string[]) {
    for (const key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            Object.assign(obj, {
                [key]: filterEntity(obj[key], fieldsToExclude),
            });
        }
    }

    return obj;
}

/**
 * Boils uuid string down to only numbers and letters
 *
 * @returns string
 */
export function formattedUUID() {
    return uuid().replace(/[^a-z0-9]/gi, '');
}

/**
 * Formats url for image component
 *
 * @param str image filename i.e. dsD3Iw.jpg
 *
 * @returns formated url for an image component
 */
export const formatImageUrl = (str: string) =>
    `https://www.bahamaslocal.com/img/news/${str}`;

/**
 * Formats a date string / object for display
 *
 * @param date a valid date string / object
 *
 * @returns formatted date string i.e. `May 10, 2018`
 */
const DAY_FORMAT = 'MMM DD GGGG';
export const formatDate = (date: string | Date) => format(date, DAY_FORMAT);
