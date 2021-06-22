import { Data } from '../types/request.type';

function isFile(value: unknown): value is File {
    return value instanceof File;
}

function isFileList(value: unknown): value is FileList {
    return value instanceof FileList;
}

function convertToFormData(data: Data['POST']): FormData {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        if (isFileList(value)) {
            for (let i = 0; i < value.length; i++) {
                const file = value[i];
                formData.append(key, file, file.name);
            }
        } else {
            if (isFile(value)) {
                formData.append(key, value, value.name);
            } else {
                formData.append(key, JSON.stringify(value)); // append 只接受string | Blob
            }
        }
    }

    return formData;
}

export default convertToFormData;
