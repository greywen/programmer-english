import * as Koa from "koa";

import { prefix, router, setUserInformation, authorize, cache } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import wordService from "../services/word.service";
import { CreateCollectModel } from "../model/word";
import { getUserId } from "../utils/jwtHelper";
import { WordListQueryModel } from "src/model/word/word.model";
import { translate } from "../utils/translate";
import { UserResource } from "../common/enums";

@prefix("/word")
class WordController {
    @router({
        method: "get",
        path: "/getWord",
        unless: true
    })
    async getWord(ctx: CustomKoaContextModel) {
        // TODO 用户未授权返回默认
        let userId = 0, token = ctx.header["authorization"];
        if (token === "Bearer undefined") {
            ctx.body = await wordService.getDefaultWordAsync();
            return;
        };

        userId = await getUserId(token);
        ctx.body = await wordService.getWordAsync({ userId: userId, next: false });
    }

    @router({
        method: "get",
        path: "/getNextWord",
        unless: false
    })
    @setUserInformation
    async getNextWord(ctx: CustomKoaContextModel) {
        ctx.body = await wordService.getWordAsync({ userId: ctx.user.id, next: true });
    }

    @router({
        method: "post",
        path: "/collectWord",
        unless: false
    })
    @setUserInformation
    async collectWord(ctx: CustomKoaContextModel) {
        let params = <CreateCollectModel>ctx.request.body;
        params.userId = ctx.user.id;
        ctx.body = await wordService.collectWordAsync(params);
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
        ctx.body = await wordService.getWordListAsync(queryModel);
    }

    @router({
        method: "get",
        path: "/getDisplayWord",
        unless: false
    })
    @setUserInformation
    async getDisplayWord(ctx: CustomKoaContextModel) {
        ctx.body = await wordService.getUserCollectionWordAsync(ctx.user.id);
    }

    @router({
        method: "get",
        path: "/getWordDetail",
        unless: false
    })
    @setUserInformation
    @cache()
    async getWordDetailAsync(ctx: CustomKoaContextModel) {
        let wordId = ctx.query["wordId"];
        if (!wordId) {
            ctx.body = {};
            return;
        }
        ctx.body = await wordService.getWordDetailAsync({ wordId: wordId, userId: ctx.user.id, next: false });
    }

    @router({
        method: "post",
        path: "/translate",
        unless: false
    })
    @authorize([UserResource.CreateWord, UserResource.EditWord])
    async translate(ctx: CustomKoaContextModel) {
        let { text, type } = ctx.request.body;
        ctx.body = await translate(text, type);
    }

    @router({
        method: "post",
        path: "/createWord",
        unless: false
    })
    @authorize([UserResource.CreateWord])
    async createWord(ctx: CustomKoaContextModel) {
        ctx.body = await wordService.createWordAsync(ctx.request.body);
    }

    @router({
        method: "post",
        path: "/updateWord",
        unless: false
    })
    @authorize([UserResource.EditWord])
    async updateWord(ctx: CustomKoaContextModel) {
        ctx.body = await wordService.updateWordAsync(ctx.request.body);
    }
}
