import { prefix, router, authorize, cache } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import DashboardService from "../services/dashboard.service";
import { CreateCollectModel } from "../model/word";


@prefix("/dashboard")
class DashboardController {
    @router({
        method: "get",
        path: "/get",
        unless: false
    })
    @authorize
    @cache
    async getDocumentSentence(ctx: CustomKoaContextModel) {
        let body = await DashboardService.getDashboardDataAsync(ctx.user.id);
        // await redis.setAsync(`${ctx.user.id}:${ctx.request.url}`, body, secondOfDay());
        ctx.body = body;
    }

    @router({
        method: "post",
        path: "/collect",
        unless: false
    })
    @authorize
    async collect(ctx: CustomKoaContextModel) {
        let params = <CreateCollectModel>ctx.request.body;
        params.userId = ctx.user.id;
        ctx.body = await DashboardService.collectAsync(params);
    }
}