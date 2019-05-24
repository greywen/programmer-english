import { prefix, router, setUserInformation, cache } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import userQuestionService from "../services/userQuestion.service";
import { CreateUserQuestionAnswerModel } from "../model/userQuestion";

@prefix("/question")
class UserQuestionController {
    @router({
        method: "get",
        path: "/getQuestion",
        unless: true
    })
    @cache()
    async getQuestion(ctx: CustomKoaContextModel) {
        ctx.body = await userQuestionService.getUserQuestionAsync();
    }

    @router({
        method: "post",
        path: "/createAswer",
        unless: false
    })
    // @required()
    @setUserInformation
    async CreateQuertionAswer(ctx: CustomKoaContextModel) {
        let createModel = <CreateUserQuestionAnswerModel>ctx.request["body"];
        createModel.userId = ctx.user.id;
        ctx.body = await userQuestionService.createUserQuestionAswerAsync(createModel);
    }
}
