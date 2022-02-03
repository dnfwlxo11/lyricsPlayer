const express = require('express');
const router = express.Router();
const Queries = require('./Queries/query');
const mariaDB = require('../../modules');
const path = require('path');
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

router.post('/submit', (req, res, next) => {
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

module.exports = router;