import { AxiosInstance, AxiosResponse } from 'axios';

export interface Interceptors {
    request?: Parameters<AxiosInstance['interceptors']['request']['use']>;
    response?: Parameters<AxiosInstance['interceptors']['response']['use']>;
}

export interface Data {
    GET: {
        [key: string]: string | number | boolean | undefined | null;
    };

    POST: {
        [key: string]: unknown;
    };

    PUT: {
        [key: string]: unknown;
    };

    DELETE: {
        [key: string]: unknown;
    };

    POST_FORM: {
        [key: string]: unknown;
    };

    PUT_FORM: {
        [key: string]: unknown;
    };

    DELETE_FORM: {
        [key: string]: unknown;
    };
}

export type AxiosResult<T> = Promise<AxiosResponse<T>>;
