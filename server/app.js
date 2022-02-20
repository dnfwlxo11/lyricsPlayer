const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const dummyData = require('./dummy.js')

const app = express();

require('dotenv').config();
global._modules = require(path.join(__dirname, 'modules'));
global._workDir = path.join(__dirname);

const indexRouter = require('./routes/index.js');
const errRouter = require('./routes/authErr.js');
const userRouter = require('./routes/user/user.js');
const musicRouter = require('./routes/music/music.js');
const musicianRouter = require('./routes/musician/musician.js');
const albumRouter = require('./routes/album/album.js');
const commentRouter = require('./routes/comment/comment.js');
const searchRouter = require('./routes/search/search.js');

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cover', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'music')));
app.use(cookieParser());

async function init() {
    let body = {
        "settings": {
            "analysis": {
                "filter": {
                    "shingle_filter": {
                        "type": "shingle",
                        "min_shingle_size": 3,
                        "max_shingle_size": 2,
                        "output_unigrams": true
                    }
                }
            }
        },
        "mappings": {
            "properties": {
                "songname": {
                    "type": "text",
                    "analyzer": "english"
                },
                "lyrics": {
                    "type": "text",
                    "analyzer": "english"
                },
                "author": {
                    "type": "text",
                    "analyzer": "english"
                },
                "album": {
                    "type": "text",
                    "analyzer": "english"
                }
            }
        }
    };

    await global._modules.Elastic.createIndex('song', JSON.stringify(body));


    // for await (let item of dummyData) {
    //     let inputData = {
    //         index: 'song',
    //         body: item
    //     };

    //     await global._modules.Elastic.putSongData(inputData);
    // }
}

init();

if (!fs.existsSync('tmpDir')) fs.mkdirSync('tmpDir');

app.use('/', indexRouter);
app.use('/err', errRouter);
app.use('/api/user', userRouter);
app.use('/api/music', musicRouter);
app.use('/api/musician', musicianRouter);
app.use('/api/album', albumRouter);
app.use('/api/comment', commentRouter);
app.use('/api/search', searchRouter);

module.exports = app;
