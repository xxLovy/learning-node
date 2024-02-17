# Node学习

## 1. Buffer

### 创建方法

相当于申请了 10 字节的内存空间，每个字节的值为 0

```js
let buf1 = Buffer.alloc(10)
```

buffer 中可能存在旧的数据, 可能会影响执行结果，所以叫 unsafe

```js
let buf2 = Buffer.allocUnsafe(10)
```

将其他内容转成Buffer

```js
let buf3 = Buffer.from('Hello')
```

### toString方法

Buffer中存储的数据可以通过`toString`方法转换为字符串

```js
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4.toString())
// iloveyou
```

### Buffer可以通过[]来访问其成员

```js
let buf = Buffer.from("hello")
buf[0] = 90

buf[0] = 361 //这样会溢出，舍弃高位
```

## 2. fs模块（file system）

fs全称为file system ，称之为文件系统 ，可以对计算机中的磁盘进行操作。

### 2.1 文件写入

#### 异步

```js
const fs = require('fs')

// write a motto to a text file
motto = 'To see the world, things dangerous to come to, to see behind walls, to draw closer, to find each other and to feel. That is the purpose of life'

//async mode
fs.writeFile('./FileSystem/Motto.txt', motto, err => {
    // callback function
    if (err) {
        console.log('failed')
        return
    }
    console.log("succeeded")
})

console.log('this message goes first')

```

文件异步写入，先执行`console.log('this message goes first')` 再执行`writeFile`的回调函数

#### 同步

```js
const fs = require('fs')

// write a motto to a text file
motto = 'To see the world, things dangerous to come to, to see behind walls, to draw closer, to find each other and to feel. That is the purpose of life'

// Sync mdoe
fs.writeFileSync('./FileSystem/Motto.txt', motto)
```

#### 追加写入

```js
const fs = require('fs')

fs.appendFile('./FileSystem/Motto.txt', '\r\nThis is the motto of life magazine', err => {
    if (err) {
        console.log("NotOK")
    }
    console.log("OK")
})

// fs.appendFileSync('./FileSystem/Motto.txt', '\r\nThis is the motto of life magazine')
```

#### 流式写入

适合大文件写入和频繁写入的场景

```js
const fs = require('fs')

// 创建通道
let ws = fs.createWriteStream('./FileSystem/观书有感.txt');

// 写入内容
ws.write('半亩方塘一鉴开\r\n');
ws.write('天光云影共徘徊\r\n');
ws.write('问渠那得清如许\r\n');
ws.write('为有源头活水来\r\n');

// 关闭通道
ws.end();
```

### 2.2 文件读取 

#### 异步

```js
const fs = require('fs')

fs.readFile('./FileSystem/Motto.txt', (err, data) => {
    if (err) {
        console.log('读取失败')
        return
    }
    console.log(data.toString())
})
```

#### 同步

```js
const fs = require('fs')

let data = fs.readFileSync("./FileSystem/Motto.txt", "utf-8")
console.log(data)
```

#### 流式读取

适合大文件的读取

```js
const fs = require('fs')

const filePath = ''
const rs = fs.createReadStream(filePath)


// 绑定data事件 chunk是从文件中读取的内容，为Buffer类型
rs.on('data', chunk => {
    console.log(chunk)
})

// end事件（可选）
rs.on('end', () => {
    console.log('读取完成')
})
```

### 2.3文件移动与重命名 

`rename`方法

#### 重命名

```js
const fs = require('fs')


// 重命名
fs.rename('./FileSystem/观书有感.txt', './FileSystem/guanshuyougan.txt', err => {
    if (err) {
        console.log('操作失败')
        return
    }
    console.log("操作成功")
})
```

#### 移动

```js
const fs = require('fs')

// 移动
fs.rename('./FileSystem/观书有感.txt', './guanshuyougan.txt', err => {
    if (err) {
        console.log('操作失败')
        return
    }
    console.log("操作成功")
})
```

