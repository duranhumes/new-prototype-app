import axios, { AxiosRequestConfig } from 'axios';

export default (opts?: AxiosRequestConfig) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (opts && opts.headers) {
        Object.assign(headers, opts.headers);
    }

    return axios.create({
        headers,
        timeout: 5000,
        maxRedirects: 10,
        maxContentLength: 10 * 1024 * 1024, // 10mb
        withCredentials: true,
        ...opts,
    });
};
