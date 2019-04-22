import * as jsonwebtoken from "jsonwebtoken";

import { UserModel } from "../model/user";
import config from "../common/config";

export async function generateTokenAsync(user: UserModel) {
    let expiredTimestamp = 24 * 60 * 60 * config.jwt.expired;
    let token = await jsonwebtoken.sign({ user: user }, config.jwt.secret, { expiresIn: expiredTimestamp });
    return token;
}

export async function verifyTokenAsync(token: string): Promise<UserModel> {
    if (!token) {
        // TO DO: 401
    }
    token = token.split(' ')[1];
    try {
        let verify = <IAuthResultModel>await jsonwebtoken.verify(token, config.jwt.secret);
        return verify.user;
    } catch (e) {
        throw e;
    }
}

export async function getUserId(token: string) {
    if (!token) {
        return 0;
    }
    token = token.split(' ')[1];
    let verify = <IAuthResultModel>await jsonwebtoken.verify(token, config.jwt.secret);
    return verify ? verify.user.id : 0;
}

export interface IAuthResultModel {
    exp: number,
    iat: number,
    user: UserModel
}