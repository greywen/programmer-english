import * as Koa from "koa";
import * as Router from "koa-router";
import * as glob from "glob";
import * as path from 'path';
import * as jwt from "koa-jwt";

const router = new Router();

// 定义不变字段，在使用时读取
export const symbolRoutePrefix: symbol = Symbol('routePrefix');

export class Route {
    // 静态 存储被修饰后的路由的地方
    static _DecoratedRouters: Map<{ target: any, method: string, path: string, unless?: boolean }, Function | Function[]> = new Map();
    private router: any;
    private app: Koa;

    /**
     * Creates an instance of Route.
     * @param {Koa} app
     * @memberOf Route
     */
    constructor(app: Koa) {
        this.app = app;
        this.router = router;
    }

    /**
     * 注册路由
     * new Route(ctx:Koa).registerRouters(apipath);
     * @param {String} controllerDir api文件路径
     * @param {jwt.Options} jwtOpts 权限配置
     * @memberOf Route
     */
    registerRouters(controllerDir: string, jwtOpts: jwt.Options): void {
        // 载入api接口,使用sync同步载入
        glob.sync(path.join(controllerDir, './*.js')).forEach((item) => require(item));
        // 不做校验的路由集合
        let unlessPath = [];
        // 配置路由
        for (let [config, controller] of Route._DecoratedRouters) {
            let controllers = Array.isArray(controller) ? controller : [controller];
            let prefixPath = config.target[symbolRoutePrefix];
            if (prefixPath && (!prefixPath.startsWith('/'))) {
                prefixPath = '/' + prefixPath;
            }
            // 拼接api路由
            let routerPath = prefixPath + config.path;
            // 将忽略路由集合
            if (config.unless) {
                unlessPath.push(routerPath);
            }
            controllers.forEach((controller) => this.router[config.method](routerPath, controller));
        }
        this.app.use(jwt({ secret: jwtOpts.secret, key: jwtOpts.key }).unless({ path: unlessPath }));
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }
}