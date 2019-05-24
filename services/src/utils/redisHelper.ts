import * as redis from 'redis';
import { RedisClient } from 'redis';
import config from '../common/config';
import logger from './logger';

export class RedisService {
    private client: RedisClient;
    constructor() {
        this.connect();
    }

    private connect() {
        this.client = redis.createClient(config.redis);
        this.client.on('error', (error) => {
            logger.error(error);
        });

        this.client.on('ready', () => { });
    }

    public async setAsync(key: string, value: string | object, expire: number = 24 * 60 * 60) {
        let _value = value;
        if (typeof value === "object") {
            _value = JSON.stringify(value);
        }

        if (!_value) return;

        if (expire) {
            await this.client.setex(key, expire, _value);
        }
        else {
            await this.client.set(key, _value);
        }
    }

    public async getAsync(key: string): Promise<object> {
        return await new Promise((resolve, reject) => {
            this.client.get(key, (error: Error, data: string) => {
                if (error) {
                    logger.error(error);
                }
                if (data) {
                    resolve(JSON.parse(data));
                }
                resolve(null);
            })
        })
    }
}