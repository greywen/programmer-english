import * as Koa from "koa";
import * as cors from "koa2-cors";
import * as Json from "koa-json";
import * as koaBody from "koa-body";

import { Route } from "./router/Route";
import { RedisService } from "./utils/redisHelper";
import config from "./common/config";

const app = new Koa();
const router = new Route(app);
const redis = new RedisService();

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 400 * 1024 * 1024
    }
}))

app.use(Json());

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

export {
    app,
    redis
};