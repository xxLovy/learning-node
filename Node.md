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



### 2.2 文件读取 

### 2.3文件移动与重命名 

### 2.4 文件删除 

### 2.5 文件夹操作 

### 2.6查看资源状态