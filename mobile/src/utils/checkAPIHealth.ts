import request from './request';
import { healthEndpoint } from '../api/Endpoints';

export default async (cb: (...args: any) => any) => {
    const r = request();
    try {
        const check = await r.get(healthEndpoint);

        if (!check || !check.data) {
            throw Error('e');
        }
    } catch (error) {
        console.error({ error });
    }

    return cb();
};
