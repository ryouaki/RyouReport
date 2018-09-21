# RyouReport
The JavaScript report system

## Plan
客户端上报SDK
- 初始化 应用名，上报服务器地址
- 设置当前用户ID
- 前端性能指标采集performance 页面加载完成时间，页面初始化时间，DOM解析时间（ssr），DNS查询时间，ttfb（第一个字节），请求完整耗时（spa参考意义不大），onload执行耗时，缓存获取耗时，建立服务器链接耗时
- 自动跟踪用户行为（hook click，mouseStart, mouseEnd, touchStart, touchEnd事件）
- MutationObserver 跟踪DOM构建
- error监控
- 客户端浏览器分辨率
- 当前地址
- 上一页地址
- 路由切换
- 

服务器端Nodejs日志生成服务器端
