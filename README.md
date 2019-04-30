### 1024English

### service环境准备
```
1.安装redis [http://www.runoob.com/redis/redis-install.html](http://www.runoob.com/redis/redis-install.html)
2.yarn || npm i
3.npm run wacth
4.vs code启动node调试 / node index
```

### client环境准备
```
1.yarn || npm i
2.npm run dev:weapp
3.使用微信开发者工具打开dist文件夹
```


### 文件夹结构
# service

```
├─.vscode
    ├─launch.json
├─config
    ├─default.json          // 配置文件(json)
├─dist                      // 打包结果
├─node_modules              
├─sqlmap                    // sql文件
├─src
    ├─common
        ├─config            // 配置文件(ts)
        ├─enums             // 枚举
    ├─controller            // 负责与前端建立连接
    ├─model                 // 模型
    ├─repository            
        ├─core              // 数据访问层
        ├─entity            // 数据表实体
    ├─router            
        ├─router.ts         // 路由           
        ├─index.ts          // 路由修饰方法
    ├─services              // 业务逻辑层
    ├─utils                 // 公共方法
    ├─app.ts                // app配置
├─ssl                       // server证书
├─index.ts                  // 启动入口
├─package.json              // 
├─tsconfig.json             // tsconfig.json
```

# client

```
├─config                    // taro生成
├─dist                      // 打包结果
├─lib                       // taro生成
├─node_modules
├─src
    ├─assets
        ├─fonts             // 字体
        ├─images            // 图片
        ├─icons.scss        // 图标css
    ├─common
        ├─config            // 配置
        ├─decorator         // 装饰器
        ├─enums             // 枚举
    ├─components            // 通用组件
    ├─models                // 模型
    ├─pages
        ├─components        // 多页面共有组件
        ├─page1             // 场景1
            ├─components    // 页面独有组件
    ├─store                 // mobx (api访问方法放后面)
    ├─utils
├─.editorconfig             // taro生成
├─.eslintrc                 // taro生成
├─global.d.ts               // taro生成
├─package.json              // 
├─project.config.json       // taro生成 项目配置
├─tsconfig.json             // taro生成
```

```
test jenkins auto build hook
```