import checkAPIHealth from '../../../utils/checkAPIHealth';
import { listingsEndpoint } from '../../../api/Endpoints';
import { promiseWrapper } from '../../../utils';
import request from '../../../utils/request';

interface IListingRequestData {
    distance: number;
    category?: number;
    position: { latitude: number; longitude: number };
}

const r = request();

export async function makeListingsRequest(
    listingRequestData: IListingRequestData
): Promise<any[]> {
    return checkAPIHealth(async () => {
        try {
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
            const [response, responseErr] = await promiseWrapper<any>(
                r.get(url)
            );
            if (responseErr) {
                console.error(responseErr);
                return [];
            }

            return response.data.data;
        } catch (error) {
            console.error({ error });
        }
    });
}
