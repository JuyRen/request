import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import addURLParams from './helpers/addURLParams';
import convertToFormData from './helpers/convertToFormData';
import { Data, AxiosResult, Interceptors } from './types/main.type';

class Request {
    axios: AxiosInstance;
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

    get<T>(
        url: string,
        data?: Data['GET'],
        config?: AxiosRequestConfig
    ): AxiosResult<T> {
        url = addURLParams(url, data);

        return this.axios.get(url, config);
    }

    post<T>(
        url: string,
        data?: Data['POST'],
        config?: AxiosRequestConfig
    ): AxiosResult<T> {
        return this.axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            ...config
        });
    }

    postFile<T>(url: string, data: Data['POST_FILE']): AxiosResult<T> {
        const formData = convertToFormData(data);

        return this.axios.post(url, formData, {
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

export default Request;
