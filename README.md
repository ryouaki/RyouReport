# RyouReport
The JavaScript report system

## Plan
客户端上报SDK[源码](https://github.com/ryouaki/RyouReport/blob/master/packages/sdk/%24ryou.js)
- 初始化 应用名，上报服务器地址
- 设置当前用户ID
- 前端性能指标采集performance 页面加载完成时间，页面初始化时间，DOM解析时间（ssr），DNS查询时间，ttfb（第一个字节），请求完整耗时（spa参考意义不大），onload执行耗时，缓存获取耗时，建立服务器链接耗时
- 自动跟踪用户行为（hook click，mouseStart, mouseEnd, touchStart, touchEnd事件）
- MutationObserver 跟踪DOM构建
- error监控
- 客户端浏览器分辨率
- 客户端名，版本号
- 当前地址
- 当前title
- 路由切换
- history api劫持
- hash event劫持
- 自定义上报 get/post
- ajax 劫持
- 页面留存时间 （需要依赖sessionStorage）

服务器端Nodejs日志生成服务器端
- get 请求
- post 请求
