const express = require('express');
const router = express.Router();
const fs = require('fs');
const Quries = require('./Queries/query');
const mariaDB = require('../../modules');
const path = require('path');
const DB = mariaDB.Database;

router.post('/:musicians', (req, res, next) => {
    console.log(req.params.musicians.replace(/-/g, ' '))
    const selectMusicianAlbumWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicianAlbum(req.params.musicians.replace(/-/g, ' '));
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows
    });

    selectMusicianAlbumWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

module.exports = router