import axios, { AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../utils/getToken';

enum httpMethod {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE'
}

export class BaseService {
    protected request = async (httpMethod: httpMethod, url: string, data?: any, contentType: string = 'application/json') => {
        let config = {
            method: httpMethod,
            url: url,
            baseURL: `http://130.61.226.141:3000/releese`,
            headers: {
                "Content-Type": contentType
            },
        };

        Object.assign(config.headers, { 'Authorization': `Bearer ${getToken()}` });

        if (data) {
            Object.assign(config, { 'data': data })
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error: any) {
            const data = error.response;
            return data.data;
        }
    };

    protected async get(path: string) {
        return this.request(httpMethod.get, path);
    };

    protected async post(path: string, body: any) {
        return this.request(httpMethod.post, path, body);
    };

    protected async put(path: string, body: any) {
        return this.request(httpMethod.put, path, body);
    };

    protected async delete(path: string) {
        return this.request(httpMethod.delete, path);
    };
};
