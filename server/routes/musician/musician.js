const express = require('express');
const router = express.Router();
const Quries = require('./Queries/query');
const DB = global._modules.Database;

router.post('/album/:musicians', (req, res, next) => {
    const selectMusicianAlbumsWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicianAlbums(decodeURI(req.params.musicians));
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
        const sql = Quries.selectMusicianSongs(decodeURI(req.params.musicians));
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