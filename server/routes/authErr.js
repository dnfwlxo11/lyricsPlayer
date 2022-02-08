var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    res.send({ 'success': false, 'msg': '로그인이 만료되었습니다.'} );
})

module.exports = router;