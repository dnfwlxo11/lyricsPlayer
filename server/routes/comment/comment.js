const express = require('express');
const router = express.Router();
const Queries = require('./Queries/query');
const mariaDB = require('../../modules');
const path = require('path');
const { auth } = require('../../modules/auth');
const DB = mariaDB.Database;

router.post('/comments', (req, res, next) => {
    
    const selectCommentsWork = DB.connect(async (conn) => {
        const sql = Queries.selectComments(req.body.songName);
        const rows = await conn.query(sql);

        if (rows == undefined) return false

        return rows
    });

    selectCommentsWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/submit', auth, (req, res, next) => {
    let params = req.body;
    params.userId = req.user.uid;

    const insertCommentWork = DB.connect(async (conn) => {
        const sql = Queries.insertComment(req.body);
        const result = await conn.query(sql);

        return result
    });

    insertCommentWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/modify', auth, (req, res, next) => {
    let params = req.body;
    params.userId = req.user.uid;

    const updateCommentWork = DB.connect(async (conn) => {
        const sql = Queries.updateComment(params);
        const result = await conn.query(sql);

        return result
    });

    updateCommentWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/delete', auth, (req, res, next) => {
    let params = req.body;
    params.userId = req.user.uid;

    const deleteCommentWork = DB.connect(async (conn) => {
        const sql = Queries.deleteComment(params);
        const result = await conn.query(sql);

        return result
    });

    deleteCommentWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

module.exports = router;