### 2.4 文件删除 

`unlink` `rm`

```js
const fs = require('fs')
path = ''

// unlink方法
fs.unlink(path, err => {
    if (err) {
        console.log("删除失败")
    }
    console.log("删除成功")
})

// rm方法默认递归删除目录
fs.rm(path, err => {
    if (err) {
        console.log("删除失败")
    }
    console.log("删除成功")
})
```

### 2.5 文件夹操作 

文件夹操作

| 方法                  | 语法                                                         | 说明       |
| --------------------- | ------------------------------------------------------------ | ---------- |
| mkdir / mkdirSync     | `fs.mkdir(path[, options], callback)`/`fs.mkdirSync(path[, options])` | 创建文件夹 |
| readdir / readdirSync | `fs.readdir(path[, options], callback)`/`fs.readdirSync(path[, options])` | 读取文件夹 |
| rmdir / rmdirSync     | `fs.rmdir(path[, options], callback)`/`fs.rmdirSync(path[, options])` | 删除文件夹 |

创建和删除中option可以为` {recursive: true}`此设置为递归创建/删除

```js
//异步删除文件夹
fs.rmdir('./page', err => {
if(err) throw err;
console.log('删除成功');
});
//异步递归删除文件夹
fs.rmdir('./1', {recursive: true}, err => {
if(err) {
console.log(err);
}
console.log('递归删除')
});
//同步递归删除文件夹
fs.rmdirSync('./x', {recursive: true})
```

### 2.6 查看资源状态

| 方法          | 语法                                 | 说明               |
| ------------- | ------------------------------------ | ------------------ |
| stat/statSync | `fs.stat(path[, options], callback)` | 查看资源的详细信息 |

```js
//异步获取状态
fs.stat('./data.txt', (err, data) => {
if(err) throw err;
console.log(data);
});
//同步获取状态
let data = fs.statSync('./data.txt');
```

### 2.7 获取绝对路径

相对路径可能导致意想不到的bug，`__dirname`和相对路径拼接生成绝对路径更为安全

```js
console.log(__dirname)
```

### 2.8 练习：批量重命名

```js
const fs = require('fs')

const data = fs.readdirSync("./FileSystem")

//重命名
for (let i = 0; i < data.length; i++) {
    const nowName = './FileSystem/' + data[i]
    const newName = './FileSystem/' + 'renamed_' + data[i]
    fs.rename(nowName, newName, err => {
        if (err) {
            console.log('\r\nfile    ' + nowName + '    renamed failed')
            return
        }
        console.log('\r\n' + nowName + '    \r\tis successfully renamed to    \r\t' + newName)
        return
    })
}


// // 删除重命名
// for (let i = 0; i < data.length; i++) {
//     const nowName = './FileSystem/' + data[i]
//     const newName = './FileSystem/' + data[i].slice(8)
//     fs.rename(nowName, newName, err => {
//         if (err) {
//             console.log('\r\nfile    ' + nowName + '    renamed failed')
//             return
//         }
//         console.log('\r\n' + nowName + '    \r\tis successfully renamed to    \r\t' + newName)
//         return
//     })
// }
```

#### 思考

可以使用`file.forEach(item => {})`代替for循环，更加简洁

可以用模板字符串``来拼接

```js
const newName = `renamed_${originalName}`
```

## 3. path模块

| API           | 说明                                 | 参数                                 | 返回值       | 备注 |
| ------------- | ------------------------------------ | ------------------------------------ | ------------ | ---- |
| path.resolve  | 拼接规范的绝对路径                   | `...paths: string[]`                 | `string`     | 常用 |
| path.sep      | 获取操作系统的路径分隔符             | N/A                                  | `string`     | X    |
| path.parse    | 解析路径并返回对象                   | `pathString: string`                 | `pathObject` | X    |
| path.basename | 获取路径的基础名称(此js文件的文件名) | `pathString: string`, `ext?: string` | `string`     | X    |
| path.dirname  | 获取路径的目录名                     | `pathString: string`                 | `string`     | X    |
| path.extname  | 获得路径的扩展名                     | `pathString: string`                 | `string`     | X    |

