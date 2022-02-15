const express = require('express');
const router = express.Router();
const Quries = require('./Queries/query');
const User = require('./models')
const DB = global._modules.Database;
const { auth } = require('../../modules/auth');

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

        if (rows[0] == undefined) return false
        else {
            if (rows[0].password == req.body.password) {
                return User.generateToken({
                    'uid': rows[0].uid,
                    'id': rows[0].id,
                });
            } else return false;
        }
    })

    selectUserInfoWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, 'token': result })
    })
})

router.post('/authenticate', auth, (req, res, next) => {
    if (req.success) {
        const selectUserInfoWork = DB.connect(async (conn) => {
            const sql = `SELECT uid, id FROM tb_users WHERE uid = "${req.user.uid}"`;
            const rows = await conn.query(sql);
    
            if (!rows.length) return false;
    
            return rows[0];
        });
    
        selectUserInfoWork()
        .then((result) => {
            if (!result) res.send({ 'success': false });
            else res.send({ 'success': true, result });
        })
    } else {
        res.send({ 'success': false });
    }
})

module.exports = router