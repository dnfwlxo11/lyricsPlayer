const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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

    console.log(musicPath)

    let musicFile = fs.statSync(musicPath);

    res.writeHead(200, {
        "Content-Type": "audio/mp3",
        "Accept-Ranges": "bytes",
        "Content-Length": musicFile.size
    })

    let audioStream = fs.createReadStream(musicPath);
    audioStream.pipe(res);
})

module.exports = router