`path.resolve`

`.`的绝对路径(`__dirname`)和相对路径拼接产生绝对路径

```js
const path = require('path');

const absolutePath = path.resolve(__dirname, 'file.txt');
console.log(absolutePath); // 输出完整的绝对路径
```

## 4. HTTP模块

### 4.1 创建HTTP服务

```js
const http = require('http')

const server = http.createServer((request, response) => {

})
```

request 是对请求报文的封装对象, 通过 request 对象可以获得请求报文的数据
response 是对响应报文的封装对象, 通过 response 对象可以设置响应报文

**http.createServer 里的回调函数的执行时机: 当接收到 HTTP 请求的时候，就会执行**

### 4.2 获取HTTP请求报文

| 含义               | 语法                                                         |
| ------------------ | ------------------------------------------------------------ |
| **请求方法**       | `request.method`                                             |
| 请求版本           | `request.httpVersion`                                        |
| **请求路径**       | `request.url`                                                |
| **URL 路径**       | `require('url').parse(request.url).pathname`                 |
| **URL 查询字符串** | `require('url').parse(request.url, true).query`              |
| **请求头**         | `request.headers`                                            |
| 请求体             | `request.on('data', function(chunk){})`<br>`request.on('end', function(){})` |

注意事项： 

1. request.url 只能获取路径以及查询字符串，无法获取 URL 中的域名以及协议的内容 
2. request.headers 将请求信息转化成一个对象，并将属性名都转化成了`lower case`
3. 关于路径：如果访问网站的时候，只填写了 IP 地址或者是域名信息，此时请求的路径为`\`
4. 关于 favicon.ico：这个请求是属于浏览器自动发送的请求

```js
//1. 导入 http 模块
const http = require('http');
//2. 创建服务对象 create 创建 server 服务
// request 意为请求. 是对请求报文的封装对象, 通过 request 对象可以获得请求报文的数据
// response 意为响应. 是对响应报文的封装对象, 通过 response 对象可以设置响应报文
const server = http.createServer((request, response) => {
    // 获取请求方法
    console.log(request.method)

    // 获取请求URL
    console.log(request.url)// 只包含url的路径和查询字符串

    // 获取HTTP协议版本号
    console.log(request.httpVersion)

    // 获取请求头
    console.log(request.headers)

    response.end('Hello HTTP server');
});
//3. 监听端口, 启动服务
server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中，运行在 http://127.0.0.1:9000 ...');
});
```

#### 获取请求体

1. 声明一个变量
2. 绑定事件
3. 绑定end事件

```js
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
```

#### 提取HTTP报文的URL路径和查询字符串

方法1：使用URL模块

1. 导入URL模块
2.  解析request.url
3. `let pathName = res.pathname`

```js
const http = require('http');
// 1. 导入URL模块
const url = require('url')

const server = http.createServer((request, response) => {
    // 2. 解析request.url
    let res = url.parse(request.url)
    // console.log(res)
    /*
    Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: '/'
}
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/favicon.ico',
  path: '/favicon.ico',
  href: '/favicon.ico'
}
    */

    // 路径
    let pathName = res.pathname
    // console.log(pathName)

    let res2 = url.parse(request.url, true)
    let keyword = res2.query.keyword
    console.log(keyword)

    response.end('url')
});

server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中，运行在 http://127.0.0.1:9000 ...');
});
```

方法2：实例化一个URL对象（推荐）

```js
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
```

### 4.3 练习：实现按照要求搭建 HTTP 服务

| 请求类型(方法) | 请求地址 | 响应体结果 |
| -------------- | -------- | ---------- |
| GET            | /login   | 登录页面   |
| GET            | /reg     | 注册页面   |

```js
const http = require('http')

