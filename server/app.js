const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

require('dotenv').config();
global._modules = require(path.join(__dirname, 'modules'));
global._workDir = path.join(__dirname);

const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user/user.js');
const musicRouter = require('./routes/music/music.js');
const musicianRouter = require('./routes/musician/musician.js');
const albumRouter = require('./routes/album/album.js');

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/api/play/*', express.static(path.join(__dirname, 'music')));

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/music', musicRouter);
app.use('/api/musician', musicianRouter);
app.use('/api/album', albumRouter);

module.exports = app;
