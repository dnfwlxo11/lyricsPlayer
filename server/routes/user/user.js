const express = require('express');
const router = express.Router();
const Quries = require('./Queries/query');
const mariaDB = require('../../modules');
const DB = mariaDB.Database;

router.post('/register', (req, res, next) => {
    const insertUserWork = DB.connect(async (conn) => {
        const sql = Quries.insertUser(req.body);
        const result = await conn.query(sql);

        return result
    })

    insertUserWork()
    .then((result) => {
        res.send({ 'success': true, result });
    })
    .catch((err) => {
        next(err);
    })
})

router.post('/check', (req, res, next) => {
    const selectUserWork = DB.connect(async (conn) => {
        const sql = Quries.selectUser(req.body.id);
        const rows = await conn.query(sql);

        console.log(rows[0])
        if (rows[0] == undefined) return false
        return true
    })

    selectUserWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    })
})

router.post('/login', (req, res, next) => {
    console.log(req.body)
})

module.exports = router