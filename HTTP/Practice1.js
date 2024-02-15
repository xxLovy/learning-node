const http = require('http')

const server = http.createServer((res, rep) => {
    // let url = new URL(res.url, 'http://127.0.0.1:9000')
    let { pathname } = new URL(res.url, 'http://127.0.0.1')
    let { method } = res

    if (pathname === '/login' && method === 'GET') {
        rep.end('this is login page')
    } else if (pathname === '/reg' && method === 'GET') {
        rep.end('this is register page')
    } else {
        rep.end('404 Not Found')
    }
})

server.listen(9000, () => {
    console.log('http://127.0.0.1:9000')
})