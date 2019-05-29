import { prefix, router, setUserInformation, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import { UserWordCreateModel, UserWordUpdateModel, WordListQueryModel } from "../model/word";
import { translate } from "../utils/translate";
import { UserResource } from "../common/enums";
import userWordService from "../services/userWord.service";

@prefix("/userWord")
class UserWordController {
    @router({
        method: "post",
        path: "/createWord",
        unless: true
    })
    @setUserInformation
    async createWord(ctx: CustomKoaContextModel) {
        let createModel = <UserWordCreateModel>ctx.request.body;
        createModel.createUserId = ctx.user.id;
        ctx.body = await userWordService.createWordAsync(createModel);
    }

    @router({
        method: "post",
        path: "/updateWord",
        unless: true
    })
    @setUserInformation
    async updateWord(ctx: CustomKoaContextModel) {
        let updateModel = <UserWordUpdateModel>ctx.request.body;
        updateModel.createUserId = ctx.user.id;
        ctx.body = await userWordService.updateWordAsync(updateModel);
    }
    
    @router({
        method: "get",
        path: "/getWordList",
        unless: false
    })
    @setUserInformation
    async getWordList(ctx: CustomKoaContextModel) {
        let queryModel = <WordListQueryModel>ctx.query;
        queryModel.userId = ctx.user.id;
        ctx.body = await userWordService.getUserWordListAsync(queryModel);
    }
}
