//1. 导入 http 模块
const http = require('http');
//2. 创建服务对象 create 创建 server 服务
// request 意为请求. 是对请求报文的封装对象, 通过 request 对象可以获得请求报文的数据
// response 意为响应. 是对响应报文的封装对象, 通过 response 对象可以设置响应报文
const server = http.createServer((request, response) => {
    // // 获取请求方法
    // console.log(request.method)

    // // 获取请求URL
    // console.log(request.url)// 只包含url的路径和查询字符串

    // // 获取HTTP协议版本号
    // console.log(request.httpVersion)

    // 获取请求头
    console.log(request.headers)

    response.end('Hello HTTP server');
});
//3. 监听端口, 启动服务
server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中，运行在 http://127.0.0.1:9000 ...');
});
