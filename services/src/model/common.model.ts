import * as Koa from "koa";
import { UserModel } from "./user";

export interface IdNameModel {
    id?: number | string
    name?: string
}

export interface CustomKoaContextModel extends Koa.Context {
    user: UserModel
}

export interface MailOptions {
    from?: string,
    to?: string,
    subject?: string,
    text?: string,
    html?: string
}