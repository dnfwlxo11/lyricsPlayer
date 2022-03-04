const express = require('express');
const axios = require('axios');
const router = express.Router();

const api = axios.create({
    baseURL: 'http://daein-fastapi:8000',
    timeout: 60000
});

router.get('/*', async (req, res, next) => {
    try {
        let aiResult = await api.get(req.originalUrl);

        res.send(aiResult.data)
    } catch (err) {
        console.log(err, 'err')
        res.send({ 'success': false })
    }
})

module.exports = router;