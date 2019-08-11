import * as Koa from "koa";
import * as cors from "koa2-cors";
import * as koaBody from "koa-body";

import { Route } from "./router/Route";
import { RedisService } from "./utils/redisHelper";
import config from "./common/config";
import logger from "./utils/logger";
import { userMiddleware } from "./middleware";

const app = new Koa();
const router = new Route(app);
const redis = new RedisService();

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: config.file.fileUploadPath,
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024
    }
}));

// app.use(async (ctx, next) => {
//     ctx.redis = redis;
//     await next();
//     // console.log(this.redisOptions && this.redisOptions.whetherCache);
//     // if (this.redisOptions && this.redisOptions.whetherCache) {
//     //     await redis.setAsync(this.redisOptions.key, this.body);
//     // }
// })

app.use(async (ctx, next) => {
    try {
        logger.response(ctx);
        await next();
    } catch (error) {
        logger.requestError(ctx, error);
        let _status = error["status"] || 500, _error = error["message"] || "服务器错误";
        ctx.status = _status;
        ctx.body = { status: _status, message: _error };
    }
});

app.on("error", (error, ctx) => {
    logger.requestError(ctx, error);
})

app.use(userMiddleware())

router.registerRouters(`${__dirname}/controllers`, config.jwt);

app.use(cors({
    origin: function (ctx: Koa.Context) {
        return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept", "Access-Control-Allow-Origin", "Origin"],
}));

export default app;