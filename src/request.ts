import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import addURLParams from './helpers/addURLParams';
import convertToFormData from './helpers/convertToFormData';
import { Data, Interceptors } from './types/request.type';

export default class Request {
    static CancelToken = axios.CancelToken;

    constructor(config?: AxiosRequestConfig, interceptors?: Interceptors) {
        this.axios = axios.create(config);

        if (interceptors) {
            const { request, response } = interceptors;

            if (request) {
                this.axios.interceptors.request.use(...request);
            }

            if (response) {
                this.axios.interceptors.response.use(...response);
            }
        }
    }

    axios: AxiosInstance;

    // 返回Promise<T> 而不是Promise<AxiosResponse<T>>
    // 会在业务级别的拦截器中，处理Promise<AxiosResponse<T>>， 最后返回Promise<T>
    get<T>(
        url: string,
        data?: Data['GET'],
        config?: AxiosRequestConfig
    ): Promise<T> {
        url = addURLParams(url, data);
        return this.axios.get(url, config);
    }

    post<T>(
        url: string,
        data?: Data['POST'],
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            ...config
        });
    }

    put<T>(
        url: string,
        data?: Data['PUT'],
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            ...config
        });
    }

    delete<T>(
        url: string,
        data?: Data['DELETE'],
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.axios.delete(url, {
            data,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            ...config
        });
    }

    postForm<T>(url: string, data: Data['POST_FORM']): Promise<T> {
        const formData = convertToFormData(data);

        return this.axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    putForm<T>(url: string, data: Data['PUT_FORM']): Promise<T> {
        const formData = convertToFormData(data);

        return this.axios.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    deleteForm<T>(url: string, data: Data['DELETE_FORM']): Promise<T> {
        const formData = convertToFormData(data);

        return this.axios.delete(url, {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    getFile(url: string): Promise<Blob> {
        return this.axios
            .get(url, {
                responseType: 'blob'
            })
            .then(res => res.data);
    }
}
