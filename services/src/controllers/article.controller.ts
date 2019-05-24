import * as Koa from "koa";

import { prefix, router, setUserInformation, cache } from "../router";
import articleService from "../services/article.service";
import { CustomKoaContextModel } from "../model/common.model";

@prefix("/article")
class ArticleController {
    @router({
        method: "get",
        path: "/getArticleList",
        unless: true
    })
    @cache()
    async getArticleList(ctx: Koa.Context) {
        let queryModel = ctx.query;
        ctx.body = await articleService.getArticleListAsync(queryModel);
    }

    @router({
        method: "get",
        path: "/getArticleDetail",
        unless: false
    })
    @setUserInformation
    @cache()
    async getArticleDetail(ctx: CustomKoaContextModel) {
        let articleId = ctx.query["articleId"];
        ctx.body = await articleService.getArticleDetailAsync(articleId, ctx.user.id);
    }
}