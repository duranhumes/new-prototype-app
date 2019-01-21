import checkAPIHealth from '../../../utils/checkAPIHealth';
import { listingsEndpoint, categoriesEndpoint } from '../../../api/Endpoints';
import { promiseWrapper } from '../../../utils';
import request from '../../../utils/request';

const r = request();

interface IListingRequestData {
    distance: number;
    category?: number;
    position: { latitude: number; longitude: number };
}
export async function makeListingsRequest(
    listingRequestData: IListingRequestData
) {
    return checkAPIHealth(async () => {
        const {
            distance,
            category,
            position: { latitude, longitude },
        } = listingRequestData;

        let categoryStr = '';
        if (category) {
            categoryStr = `category=${category}&`;
        }

        const url = `${listingsEndpoint}/distance?${categoryStr}distance=${distance}&coords=${latitude},${longitude}`;
        // const url = `${listingsEndpoint}/distance?${categoryStr}distance=${distance}&coords=25.025885,-78.035889`;
        const [response, responseErr] = await promiseWrapper(r.get(url));
        if (responseErr) {
            console.error(responseErr);

            return [];
        }

        return response.data.data;
    });
}

export async function makeCategoriesRequest() {
    return checkAPIHealth(async () => {
        const [response, responseErr] = await promiseWrapper(
            r.get(categoriesEndpoint)
        );
        if (responseErr) {
            console.error(responseErr);

            return [];
        }

        return response.data.data.results;
    });
}
