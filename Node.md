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

## 5. 模块化

导出模块内的数据

```js
module.exports = value
exports.name = value
```

在另一个模块中导入

使用自己开发的模块时 使用相对路径

```js
const test = require('./test')
```

### 注意事项

1. 对于自己创建的模块，建议在导入时使用相对路径，并且不能省略 `./` 和 `../`。

2. 对于 JavaScript 和 JSON 文件，导入时可以省略文件后缀。而对于 C/C++ 编写的 Node 扩展文件，一般情况下也可以省略文件后缀，但通常用不到。

3. 如果导入的路径是一个文件夹，则会优先检测该文件夹下的 `package.json` 文件中的 `main` 属性对应的文件。如果该文件存在，则导入成功；如果文件不存在，则会报错。如果 `main` 属性不存在或者 `package.json` 文件不存在，则会尝试导入文件夹下的 `index.js` 和 `index.json` 文件，如果仍然没有找到，则会报错。

4. 导入 Node.js 内置模块时，直接使用 `require` 加上模块的名字即可，无需加上 `./` 和 `../`。

## 6. Express

### 6.1 路由

路由确定了应用程序如何响应客户端对特定端点的请求

```js
app.get('/home', (request, response) => {
    response.end('hello express')
})

app.get('/', (req, res) => {
    res.end('home')
})

app.post('/login', (req, res) => {
    res.end('loginloginloginlogin')
})

app.all('/test', (req, res) => {
    res.end('test test test')
})

app.all('*', (req, res) => {
    res.end('<h1>404 Not Found</h1>')
})
```

### 6.2 获取请求参数

```js
const express = require('express')

const app = express()

app.get('/request', (req, res) => {
    // 原生操作
    console.log(req.method)
    console.log(req.url)
    console.log(req.httpVersion)
    console.log(req.headers)

    // express
    console.log(req.path)
    console.log(req.query)
    // 获取IP
    console.log(req.ip)
    // 获取请求头
    console.log(req.get('host'))


    res.end('Hi this is OMEN')
})


app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
```

### 6.3 获取路由参数

可以使用通配符设置`'/:id.html'`

```js
app.get('/:id.html', (req, res) => {
    // 获取URL路由参数
    console.log(req.params.id)
    req.end(req.params.id)

})
```

通过`req.params.id`来获取路由参数

### 练习：根据路由参数响应歌手的信息

路径结构如下

```
/singer/1.html
```

显示歌手的`姓名`和`图片`

```json
{
  "singers": [
    {
      "singer_name": "周杰伦",
      "singer_pic": "http://y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.webp",
      "other_name": "Jay Chou",
      "singer_id": 4558,
      "id": 1
    },
    {
      "singer_name": "林俊杰",
      "singer_pic": "http://y.gtimg.cn/music/photo_new/T001R150x150M000001BLpXF2DyJe2.webp",
      "other_name": "JJ Lin",
      "singer_id": 4286,
      "id": 2
    },
    {
      "singer_name": "G.E.M. 邓紫棋",
      "singer_pic": "http://y.gtimg.cn/music/photo_new/T001R150x150M000001fNHEf1SFEFN.webp",
      "other_name": "Gloria Tang",
      "singer_id": 13948,
      "id": 3
    },
    {
      "singer_name": "薛之谦",
      "singer_pic": "http://y.gtimg.cn/music/photo_new/T001R150x150M000002J4UUk29y8BY.webp",
      "other_name": "",
      "singer_id": 5062,
      "id": 4
    }
  ]
}
```

#### 初次实现

```js
const express = require('express')
const app = express()
const fs = require('fs')

app.get('/singer/:id.html', (req, res) => {
    const json = fs.readFileSync('./Singers.json')
    const data = JSON.parse(json)

    const singer = data['singers'][req.params.id - 1]
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>${singer["singer_name"]}</h1>
        <img src="${singer["singer_pic"]}" alt="">
        <h2>${singer["other_name"]}</h2>
        <h2>把你的爱给${singer["singer_id"]}号</h2>
    </body>
    </html>
    `
    res.end(html)
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
```

#### limitations

+ 能不能单独创建一个html，将数据返回给html而不是在js file里这样操作
+ JSON文件第一次尝试读取，看上去有点儿怪`JSON.parse(json)`

#### 改进

使用`require`读取JSON文件 而不是`fs`和`JSON.parse(json)`

```js
const { singers } = require('./Singers')
```

使用`.find`方法

```js
    let { id } = req.params
    let result = singers.find(item => {
        if (item.id === Number(id)) {
            return true
        }
    })

    // 判断是否合法
    if (!result) {
        res.statusCode = 404
        res.end('<h1>404 Not Found</h1>')
        return
    } 
