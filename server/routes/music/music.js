const express = require('express');
const router = express.Router();

router.get('/songs', (req, res, next) => {
    res.send({ 'success': true })
})

module.exports = router