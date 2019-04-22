import config = require("config");

interface IConfig {
    wechat: { appId: string, appSecret: string },
    server: { port: string, sslpfx: string, passphrase: string },
    jwt: { key: string, iv: string, secret: string, expired: number },
    mysql: { host: string, user: string, password: string, database: string },
    redis: { host: string, port: number, auth_pass: string, db: number },
    email: { smtp: { host: string, port: number, secure: boolean, auth: { user: string, pass: string } }, managerEmail: string },
    baidu: { clientId: string, clientSecret: string, translateAppId: string, translateKey: string },
    log: any,
    baseLogPath: string
}

export default <IConfig>{
    wechat: config.get("wechat"),
    server: config.get("server"),
    jwt: config.get("jwt"),
    mysql: config.get("mysql"),
    redis: config.get("redis"),
    email: config.get("email"),
    baidu: config.get("baidu"),
    log: {
        //日志格式等设置
        appenders:
        {
            "rule-console": { "type": "console" },
            errorLogger: {
                "type": "dateFile",
                "filename": "../logs/errors/",
                "pattern": "yyyy-MM-dd.log",
                "alwaysIncludePattern": true,
                "encoding": "utf-8",
                "maxLogSize": 1000,
                "numBackups": 3,
                "path": "./"
            },
            resLogger: {
                "type": "dateFile",
                "filename": "../logs/errors/",
                "pattern": "yyyy-MM-dd.log",
                "alwaysIncludePattern": true,
                "encoding": "utf-8",
                "maxLogSize": 1000,
                "numBackups": 3,
                "path": "./"
            },
        },
        //供外部调用的名称和对应设置定义
        categories: {
            "default": { "appenders": ["rule-console"], "level": "all" },
            "resLogger": { "appenders": ["resLogger"], "level": "info" },
            "errorLogger": { "appenders": ["errorLogger"], "level": "error" },
            "http": { "appenders": ["resLogger"], "level": "info" }
        },
        baseLogPath: "./"
    }
}