const server = http.createServer((res, rep) => {
    let url = new URL(res.url, 'http://127.0.0.1:9000')
    if (url.pathname == '/login') {
        rep.end('this is login page')
    }
    if (url.pathname == '/reg') {
        rep.end('this is register page')
    }
    // rep.end('Hi')
})

server.listen(9000, () => {
    console.log('http://127.0.0.1:9000')
})
```

#### 思考

+ 不能有多个`response.end()`
+ 上面的实现没有实现判断请求类型的方法（GET）
+ 除了login和reg没有其他的页面可以返回（比如输入`http://127.0.0.1:9000/test`）

#### 改进

```js
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
```

### 4.4 HTTP响应报文

| 作用             | 语法                                               |
| ---------------- | -------------------------------------------------- |
| 设置响应状态码   | `response.statusCode`                              |
| 设置响应状态描述 | `response.statusMessage` （ 用的非常少 ）          |
| 设置响应头信息   | `response.setHeader('头名', '头值')`               |
| 设置响应体       | `response.write('xx')` <br />`response.end('xxx')` |

```js
const http = require('http')

// 响应头
/*
HTTP/1.1 200 OK
Date: Sat, 17 Feb 2024 01:04:28 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 2
 */

const server = http.createServer((res, rep) => {
    // 1. 设置响应状态码    200
    // rep.statusCode = 404

    // 2. 响应状态描述      OK
    rep.statusMessage = 'hi'

    // 3. 响应头
    // rep.setHeader(headerName, content)
    rep.setHeader('content-type', 'text/html;charset=utf-8')

    // 4. 响应体
    rep.write('write  ')
    rep.write('write  ')
    rep.write('write  ')
    rep.write('write  ')


    rep.end()
})

server.listen(9000, () => {
    console.log('http://127.0.0.1:9000')
})
```

### 4.5  使用node渲染HTML和CSS文件

html file

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="p2.css">
</head>

<body>
    <table>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
        </tr>

        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>

        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>

        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
    </table>

</body>

</html>
```

css file

```css
table {
    border: 1px solid black;
    background-color: lightblue;
}

th {
    width: 200px;
    border: 1px solid black;
}

td {
    width: 200px;
    border: 1px solid black;
    text-align: center;
}
```

node file

```js
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, rep) => {
    // 获取url路径
    let { pathname } = new URL(req.url, 'http://127.0.0.1')

    if (pathname === '/') {
        // 读取html文件内容
        fs.readFile(__dirname + '/p2.html', (err, html) => {
            if (err) {
                console.log('读取失败')
            }
            else {
                rep.writeHead(200, { 'Content-Type': 'text/html' })
                rep.write(html)
                console.log('读取成功')
                rep.end()
            }
            return
        })
    } else if (pathname === '/p2.css') {
        fs.readFile(__dirname + '/p2.css', (err, css) => {
            if (err) {
                console.log('读取失败')
            }
            else {
                rep.write(css)
                console.log('读取成功')
                rep.end()
            }
            return
        })
    } else {
        rep.statusCode = 404
        rep.end('<h1>404 Not Found</h1>')
    }


})

server.listen(9000, () => {
    console.log('http://127.0.0.1:9000')
})
```

单独的CSS文件，直接使用`readFile`写入html文件会出现导入不出CSS样式的问题，原因是浏览器将CSS文件也渲染为了HTML文件，需要区分渲染的`pathname`，单独渲染html和css

#### Limitation

很多if else区分渲染的文件类型很麻烦

### 4.6 搭建静态资源服务

```c
/**
 * 创建一个 HTTP 服务，端口为 9000，满足如下需求
 * GET  /index.html        响应  page/index.html 的文件内容
 * GET  /css/app.css       响应  page/css/app.css 的文件内容
 * GET  /images/BlackholeCat.jpg   响应  page/images/BlackholeCat.jpg 的文件内容
 */
