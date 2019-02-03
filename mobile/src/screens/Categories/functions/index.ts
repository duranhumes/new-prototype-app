import { categoriesEndpoint } from '../../../api/Endpoints';
import { promiseWrapper } from '../../../utils';
import request from '../../../utils/request';

interface IPagination {
    page: number;
    limit: number;
}

const r = request();

export async function makeCategoriesRequest({
    page,
    limit,
}: {
    page: number;
    limit: number;
}) {
    const [response, responseErr] = await promiseWrapper(
        r.get(
            `${categoriesEndpoint}?sort=title:asc&limit=${limit}&page=${page}&fields=id,title`
        )
    );
    if (responseErr) {
        console.error(responseErr);

        return [];
    }

    return response.data.data.results;
}

export async function makeListingsFromCategoryRequest(
    categoryId: number,
    { page, limit }: IPagination
) {
    const [response, responseErr] = await promiseWrapper(
        r.get(
            `${categoriesEndpoint}/${categoryId}/listings?sort=title:desc&limit=${limit}&page=${page}`
        )
    );
    if (responseErr) {
        console.error(responseErr);

        return [];
    }

    return response.data.data.results;
}
