import { prefix, router, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import wordService from "../services/word.service";
import { CreateCollectModel } from "../model/word";
import { getUserId } from "../utils/jwtHelper";
import { WordListQueryModel } from "src/model/word/word.model";
import { translate } from "../utils/translate";

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
    @authorize
    async getNextWord(ctx: CustomKoaContextModel) {
        ctx.body = await wordService.getWordAsync({ userId: ctx.user.id, next: true });
    }

    @router({
        method: "post",
        path: "/collectWord",
        unless: false
    })
    @authorize
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
    @authorize
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
    @authorize
    async getDisplayWord(ctx: CustomKoaContextModel) {
        ctx.body = await wordService.getUserCollectionWordAsync(ctx.user.id);
    }

    @router({
        method: "get",
        path: "/getWordDetail",
        unless: false
    })
    @authorize
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
        unless: true
    })
    async translate(ctx: CustomKoaContextModel) {
        let { text, type } = ctx.request.body;
        ctx.body = await translate(text, type);
    }
}
