const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/songs', (req, res, next) => {
    res.send({ 'success': true });
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