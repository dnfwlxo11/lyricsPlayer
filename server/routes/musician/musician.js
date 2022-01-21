const express = require('express');
const router = express.Router();
const fs = require('fs');
const Quries = require('./Queries/query');
const mariaDB = require('../../modules');
const path = require('path');
const DB = mariaDB.Database;

router.get('/:musicians', (req, res, next) => {

    const selectMusicianInfoWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicianInfo(req.body.id);
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows
    });

    selectMusicianInfoWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });

    res.send({ 'success': true })
})

module.exports = router