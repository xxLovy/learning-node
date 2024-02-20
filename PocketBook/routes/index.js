var express = require('express');
var router = express.Router();
var path = require('path');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)

router.get('/account', function (req, res, next) {
  let indexPath = path.join(__dirname, '..', 'public', 'index.html');
  res.sendFile(indexPath);
});

router.get('/account/create', function (req, res, next) {
  let indexPath = path.join(__dirname, '..', 'public', 'create.html');
  res.sendFile(indexPath);
});

// 新增记录
router.post('/account', (req, res) => {
  // 获取请求体数据
  // {"title":"Book","time":"2024-02-16","type":"-1","account":"233","remarks":"haha"}
  // 生成id
  let id = shortid.generate()
  // 写入文件
  db.get('accounts').unshift({ id: id, ...req.body }).write()

  let indexPath = path.join(__dirname, '..', 'public', 'success.html');
  res.sendFile(indexPath);

})

module.exports = router;
