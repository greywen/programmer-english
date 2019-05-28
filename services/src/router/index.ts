/**
 * 路由中间件
 */
'use strict'
import { symbolRoutePrefix, Route } from './Route';
import * as Koa from 'koa';
import { verifyTokenAsync } from '../utils/jwtHelper';
import { CustomKoaContextModel, IRedisOptions } from '../model/common.model';
import { UserResource } from '../common/enums';

//记录请求数
let requestID = 0;

export function setUserInformation(target: any, name: string, value: PropertyDescriptor) {
    target[name] = sureIsArray(target[name]);
    target[name].splice(target[name].length - 1, 0, SetUserInformation);

    async function SetUserInformation(ctx: CustomKoaContextModel, next: any) {
        let token = ctx.header["authorization"];
        ctx.user = await verifyTokenAsync(token);
        await next();
    }
    return value;
}

export function authorize(resources: UserResource[]) {
    return function (target: any, name: string, value: PropertyDescriptor, ) {
        target[name] = sureIsArray(target[name]);
        target[name].splice(target[name].length - 1, 0, Authorize);

        async function Authorize(ctx: CustomKoaContextModel, next: any) {
            let token = ctx.header["authorization"];
            ctx.user = await verifyTokenAsync(token);
            let isAuthorize = ctx.user.resources.filter(x => resources.includes(x)).length > 0;
            if (isAuthorize) {
                await next();
            } else {
                ctx.status = 401;
                ctx.body = { message: "用户未授权" }
            }
        }
        return value;
    }
}

export function cache(ops?: IRedisOptions) {
    return function (target: any, name: string, value: PropertyDescriptor) {
        target[name] = sureIsArray(target[name]);
        target[name].splice(target[name].length - 1, 0, Cache);

        async function Cache(ctx: CustomKoaContextModel, next: any) {
            let request = ctx.request;
            let key = await ctx.redis.generateKeyAsync(request.url);
            let value = await ctx.redis.getAsync(key);
            if (value) {
                ctx.response.status = 200;
                ctx.response.set('X-Koa-Redis-Cache', 'true');
                ctx.response.body = value;
            } else {
                await next();
            }
        }

        return value;
    }
}

/**
 * url参数
 * list/:id?username=zhangsan&&age=30
 * @required({query: 'username'}) 
 * @required({query: ['username','age'],params: 'id'}) 
 */
export function required(args: any) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        return requireDescriptor(target, name, descriptor, args);
    }
}

/**
 * URL必传参数校验
 * @required({params: 'username'})
 * @required({params: ['username','age']})
 * @required({query: 'username'})
 */
function requireDescriptor(target: any, name: string, descriptor: PropertyDescriptor, rules: any) {
    target[name] = sureIsArray(target[name]);
    target[name].splice(target[name].length - 1, 0, middleware);
    return descriptor;

    async function middleware(ctx: Koa.Context, next: any) {
        if (rules.query) {
            rules.query = sureIsArray(rules.query);
            for (let name of rules.query) {
                if (!ctx.query[name]) ctx.throw(412, `GET Request query: ${name} required`);
            }
        }
        if (rules.params) {
            rules.params = sureIsArray(rules.params);
            for (let name of rules.params) {
                if (!ctx.params[name]) ctx.throw(412, `GET Request params: ${name} required`);
            }
        }
        await next();
    }
}

/**
 * 添加静态属性
 * @prefix('/user')
 */
export function prefix(prefix: string) {
    return (target: any) => {
        target.prototype[symbolRoutePrefix] = prefix;
    }
}

/**
 * 路由
 * @router({
 *   method: 'get',
 *   path: '/login/:id'
 * })
 */
export function router(config: { path: string, method: string, unless?: boolean }) {
    return (target: any, name: string, value: PropertyDescriptor) => {
        //map类型设置值
        Route._DecoratedRouters.set({
            target: target,
            path: config.path,
            method: config.method,
            unless: config.unless
        }, target[name]);
    }
}

/**
 * 修饰方法
 * @params 
 * @convert(async function(ctx, next){await next()})
 */
export function convert(middleware: Function) {
    return decorate(function (target: any, name: string, descriptor: PropertyDescriptor, middleware: Function) {
        target[name] = sureIsArray(target[name]);
        target[name].splice(target[name].length - 1, 0, middleware);
        return descriptor;
    }, sureIsArray(middleware));
}

/**
 * 日志 修饰api方法
 * use: @log
 * @export
 * @param {*} target
 * @param {string} name
 * @param {PropertyDescriptor} value
 * @returns
 */
export function log(target: any, name: string, value: PropertyDescriptor) {
    target[name] = sureIsArray(target[name]);
    target[name].splice(target[name].length - 1, 0, Logger);

    async function Logger(ctx: Koa.Context, next: any) {
        //请求数加1
        let currentRequestID = requestID++;

        //请求开始时间请求开始时间
        const startTime = process.hrtime();
        console.log(`→ (ID:${currentRequestID}) ${ctx.method} ${ctx.url}`);
        if ((ctx.method).toLowerCase() == 'post') {
            console.log(`→ (ID:${currentRequestID}) ${ctx.method} ${JSON.stringify(ctx.request)}`);
        }
        await next();

        //返回response结束时间
        const endTime = process.hrtime();
        //计算进程总时间
        const elapsed = (endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1000000;
        console.log(`← (ID:${currentRequestID}) ${ctx.method} ${ctx.url} : Status(${ctx.status}) Time(${elapsed.toFixed(0)}ms)`);

    }
    return value;
}

/**
 * 转换数组
 * @param {*} arr 参数
 */
function sureIsArray(arr: any) {
    return Array.isArray(arr) ? arr : [arr];
}

/**
 * 是否被修饰的对象原来值
 */
function isDescriptor(desc: any) {
    if (!desc || !desc.hasOwnProperty) return false;
    for (let key of ['value', 'initializer', 'get', 'set']) {
        if (desc.hasOwnProperty(key)) return true;
    }
    return false;
}

/**
 * 获取第一个元素方法
 */
function last(arr: Array<Function>) {
    return arr[arr.length - 1];
}

/**
 * 执行函数
 */
function decorate(handleDescriptor: Function, entryArgs: Array<Function>) {
    if (isDescriptor(last(entryArgs))) return handleDescriptor(entryArgs);
    else return function () {
        return handleDescriptor(...arguments, ...entryArgs);
    }
}