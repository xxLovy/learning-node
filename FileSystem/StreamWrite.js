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