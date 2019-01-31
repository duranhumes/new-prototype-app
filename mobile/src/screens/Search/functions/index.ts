import { searchEndpoint } from '../../../api/Endpoints';
import { promiseWrapper } from '../../../utils';
import request from '../../../utils/request';

const r = request();

export async function makeSearchRequest(query: string) {
    const [response, responseErr] = await promiseWrapper(
        r.get(`${searchEndpoint}?query=${query}&territory=bahamas&limit=100`)
    );
    if (responseErr) {
        console.error(responseErr);

        return [];
    }

    return response.data.results;
}
