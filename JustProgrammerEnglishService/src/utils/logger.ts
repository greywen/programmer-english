import * as Koa from "koa"
import * as log4js from "log4js"
import config from "../common/config"

// 加载配置文件
log4js.configure(config.log);
// 调用预先定义的日志名称
let resLogger = log4js.getLogger("resLogger");
let errorLogger = log4js.getLogger("errorLogger");
let consoleLogger = log4js.getLogger();

let logger: ILogger = {
    requestError: (ctx: Koa.Context, error: Error) => {
        if (ctx && error) {
            errorLogger.error(formatRequestError(ctx, error));
        }
    },
    error: (error: Error | string) => {
        errorLogger.error(formatrError(error));
    },
    response: (ctx: Koa.Context) => {
        if (ctx) {
            resLogger.info(formatResponse(ctx));
        }
    },
    info: (info: string) => {
        if (info) {
            consoleLogger.info(formatInfo(info));
        }
    }
}

interface ILogger {
    requestError(ctx: Koa.Context, error: Error): void,
    error(error: Error | string): void,
    response(ctx: Koa.Context): void,
    info(info: string): void
}

var formatInfo = function (info: string) {
    return `[INFO]:${info}`
}

/**
 * 格式化响应日志
 * @param {Koa.Context} ctx
 * @param {string} resTime
 * @returns {string}
 */
var formatResponse = function (ctx: Koa.Context) {
    var logText = new String();
    // 添加请求日志
    logText += formatRequstLog(ctx.request);
    // 响应状态码 响应内容
    logText += `[RESPONSE STATUS]:${ctx.status}`;
    logText += `[RESPONSE BODY]:${JSON.stringify(ctx.body)}`;
    return logText;
}

// 格式化请求错误日志
var formatRequestError = function (ctx: Koa.Context, error: Error) {
    var logText = new String();
    // 添加请求日志
    logText += formatRequstLog(ctx.request);
    // 错误名称 错误信息 错误详情
    logText += `[ERROR INFO]:${error} ${error.stack}`;
    return logText;
};

// 格式化错误日志
var formatrError = function (error: Error | string) {
    return `[ERROR INFO]:${JSON.stringify(error)}`;
};


// 格式化请求日志
var formatRequstLog = function (request: Koa.Request) {
    var logText = "";
    var method = request.method;
    // 访问方法 请求原始地址 客户端ip 服务器响应时间
    logText += `FUNCTION: ${method} URL: ${request.originalUrl} IP: ${request.ip} DATE: ${new Date().toString()}`;

    // 请求参数
    if (method === 'GET') {
        logText += `[REQUEST QUERY]:${JSON.stringify(request.query)}`;
    } else {
        logText += `[REQUEST BODY]:${JSON.stringify(request)}`;
    }
    return logText;
}

export default logger