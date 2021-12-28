const express = require('express');
const router = express.Router();

router.get('/musicians', (req, res, next) => {
    res.send({ 'success': true })
})

module.exports = router