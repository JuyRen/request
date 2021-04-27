import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import addURLParams from './helpers/addURLParams';
import convertToFormData from './helpers/convertToFormData';
import { Data, AxiosResult, Interceptors } from './types/main.type';

class Http {
    axios: AxiosInstance;
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

    get<T>(url: string, data?: Data['GET']): AxiosResult<T> {
        url = addURLParams(url, data);

        return this.axios.get(url);
    }

    post<T>(url: string, data: Data['POST']): AxiosResult<T> {
        return this.axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
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

export default Http;
