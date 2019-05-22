import * as Koa from "koa";

import { prefix, router, setUserInformation } from "../router";
import userService from "../services/user.service";
import { getBaiduApiTokenAsync } from "../utils/baiduApiUtils";
import { redis } from "../app";
import { CustomKoaContextModel } from "../model/common.model";
import { UserFeedbackModel } from "../model/user";

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

        loginResult ? loginResult.apiAccessToken = apiToken.access_token : loginResult = { apiAccessToken: apiToken.access_token, resourceIds: [] };

        ctx.body = loginResult;
    }

    @router({
        method: "post",
        path: "/createFeedback",
        unless: false
    })
    // @required()
    @setUserInformation
    async createFeedback(ctx: CustomKoaContextModel) {
        let feedback = <UserFeedbackModel>ctx.request["body"];
        feedback.userId = ctx.user.id;
        ctx.body = await userService.createFeedbackAsync(feedback);
    }
}