```

如果像之前一样

```js
  // 获取url路径
  let { pathname } = new URL(req.url, 'http://127.0.0.1')
  let { method } = req

  if (method === 'GET' && pathname === '/index.html') {
    // 读取html文件内容
    let html = fs.readFileSync(__dirname + '/page/index.html')
    rep.write(html)
    rep.end()
  } else if (method === 'GET' && pathname === '/app.css') {
    let css = fs.readFileSync(__dirname + '/page/css/app.css')
    rep.write(css)
    rep.end()
  } else if (method === 'GET' && pathname === '/img.png') {
    let img = fs.readFileSync(__dirname + '/page/images/BlackholeCat.jpg')
    rep.write(img)
    rep.end()
  } else {
    rep.statusCode = 404
    rep.end('<h1>404 Not Found</h1>')
  }
```

会非常麻烦，可以使用

```js
  let filePath = __dirname + '/page' + pathname
  fs.readFile(filePath, (err, data) => {
    if (err) {
      rep.statusCode = 500
      rep.end('文件读取失败')
      return
    }
    rep.end(data)
  })
```

这样每次在`/page`中新加入一个静态资源，比如在`/page/js`加入一个`abc.js`就可以通过`http://127.0.0.1:9000/js/abc.js`来访问其内容。`/page`被称为网站根目录

```js
let root = __dirname + '/page'
```

完整代码

```js
/**
 * 创建一个 HTTP 服务，端口为 9000，满足如下需求
 * GET  /index.html        响应  page/index.html 的文件内容
 * GET  /css/app.css       响应  page/css/app.css 的文件内容
 * GET  /images/BlackholeCat.jpg   响应  page/images/BlackholeCat.jpg 的文件内容
 */
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, rep) => {
  // 获取url路径
  let { pathname } = new URL(req.url, 'http://127.0.0.1')
  let { method } = req
  const root = __dirname + '/page'
  let filePath = root + pathname
  fs.readFile(filePath, (err, data) => {
    if (err) {
      rep.statusCode = 500
      rep.end('Read file failed')
      return
    }
    rep.end(data)
  })

})

server.listen(9000, () => {
  console.log('http://127.0.0.1:9000')
})
```

### 补充：网页中的URL路径

#### 绝对路径



| 形式                | 特点                                                         |
| ------------------- | ------------------------------------------------------------ |
| http://test.com/web | 直接向目标资源发送请求，容易理解。网站的外链会用到此形式     |
| //test.com/web      | 与页面 URL 的协议拼接形成完整 URL 再发送请求。大型网站用的比较多 |
| /web                | 与页面 URL 的协议、主机名、端口拼接形成完整 URL 再发送请求。中小型网站 |

#### 相对路径

相对路径在发送请求时，需要与当前页面 URL 路径进行 计算 ，得到完整 URL 后，再发送请求，学习阶 段用的较多 例如当前网页 url 为 http://www.test.com/course/h5.html

