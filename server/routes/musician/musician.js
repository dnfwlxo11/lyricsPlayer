const express = require('express');
const router = express.Router();
const Quries = require('./Queries/query');
const DB = global._modules.Database;

router.post('/album/:mid', (req, res, next) => {
    const selectMusicianAlbumsWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicianAlbums(req.params.mid);
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

router.post('/song/:mid', (req, res, next) => {
    const selectMusicianSongsWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicianSongs(req.params.mid);
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