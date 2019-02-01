import { format } from 'date-fns';

import { newsEndpoint } from '../../../api/Endpoints';
import { promiseWrapper } from '../../../utils';
import request from '../../../utils/request';

const r = request();

export async function makeNewsRequest({
    page,
    limit,
}: {
    page: number;
    limit: number;
}) {
    const [response, responseErr] = await promiseWrapper(
        r.get(`${newsEndpoint}?sort=date:desc&limit=${limit}&page=${page}`)
    );
    if (responseErr) {
        console.error(responseErr);

        return [];
    }

    return response.data.data.results;
}

const DAY_FORMAT = 'MMM DD GGGG';
export const formatDate = (date: string | Date) => format(date, DAY_FORMAT);

export { formatImageUrl } from '../../../utils';
