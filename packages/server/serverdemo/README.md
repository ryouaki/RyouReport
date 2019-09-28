# 使用说明
本工程模板是基于Express构建，用于快速创建Nodejs API服务器。

## 目录结构
```
|-- config
    |-- index.js // 系统配置信息，但是优先获取环境变量中的内容以便可以快速在不同环境下部署
|-- controller
    |-- base // controller基类，里面实现了一些默认方法，如无特殊需要不需要修改
    |-- *.js // controller实现，不需要配置路由信息，会自动根据需要生成路由配置。
|-- docs // JS全栈开发入门，没空写
|-- model // 由于JS是弱类型脚本语言，所以并不存在模型一说，但是通常我们会把数据操作相关的操作放入model中，如果更换数据源，直接修改这里即可
|-- route // 已经封装好，不需要修改
|-- service // 业务逻辑的实现
|-- utils // 各种工具函数
|-- app.js // 程序入口
|-- pm2.config.js // pm2 启动配置
```

## Controller说明

每一个controller代表着一个模块，模块的路径以类名小写开始，比如下面这个controller访问路径为：get [config.appid]/[controller类名小写]/[函数名]，例如: get /api/v1/webapi/test/test1

controller方法名命名规则：
1. {HTTP方法}${路径1}${路径2}${_PARAM参数}
2. {HTTP方法 路径}

```js
  const BaseController = require("./base"); // 所有controller 必须继承自baseController

  module.exports = class Test extends BaseController {

    // 可写可不写
    constructor() {
      super();
    }

    // 在所有该模块的请求被处理前执行
    before(req, res) {
      console.log("Request come in!" + req.originalUrl)
    }

    // 在所有请求返回后执行
    after(req, res) {
      console.log("Response come out!" + req.originalUrl)
    }

    // 提供两种接口实现方式，可以自己像平时一样操作req，res
    get$test1(req, res) {
      res.status(200).json({
        code: 0,
        data: null,
        msg: req.params.id
      })
    }

    // 也可以直接返回一个对象，这里必须是对象，可以通过this.req,this.res访问请求的上下文req, res
    get$test2$_id() {
      return {
        code: 0,
        data: null,
        msg: this.req.params.id
      }
    }

    // 也可以通过如下方式定义相应函数，'方法 /路径1/路径2/:id'，参考http协议头
    'get /test3' () {
      return {
        code: 0,
        data: null,
        msg: this.req.params.id
      }
    }

    // 内置success和failed方法，其中failed方法第四个参数是返回的httpStatusCode，默认400
    'get /test4' () {
      this.success(null, "test");
    }

    'get /test5/:msg' () {
      this.failed(400, this.req.params.msg, "test");
    }
  }
```