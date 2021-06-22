import { Data } from '../types/request.type';

function addURLParams<T extends Data['GET']>(url: string, data?: T): string {
    if (!data) return url;

    for (const [key, value] of Object.entries(data)) {
        if (typeof value !== 'undefined' && value !== null) {
            url += url.indexOf('?') === -1 ? '?' : '&';
            url += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
    }

    return url;
}

export default addURLParams;
