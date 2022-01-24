const express = require('express');
const router = express.Router();
const fs = require('fs');
const Quries = require('./Queries/query');
const mariaDB = require('../../modules');
const path = require('path');
const DB = mariaDB.Database;

router.post('/album/:musicians', (req, res, next) => {
    const selectMusicianAlbumsWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicianAlbums(req.params.musicians.replace(/-/g, ' '));
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows
    });

    selectMusicianAlbumsWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/song/:musicians', (req, res, next) => {
    const selectMusicianSongsWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicianSongs(req.params.musicians.replace(/-/g, ' '));
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows
    });

    selectMusicianSongsWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

module.exports = router