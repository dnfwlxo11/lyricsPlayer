var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ 'success': true, 'msg': '서버 가동 중' });
});

module.exports = router;
