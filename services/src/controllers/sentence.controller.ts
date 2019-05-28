import { prefix, router, authorize, cache } from "../router";
import * as Koa from "koa";

import { CreateCollectModel } from "../model/word";
import { CustomKoaContextModel } from "../model/common.model";
import { translate } from "../utils/translate";
import sentenceService from "../services/sentence.service";
import dashboardService from "../services/dashboard.service";
import { getUserId } from "../utils/jwtHelper";

@prefix("/sentence")
class SentenceController {
    // @router({
    //     method: "get",
    //     path: "/get",
    //     unless: true
    // })
    // @cache
    // async getDocumentSentence(ctx: CustomKoaContextModel) {
    //     let userId = 0, token = ctx.header["authorization"];
    //     if (token === "Bearer undefined") {
    //         ctx.body = await dashboardService.getDashboardDefaultDataAsync();
    //         return;
    //     };
    //     userId = await getUserId(token);
    //     let body = await dashboardService.getDashboardDataAsync(userId);
    //     // await redis.setAsync(`${ctx.user.id}:${ctx.request.url}`, body, secondOfDay());
    //     ctx.body = body;
    // }

    // @router({
    //     method: "post",
    //     path: "/collect",
    //     unless: false
    // })
    // @authorize
    // async collect(ctx: CustomKoaContextModel) {
    //     let params = <CreateCollectModel>ctx.request.body;
    //     params.userId = ctx.user.id;
    //     ctx.body = await dashboardService.collectAsync(params);
    // }

    // @router({
    //     method: "post",
    //     path: "/translate",
    //     unless: true
    // })
    // async translate(ctx: Koa.Context) {
    //     let { text, type } = ctx.request.body;
    //     ctx.body = await translate(text, type);
    // }

    // @router({
    //     method: "post",
    //     path: "/create",
    //     unless: false
    // })
    // @authorize
    // async createSentence(ctx: CustomKoaContextModel) {
    //     let params = ctx.request.body;
    //     ctx.body = await sentenceService.createSentenceAsync(params);
    // }
}
