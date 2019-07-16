import { prefix, router, setUserInformation, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import { UserWordCreateModel, UserWordUpdateModel, WordListQueryModel } from "../model/word";
import { UserResource } from "../common/enums";
import userWordService from "../services/userWord.service";
import { parseNumber } from "../utils/common";

@prefix("/userWord")
class UserWordController {
    @router({
        method: "post",
        path: "/createWord",
        unless: true
    })
    @authorize([UserResource.UserWordCreate])
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
    @authorize([UserResource.UserWordCreate])
    async updateWord(ctx: CustomKoaContextModel) {
        let updateModel = <UserWordUpdateModel>ctx.request.body;
        updateModel.createUserId = ctx.user.id;
        ctx.body = await userWordService.updateWordAsync(updateModel);
    }

    @router({
        method: "post",
        path: "/deleteWord",
        unless: true
    })
    @authorize([UserResource.UserWordCreate])
    async deleteWord(ctx: CustomKoaContextModel) {
        let wordId = parseNumber(ctx.request.body["wordId"]);
        ctx.body = await userWordService.deleteWordAsync(wordId, ctx.user.id);
    }

    @router({
        method: "get",
        path: "/getWordList",
        unless: false
    })
    @authorize([UserResource.UserWordCreate])
    async getWordList(ctx: CustomKoaContextModel) {
        let queryModel = <WordListQueryModel>ctx.query;
        queryModel.userId = ctx.user.id;
        ctx.body = await userWordService.getUserWordListAsync(queryModel);
    }
}
