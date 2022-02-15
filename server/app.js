const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
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

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

console.log(dummyData)

// for await (const item of dummyData) {
    // global._modules.Elastic.putSongData({
    //     index: 'song',
    //     document: item
    // })
    // console.log(`${idx}번째 데이터 입력 완료`)
// }

// global._modules.Elastic.searchData({
//     index: 'kibana_sample_data_flights',
//     body: {
//         'query': {
//             'match': {
//                 '_id': 'VIpR_H4BG4siApVmFZYO'
//             }
//         }
//     }
// })

app.use('/', indexRouter);
app.use('/err', errRouter);
app.use('/api/user', userRouter);
app.use('/api/music', musicRouter);
app.use('/api/musician', musicianRouter);
app.use('/api/album', albumRouter);
app.use('/api/comment', commentRouter);

module.exports = app;
