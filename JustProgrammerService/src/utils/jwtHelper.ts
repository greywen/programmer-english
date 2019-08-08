import * as jsonwebtoken from "jsonwebtoken";

import { JWTTokenModel } from "../model/user";
import config from "../common/config";
import { UnauthorizedException } from "../common/exception";

export async function generateTokenAsync(user: JWTTokenModel) {
    let expiredTimestamp = 24 * 60 * 60 * config.jwt.expired;
    let token = await jsonwebtoken.sign({ user: user }, config.jwt.secret, { expiresIn: expiredTimestamp });
    return token;
}

export async function verifyTokenAsync(token: string): Promise<JWTTokenModel> {
    if (!token) {
        throw new UnauthorizedException("用户未授权");
    }
    var _token = token.split(' ')[1];
    try {
        let verify = <IAuthResultModel>await jsonwebtoken.verify(_token, config.jwt.secret);
        return verify.user;
    } catch (e) {
        throw new UnauthorizedException("用户未授权");
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
    user: JWTTokenModel
}