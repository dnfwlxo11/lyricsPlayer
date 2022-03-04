const express = require('express');
const router = express.Router();
const Queries = require('./Queries/query');
const { auth } = require('../../modules/auth');
const DB = global._modules.Database;

router.post('/commentCnt', (req, res, next) => {
    const selectCommentCntWork = DB.connect(async (conn) => {
        const sql = Queries.selectCntComments(req.body);
        const rows = await conn.query(sql);

        if (rows == undefined) return false

        return rows[0]
    });

    selectCommentCntWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/comments', (req, res, next) => {
    const selectCommentsWork = DB.connect(async (conn) => {
        const sql = Queries.selectComments(req.body);
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
        const sql = Queries.insertComment(params);
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