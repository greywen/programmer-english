import { observable } from 'mobx'
import { request } from '../utils/request';

export class BaseStore {
    @observable
    loading: boolean = true;

    get = (url: string, data?: object, loading: boolean = true) => {
        this.loading = loading;
        return this.request(url, "GET", data);
    }

    post = (url: string, data?: object, loading: boolean = true) => {
        this.loading = loading;
        return this.request(url, "POST", data);
    }

    private request(url: string, method: 'GET' | 'POST', data?: object): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await request({ url: url, method: method, data: data }).then((data) => {
                this.loading = false;
                resolve(data);
            }).catch(() => {
                this.loading = false;
                reject();
            });
        });
    }
}