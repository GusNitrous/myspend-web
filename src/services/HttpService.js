import axios from 'axios';
import APP_CONFIG from '../config/AppConfig';

let HttpServiceInstance = null;

/**
 * HttpService.
 */
export default class HttpService {
    static getInstance() {
        if (!HttpServiceInstance) {
            HttpServiceInstance = new HttpService();
        }

        return HttpServiceInstance;
    }

    constructor() {
        if (HttpServiceInstance) {
            throw new Error('Нельзя создать более одного экземпляра класса');
        }

        axios.defaults.baseURL = APP_CONFIG.http.gateway;
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, params).then((res) => {
                if (res.data.error) {
                    reject(res.data);
                } else {
                    resolve(res.data);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then((res) => {
                if (res.data.error) {
                    reject(res.data);
                } else {
                    resolve(res.data);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
