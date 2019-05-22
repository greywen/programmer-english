import * as Koa from "koa";
import { JWTTokenModel } from "./user";

export interface IdNameModel {
    id?: number | string
    name?: string
}

export interface CustomKoaContextModel extends Koa.Context {
    user: JWTTokenModel
}

export interface MailOptions {
    from?: string,
    to?: string,
    subject?: string,
    text?: string,
    html?: string
}