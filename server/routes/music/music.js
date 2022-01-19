const express = require('express');
const router = express.Router();
const fs = require('fs');
const Quries = require('./Queries/query');
const mariaDB = require('../../modules');
const path = require('path');
const DB = mariaDB.Database;

router.get('/songs/:musician', (req, res, next) => {
    let musician = req.params.musician.replace(/-/g, ' ')
    let musicsPath = path.join(_workDir, 'music', musician)

    let musics = fs.readdirSync(musicsPath)

    console.log(musics)

    res.send({ 'success': true, 'musics': musics });
})

router.get('/albums/:musician', (req, res, next) => {
    res.send({ 'success': true, 'albums': [] });
})

router.get('/play/:musician/:musicName', (req, res, next) => {
    let musicianName = req.params.musician.replace(/-/g, ' ');
    let musicName = req.params.musicName.replace(/-/g, ' ');
    let musicPath = path.join(_workDir, 'music', musicianName, musicName);

    let musicFile = fs.statSync(musicPath);

    res.writeHead(200, {
        "Content-Type": "audio/mp3",
        "Accept-Ranges": "bytes",
        "Content-Length": musicFile.size,
    })

    let audioStream = fs.createReadStream(musicPath);
    audioStream.pipe(res);
})

router.post('/ranking', (req, res, next) => {
    const selectMusicRankingWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicRanking(req.body.id);
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows
    });

    selectMusicRankingWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/info', (req, res, next) => {
    const selectMusicInfoWork = DB.connect(async (conn) => {
        const sql = Quries.selectMusicInfo(req.body.musicName.replace(/-/g, ' '));
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows[0]
    });

    selectMusicInfoWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/search/:keyword', (req, res, next) => {
    const selectSearchSongWork = DB.connect(async (conn) => {
        const sql = Quries.selectSearchSong(req.params.keyword.replace(/-/g, ' '));
        const rows = await conn.query(sql);

        console.log(rows)
        if (rows == undefined) return false
        return rows
    });

    selectSearchSongWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

module.exports = router