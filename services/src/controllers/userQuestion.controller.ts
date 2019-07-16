import { prefix, router, setUserInformation, cache, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import userQuestionService from "../services/userQuestion.service";
import { CreateUserQuestionAnswerModel } from "../model/userQuestion";
import { UserResource } from "../common/enums";

@prefix("/question")
class UserQuestionController {
    @router({
        method: "get",
        path: "/getQuestion",
        unless: true
    })
    @cache()
    async getQuestion(ctx: CustomKoaContextModel) {
        let _body = await userQuestionService.getUserQuestionAsync();
        let key = await ctx.redis.generateKeyAsync(ctx.request.url);
        await ctx.redis.setAsync(key, _body);
        ctx.body = _body;
    }

    @router({
        method: "post",
        path: "/createAswer",
        unless: false
    })
    // @required()
    @authorize([UserResource.QuertionAnswerCreate])
    async CreateQuertionAswer(ctx: CustomKoaContextModel) {
        let createModel = <CreateUserQuestionAnswerModel>ctx.request["body"];
        createModel.userId = ctx.user.id;
        ctx.body = await userQuestionService.createUserQuestionAswerAsync(createModel);
    }
}