```

### 6.4 响应参数

```js
//获取响应的路由规则
app.get("/response", (req, res) => {
    //1. express 中设置响应的方式兼容 HTTP 模块的方式
    res.statusCode = 404;
    res.statusMessage = 'xxx';
    res.setHeader('abc', 'xyz');
    res.write('响应体');
    res.end('xxx');
    //2. express 的响应方法
    res.status(500); //设置响应状态码
    res.set('xxx', 'yyy');//设置响应头
    res.send('中文响应不乱码');//设置响应体
    //连贯操作
    res.status(404).set('xxx', 'yyy').send('你好朋友')
    //3. 其他响应
    res.redirect('https://baidu.com')//重定向
    res.download('./package.json');//下载响应
    res.json();//响应 JSON
    res.sendFile(__dirname + '/home.html') //响应文件内容
});
```

### 6.5 全局中间件

如果想获取路由的IP和url则需要在路由中加入

```js
app.get("/home", (req, res) => {
    
    // 获取url和ip
    let { url, ip } = req
    // 将文件保存在access.log
    fs.appendFileSync(path.resolve(__dirname , './access.log'), `${url} ${ip}\r\n`)
    
    res.send('front homepage')
});
```

但是如果要获得每一个路由的url和ip则需要在每个路由中都加入，这样很麻烦，可以通过构建全局中间件来简化

```js
function recordMiddleware(req, res, next) {
    // 获取url和ip
    let { url, ip } = req
    // 将文件保存在access.log
    fs.appendFileSync(path.resolve(__dirname , './access.log'), `${url} ${ip}\r\n`)
    // 调用next
    next()
}

// 谁用中间件函数
app.use(recordMiddleware)
```

### 6.6 路由中间件

实现需求

```js
/**
 * 针对 /admin  /setting 的请求, 要求 URL 携带 code=521 参数, 如未携带提示『暗号错误』  
 */
```

封装一个路由中间件

```js
let checkCodeMiddleware = (req, res, next) => {
    // 判断URL中code是否为521
    if (req.query.code === '521') {
        next()
    } else {
        res.send('暗号错误')
    }
}
```

在需要加入校验的路由后加上中间件

```js
app.get('/admin', checkCodeMiddleware, (req, res) => {
    if (res)
        res.send('end homepage')
})

app.get('/setting', checkCodeMiddleware, (req, res) => {
    res.send('setting page')
})

app.get('*', (req, res) => {
    res.send('<h1>404 NOT FOUND</h1>')
})
```

当输入`http://127.0.0.1:3000/setting`时，返回`暗号错误`输入`http://127.0.0.1:3000/setting?code=521`后返回`setting page`

### 6.7 静态资源中间件

```js
// 静态资源中间件设置
app.use(express.static(__dirname + '/public'))
```

相当于之前第四章HTTP模块中的

```js
    // 获取文件后缀
    let ext = path.extname(filePath).slice(1)
    // 获取对应的类型
    let type = mimes[ext]
    if (type) {
      rep.setHeader('content-type', type)
    } else {
      rep.setHeader('content-type', 'application/octet-stream')
```

加入这个中间件之后可以直接在网页访问静态资源

```js
const express = require('express')
const app = express()

// 静态资源中间件设置
app.use(express.static(__dirname + '/public'))

app.get("/home", (req, res) => {
    res.send('front homepage')
});

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
```

静态资源目录中的`index.html`默认被访问`http://127.0.0.1:3000/`等价于`http://127.0.0.1:3000/index.html`

### 练习：在局域网内可以访问的网页

```js
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/random-choice-picker'))

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
```

配置好静态资源中间件即可

### 6.8 获取请求体数据

使用`body-parser`模块来获取请求体的数据

导入模块并实例化一个parser

```js
const bodyParser = require('body-parser')
const parser = bodyParser.urlencoded({ extended: false })
```

将parser作为路由中间件使用

```js
app.post('/login', parser, (req, res) => {
    // 获取用户数据
    console.log(req.body)

    res.send('获取用户数据')
})
```

使用后会给`req`增加一个body属性

```js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const parser = bodyParser.urlencoded({ extended: false })

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

app.post('/login', parser, (req, res) => {
    // 获取用户数据
    console.log(req.body)

    res.send('获取用户数据')
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
```

### 6.9 路由模块化

```js
const express = require('express')
const app = express()
const adminRouter = require('./routers/adminHomepage')
const homeRouter = require('./routers/frontHomepage')

app.use(adminRouter)
app.use(homeRouter)

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
```

adminHomepage

```js
const express = require('express')
const router = express.Router()

router.get('/admin', (req, res) => {
    res.send('admin page')
})

router.get('/setting', (req, res) => {
    res.send('setting')
})

module.exports = router
```

## 案例