| 文件路径           | 最终的 URL                                                   |
| ------------------ | ------------------------------------------------------------ |
| ./css/app.css      | [http://www.test.com/course/css/app.css](http://www.test.com/course/css/app.css) |
| js/app.js          | [http://www.test.com/course/js/app.js](http://www.test.com/course/js/app.js) |
| ../img/logo.png    | [http://www.test.com/img/logo.png](http://www.test.com/img/logo.png) |
| ../../mp4/show.mp4 | [http://www.test.com/mp4/show.mp4](http://www.test.com/mp4/show.mp4) |

#### 测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URL</title>
</head>
<body>
  <!-- 绝对路径 -->
  <a href="https://www.baidu.com">百度</a>
  <a href="//jd.com">京东</a>
  <a href="/search">搜索</a>
  <hr>
  <!-- 相对路径 -->
  <a href="./css/app.css">访问CSS</a>
  <a href="js/app.js">访问JS</a>
  <a href="../img/logo.png">访问图片</a>
  <a href="../../img/logo.png">访问图片</a>
</body>
</html>
```

### 4.7 设置mime类型

```
html: 	'text/html',
css	: 	'text/css',
js	: 	'text/javascript',
png	: 	'image/png',
jpg	: 	'image/jpeg',
gif	: 	'image/gif',
mp4	: 	'video/mp4',
mp3	: 	'audio/mpeg',
json: 	'application/json'

其他未知的资源:application/octet-stream
```

此处为mime类型

```js
rep.writeHead(200, { 'Content-Type': 'text/html' })
rep.setHeader('content-type', type)
```

#### 改进4.6中的js code

将渲染的内容的mime类型设置正确

```js
const path = require('path')
let mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}
...
    // 获取文件后缀
    let ext = path.extname(filePath).slice(1)
    // 获取对应的类型
    let type = mimes[ext]
    if (type) {
      rep.setHeader('content-type', type)
    } else {
      rep.setHeader('content-type', 'application/octet-stream')
    }
...
```

### 4.8 错误处理

```js
    if (req.method !== 'GET') {
      rep.statusCode = 405
      rep.end('<h1>405 METHOD NOT ALLOWED</h1>')
      return
    }
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          rep.statusCode = 404
          rep.end('<h1>404 NOT FOUND</h1>')
          break
        case 'EPERM':
          rep.statusCode = 403
          rep.end('<h1>403 FORBIDDEN</h1>')
          break
      }
      return
    }
```

### GET 和 POST 请求场景小结

#### GET 请求的情况：

- 在地址栏直接输入 URL 访问
- 点击链接 `<a>`
- 使用 `<link>` 标签引入 CSS
- 使用 `<script>` 标签引入 JavaScript
- 使用 `<img>` 标签引入图片
- 使用 `<form>` 标签，其中 `method` 属性为 GET（不区分大小写）
- 在 AJAX 请求中使用 GET 请求

#### POST 请求的情况：

- 使用 `<form>` 标签，其中 `method` 属性为 POST（不区分大小写）
- 在 AJAX 请求中使用 POST 请求

#### GET 和 POST 请求的区别：

- GET 主要用于获取数据，POST 主要用于提交数据。
- GET 请求中，参数附加在 URL 后面，而 POST 请求中，参数放在请求体中。
- POST 请求相对于 GET 请求来说，更安全一些，因为 GET 请求中的参数会暴露在地址栏中。
- GET 请求有大小限制，一般为 2KB，而 POST 请求则没有大小限制。

### 4.6-4.8 搭建静态资源服务完整代码

```js
/**
 * 创建一个 HTTP 服务，端口为 9000，满足如下需求
 * GET  /index.html        响应  page/index.html 的文件内容
 * GET  /css/app.css       响应  page/css/app.css 的文件内容
 * GET  /images/BlackholeCat.jpg   响应  page/images/BlackholeCat.jpg 的文件内容
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
let mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}

const server = http.createServer((req, rep) => {
  let { pathname } = new URL(req.url, 'http://127.0.0.1')
  let { method } = req

  const root = __dirname + '/page'
  let filePath = root + pathname
  
  fs.readFile(filePath, (err, data) => {
  	// 错误处理
    if (req.method !== 'GET') {
      rep.statusCode = 405
      rep.end('<h1>405 METHOD NOT ALLOWED</h1>')
      return
    }
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          rep.statusCode = 404
          rep.end('<h1>404 NOT FOUND</h1>')
          break
        case 'EPERM':
          rep.statusCode = 403
          rep.end('<h1>403 FORBIDDEN</h1>')
          break
      }
      return
    }
    
    // 设置mime
    let ext = path.extname(filePath).slice(1)
    let type = mimes[ext]
    if (type) {
      rep.setHeader('content-type', type)
    } else {
      rep.setHeader('content-type', 'application/octet-stream')
    }

    rep.end(data)
  })

})

server.listen(9000, () => {
  console.log('http://127.0.0.1:9000')
})
```

