const express = require('express');
const router = express.Router();
const fs = require('fs');
const Quries = require('./Queries/query');
const mariaDB = require('../../modules');
const path = require('path');
const DB = mariaDB.Database;
const { auth } = require('../../modules/auth');

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

        if (rows == undefined) return false
        return rows
    });

    selectSearchSongWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

router.post('/like', auth, (req, res, next) => {
    if (!req.success) res.send({ 'success': false });

    const selectLikeSongWork = DB.connect(async (conn) => {
        const sql = Quries.selectLikeSong(req.user.uid);
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows
    });

    selectLikeSongWork()
    .then((result) => {
        if (result.length) {
            const deleteLikeSongWork = DB.connect(async (conn) => {
                const sql = Quries.deleteLikeSong(req.user.uid);
                const result = await conn.query(sql);
        
                if (result == undefined) return false
                return result
            });
        
            deleteLikeSongWork()
            .then((result) => {
                if (!result) res.send({ 'success': false });
                else res.send({ 'success': true, result });
            });
        } else {
            const insertLikeSongWork = DB.connect(async (conn) => {
                const sql = Quries.insertLikeSong({
                    'songName': req.body.songName,
                    'userId': req.user.uid,
                });
                const result = await conn.query(sql);
        
                if (result == undefined) return false
                return result
            });
        
            insertLikeSongWork()
            .then((result) => {
                if (!result) res.send({ 'success': false });
                else res.send({ 'success': true, result });
            });
        }
    });
})

router.post('/likeCnt', (req, res, next) => {
    const selectLikeCountWork = DB.connect(async (conn) => {
        const sql = Quries.selectLikeCount(req.body);
        const rows = await conn.query(sql);

        if (rows == undefined) return false
        return rows
    });

    selectLikeCountWork()
    .then((result) => {
        if (!result) res.send({ 'success': false });
        else res.send({ 'success': true, result });
    });
})

module.exports = router