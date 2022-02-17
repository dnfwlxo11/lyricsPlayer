const express = require('express');
const router = express.Router();
const fs = require('fs');
const Quries = require('./Queries/query');
const path = require('path');
const DB = global._modules.Database;
const { auth } = require('../../modules/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmpDir/');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

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
    let params = {
        songName: req.body.songName,
        userId: req.user.uid,
    };

    const selectLikeSongWork = DB.connect(async (conn) => {
        const sql = Quries.selectLikeSong(params);
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
                const sql = Quries.insertLikeSong(params);
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

router.post('/upload', auth, upload.single('song'), (req, res, next) => {
    let fileMeta = JSON.parse(req.body.metadata);
    let thumbnail = req.body.thumbnail.replace('data:image/jpeg;base64,', "");

    if (!fs.existsSync(path.join('music', fileMeta.artist))) fs.mkdirSync(path.join('music', fileMeta.artist));

    // 썸네일 비동기 저장
    if (req.body.thumbnail) fs.writeFileSync(path.join('images', fileMeta.title + '.jpg'), thumbnail, 'base64');

    // 노래 비동기 이동
    fs.rename(req.file.path, path.join('music', fileMeta.artist, req.file.originalname), (err) => {
        console.log(err)
    });

    res.send({ 'success': true });
})

module.exports = router;