import * as Koa from "koa";
import { JWTTokenModel } from "./user";

export interface IdNameModel {
    id?: number | string
    name?: string
}

export interface CustomKoaContextModel extends Koa.Context {
    user: JWTTokenModel,
    redis: IRedis
    redisOptions: IRedisOptions
}

interface IRedis {
    setAsync(key: string, value: string | object, expire?: number),
    getAsync(key: string): Promise<object>,
    generateKeyAsync(key: string | object): string
}

export interface MailOptions {
    from?: string,
    to?: string,
    subject?: string,
    text?: string,
    html?: string
}

export interface IdName {
    id: number,
    name: string
}

export interface IRedisOptions {
    key?: string,
    expire?: number,
    whetherCache?: boolean
}