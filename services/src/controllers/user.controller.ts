import * as Koa from "koa";

import { prefix, router } from "../router";
import userService from "../services/user.service";
import { getBaiduApiTokenAsync } from "../utils/baiduApiUtils";
import { redis } from "../app";

@prefix("/user")
class UserController {
    @router({
        method: "post",
        path: "/login",
        unless: true
    })
    async login(ctx: Koa.Context) {
        let loginModel = ctx.request["body"];
        let loginResult = await userService.login(loginModel);

        let apiToken = <{ access_token: string }>await redis.getAsync(ctx.request.url);
        if (!apiToken) {
            apiToken! = await getBaiduApiTokenAsync();
            redis.setAsync(ctx.request.url, apiToken, 3600);
        }

        loginResult ? loginResult.apiAccessToken = apiToken.access_token : loginResult = { apiAccessToken: apiToken.access_token };

        ctx.body = loginResult;
    }
}
