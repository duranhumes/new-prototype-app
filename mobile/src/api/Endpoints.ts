const BASE_URL = 'http://localhost:8000/v1';
const SEARCH_URL = 'http://search.orangecay.com';

export const healthEndpoint = `${BASE_URL}/_healthz`;
export const newsEndpoint = `${BASE_URL}/news`;
export const eventsEndpoint = `${BASE_URL}/events`;
export const searchEndpoint = `${SEARCH_URL}/search`;
export const listingsEndpoint = `${BASE_URL}/listings`;
export const categoriesEndpoint = `${BASE_URL}/categories`;
