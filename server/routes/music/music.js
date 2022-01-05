const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/songs', (req, res, next) => {
    res.send({ 'success': true });
})

router.get('/play/:musicName', (req, res, next) => {
    let musicName = req.params.musicName;
    let musicPath = path.join(_workDir, 'music/RYYZN', musicName);
    let musicFile = fs.statSync(musicPath);

    res.writeHead(200, {
        "Content-Type": "audio/mp3",
        "Accept-Ranges": "bytes",
        "Content-Length": musicFile.size
    })

    let audioStream = fs.createReadStream(path.join(_workDir, 'music/RYYZN', musicName));
    audioStream.pipe(res);
})

module.exports = router