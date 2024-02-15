const http = require('http');

const server = http.createServer((request, response) => {
    // 实例化URL对象
    let url = new URL(request.url, 'http://127.0.0.1:9000')
    // 输出pathname
    console.log(url.pathname)
    // 输出查询字符串
    console.log(url.searchParams.get('keyword'))
    response.end('url')
});

server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中，运行在 http://127.0.0.1:9000 ...');
});
