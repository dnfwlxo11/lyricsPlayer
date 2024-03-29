const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const history = require('connect-history-api-fallback');

const app = express();

require('dotenv').config();
global._modules = require(path.join(__dirname, 'modules'));
global._workDir = path.join(__dirname);

const indexRouter = require('./routes/index.js');
const errRouter = require('./routes/authErr.js');
const aiRouter = require('./routes/ai/ai.js');
const userRouter = require('./routes/user/user.js');
const musicRouter = require('./routes/music/music.js');
const musicianRouter = require('./routes/musician/musician.js');
const albumRouter = require('./routes/album/album.js');
const commentRouter = require('./routes/comment/comment.js');
const searchRouter = require('./routes/search/search.js');

app.set('view engine', 'jade');

app.use(history());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cover', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'music')));
app.use(cookieParser());

if (!fs.existsSync('tmpDir')) fs.mkdirSync('tmpDir');

// app.use('/', indexRouter);
app.use('/err', errRouter);
app.use('/ai', aiRouter);
app.use('/api/user', userRouter);
app.use('/api/music', musicRouter);
app.use('/api/musician', musicianRouter);
app.use('/api/album', albumRouter);
app.use('/api/comment', commentRouter);
app.use('/api/search', searchRouter);

module.exports = app;
