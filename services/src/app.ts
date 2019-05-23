import * as Koa from "koa";
import * as cors from "koa2-cors";
import * as Json from "koa-json";
import * as koaBody from "koa-body";

import { Route } from "./router/Route";
import { RedisService } from "./utils/redisHelper";
import config from "./common/config";
import logger from "./utils/logger";

const app = new Koa();
const router = new Route(app);
const redis = new RedisService();

app.use(koaBody({
    formidable: {
        uploadDir: config.file.fileUploadPath,
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024,
    }
}));

router.registerRouters(`${__dirname}/controllers`, config.jwt);

app.use(async (ctx, next) => {
    try {
        logger.response(ctx);
        await next();
    } catch (error) {
        debugger
        logger.requestError(ctx, error);
        if (error["message"] === "Authentication Error") {
            ctx.status = 401;
            ctx.body = { message: "用户未授权" };
        } else {
            ctx.status = error["status"] || 500;
            ctx.body = { message: error["message"] || "服务器错误" };
        }
    }
});

app.use(cors({
    origin: function (ctx: Koa.Context) {
        return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept", "Access-Control-Allow-Origin", "Origin"],
}));

export {
    app,
    redis
};