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
    let musicianName = decodeURI(req.params.musician);
    let musicName = decodeURI(req.params.musicName);
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
        const sql = Quries.selectSearchSong(decoedURI(req.params.keyword));
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

router.post('/upload', auth, upload.single('song'), async (req, res, next) => {
    try {
        let fileMeta = JSON.parse(req.body.metadata);
        let thumbnail = req.body.thumbnail != 'null' ? req.body.thumbnail.replace('data:image/jpeg;base64,', "") : null;

        console.log(thumbnail == null, thumbnail == 'null', thumbnail == true)
        console.log(fileMeta)
        let params = {
            'path': thumbnail ? `/cover/${fileMeta.title}.jpg` : `/cover/musician.png`,
            // 'title': fileMeta.title,
            // 'artist': fileMeta.artist,
            // 'duration': fileMeta.duration,
            // 'genre': fileMeta.genre,
            // 'album': fileMeta.album,
            // 'lyrics': fileMeta.lyrics,
            'title': fileMeta.title.replace(/'/g, "\'"),
            'artist': fileMeta.artist.replace(/'/g, "\'"),
            'duration': fileMeta.duration,
            'genre': fileMeta.genre.replace(/'/g, "\'"),
            'album': fileMeta.album.replace(/'/g, "\'"),
            'lyrics': fileMeta.lyrics.replace(/'/g, "\'"),
            'userId': req.user.uid,
        };

        console.log(params.path)

        if (!fs.existsSync(path.join('music', fileMeta.artist))) fs.mkdirSync(path.join('music', fileMeta.artist));

        // 이미지 있을 시 썸네일 비동기 저장
        const thumbDstPath = path.join('images', `${fileMeta.title}.jpg`)
        if (thumbnail) {
            console.log(thumbnail , '썸네일 저장한다.');
            fs.writeFileSync(thumbDstPath, thumbnail, 'base64');
        } 

        // 노래 비동기 이동
        const songDstPath = path.join('music', fileMeta.artist, `${fileMeta.title}.mp3`);
        fs.rename(req.file.path, songDstPath, (err) => {
            console.log(err)
        });

        // mariaDB에 등록
        const uploadMusicWork = DB.transaction(async (conn) => {
            let sql = `SELECT count(musician_name) as cnt FROM tb_musicians WHERE musician_name = "${fileMeta.artist}" AND registrant_uid = ${req.user.uid}`;
            let rows = await conn.query(sql);
            
            if (!rows[0]['cnt']) {
                sql = Quries.insertMusician(params);
                await conn.query(sql);
            }

            sql = `SELECT count(album_name) as cnt FROM tb_albums WHERE album_name = "${fileMeta.album}" AND registrant_uid = ${req.user.uid}`;
            rows = await conn.query(sql);

            if (!rows[0]['cnt']) {
                sql = Quries.insertAlbum(params);
                await conn.query(sql);
            }

            sql = `SELECT count(song_name) as cnt FROM tb_songs WHERE song_name = "${fileMeta.title}" AND registrant_uid = ${req.user.uid}`;
            rows = await conn.query(sql);

            if (!rows[0]['cnt']) {
                sql = Quries.insertSong(params);
                await conn.query(sql);
            }
        });

        await uploadMusicWork();

        console.log({
            "albumImg": params.path,
            "musicianImg": params.path,
            "songImg": params.path,
            "musician": params.artist,
            "album": params.album,
            "songname": params.title,
            "lyrics": params.lyrics,
        })

        // elastic 엔진에 등록
        let inputData = {
            index: 'song',
            body: {
                "albumImg": params.path,
                "musicianImg": params.path,
                "songImg": params.path,
                "musician": params.artist,
                "album": params.album,
                "songname": params.title,
                "lyrics": params.lyrics,
            }
        };

        await global._modules.Elastic.putSongData(inputData);

        res.send({ 'success': true });
    } catch(err) {
        console.log(err)
        res.send({ 'success': false, err });
    }
    
})

module.exports = router;