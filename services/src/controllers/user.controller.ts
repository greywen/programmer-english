import { prefix, router, setUserInformation } from "../router";
import userService from "../services/user.service";
import { getBaiduApiTokenAsync } from "../utils/baiduApiUtils";
import { CustomKoaContextModel } from "../model/common.model";
import { UserFeedbackModel } from "../model/user";

@prefix("/user")
class UserController {
    @router({
        method: "post",
        path: "/login",
        unless: true
    })
    async login(ctx: CustomKoaContextModel) {
        let loginModel = ctx.request["body"];
        let loginResult = await userService.login(loginModel);

        let apiToken = <{ access_token: string }>await ctx.redis.getAsync("baiduApiToken");
        if (!apiToken) {
            apiToken! = await getBaiduApiTokenAsync();
            ctx.redis.setAsync("baiduApiToken", apiToken, 3600);
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
