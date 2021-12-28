const express = require('express');
const router = express.Router();
const Quries = require('./Queries/query');
const mariaDB = require('../../modules');
const User = require('./models')
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
    });

    selectUserWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/login', (req, res, next) => { 
    const selectUserInfoWork = DB.connect(async (conn) => {
        const sql = Quries.selectUserInfo(req.body.id);
        const rows = await conn.query(sql);

        console.log(rows)

        if (rows[0] == undefined) return false
        else {
            if (rows[0].password == req.body.password) {
                console.log(User.generateToken(req.body.password))
                return User.generateToken(req.body.password);
            } else return false;
        }
    })

    selectUserInfoWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, 'token': result })
    })
})

module.exports = router