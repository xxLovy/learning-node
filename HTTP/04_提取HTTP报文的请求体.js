const http = require('http');

const server = http.createServer((request, response) => {
    // 1. 声明一个变量
    let body = ''

    // 2. 绑定事件
    request.on('data', chunk => {
        body += chunk
    })

    // 3. 绑定end事件
    request.on('end', () => {
        console.log(body)
        //响应
        response.end('Hello HTTP')
    })

});

server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中，运行在 http://127.0.0.1:9000 ...');
});
