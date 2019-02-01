import { eventsEndpoint } from '../../../api/Endpoints';
import { promiseWrapper } from '../../../utils';
import request from '../../../utils/request';

const r = request();

export async function makeEventsRequest({
    page,
    limit,
}: {
    page: number;
    limit: number;
}) {
    const [response, responseErr] = await promiseWrapper(
        r.get(`${eventsEndpoint}?sort=start:desc&limit=${limit}&page=${page}`)
    );
    if (responseErr) {
        console.error(responseErr);

        return [];
    }

    return response.data.data.results;
}
