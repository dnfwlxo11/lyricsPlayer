const express = require('express');
const router = express.Router();
const fs = require('fs');
const Quries = require('./Queries/query');
const mariaDB = require('../../modules');
const path = require('path');
const DB = mariaDB.Database;

router.post('/:albumName', (req, res, next) => {
    const selectAlbumMusicsWork = DB.connect(async (conn) => {
        const sql = Quries.selectAlbumMusics(req.params.albumName.replace(/-/g, ' '));
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows
    });

    selectAlbumMusicsWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/info/:albumName', (req, res, next) => {
    const selectAlbumInfoWork = DB.connect(async (conn) => {
        const sql = Quries.selectAlbumInfo(req.params.albumName.replace(/-/g, ' '));
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows[0]
    });

    selectAlbumInfoWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

module.exports = router