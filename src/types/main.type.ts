import { AxiosInstance, AxiosResponse } from 'axios';

export interface Interceptors {
    request?: Parameters<AxiosInstance['interceptors']['request']['use']>;
    response?: Parameters<AxiosInstance['interceptors']['response']['use']>;
}

export interface Data {
    GET: {
        [key: string]: string | number | boolean | undefined;
    };

    POST: {
        [key: string]: unknown;
    };

    POST_FILE: {
        [key: string]: unknown;
    };

    DELETE: {
        [key: string]: unknown;
    };
}

export type AxiosResult<T> = Promise<AxiosResponse<T>>;
