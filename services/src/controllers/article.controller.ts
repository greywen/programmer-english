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
    //@cache()
    async getArticleList(ctx: Koa.Context) {
        let queryModel = ctx.query;
        let _body = await articleService.getArticleListAsync(queryModel);
        let key = await ctx.redis.generateKeyAsync(ctx.request.url);
        await ctx.redis.setAsync(key, _body);
        ctx.body = _body;
    }

    @router({
        method: "get",
        path: "/getArticleDetail",
        unless: false
    })
    //@cache()
    async getArticleDetail(ctx: CustomKoaContextModel) {
        let articleId = ctx.query["articleId"];

        let _body = await articleService.getArticleDetailAsync(articleId, ctx.user.id);
        let key = await ctx.redis.generateKeyAsync(ctx.request.url);
        await ctx.redis.setAsync(key, _body, 0);
        ctx.body = _body;
    }
}