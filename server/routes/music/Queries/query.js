module.exports = {
    selectMusic(params) {
        const songName = params.title;
        const albumName = params.album;
        const musicianName = params.artist;
        const userId = params.userId;

        const sql = [];

        sql.push(`SELECT count(*) as cnt `);
        sql.push(`FROM tb_songs as tbSongs `);
        sql.push(`LEFT JOIN tb_albums as tbAlbums ON tbAlbums.aid = tbSongs.tb_albums_aid `);
        sql.push(`LEFT JOIN tb_musicians as tbMusicians ON tbMusicians.mid = tbAlbums.tb_musicians_mid `);
        sql.push(`WHERE tbSongs.song_name = "${songName}" `);
        sql.push(`AND tbAlbums.album_name = "${albumName}" `);
        sql.push(`AND tbMusicians.musician_name = "${musicianName}" `);
        sql.push(`AND tbSongs.registrant_uid = "${userId}"`);

        return sql.join('');
    },

    selectAlbum(params) {
        const albumName = params.album;
        const musicianName = params.artist;
        const userId = params.userId;

        const sql = [];

        sql.push(`SELECT count(*) as cnt `);
        sql.push(`FROM tb_albums as tbAlbums `);
        sql.push(`LEFT JOIN tb_musicians as tbMusicians ON tbMusicians.mid = tbAlbums.tb_musicians_mid `);
        sql.push(`WHERE tbAlbums.album_name = "${albumName}" `);
        sql.push(`AND tbMusicians.musician_name = "${musicianName}" `);
        sql.push(`AND tbAlbums.registrant_uid = "${userId}"`);

        return sql.join('');
    },

    selectMusicRanking() {
        const rankLimit = 12;
        const sql = [];

        sql.push(`SELECT tbSongs.sid, tbSongs.song_name, tbMusicians.musician_name, tbSongs.thumbnail_path `);
        sql.push(`FROM tb_songs as tbSongs `);
        sql.push(`LEFT JOIN tb_albums as tbAlbums ON tbAlbums.aid = tbSongs.tb_albums_aid `);
        sql.push(`LEFT JOIN tb_musicians as tbMusicians ON tbMusicians.mid = tbAlbums.tb_musicians_mid `);
        sql.push(`LEFT JOIN tb_song_likes as tbSongLikes ON tbSongLikes.tb_songs_sid = tbSongs.sid `);
        sql.push(`GROUP BY tbSongs.sid `);
        sql.push(`ORDER BY COUNT(tbSongLikes.tb_songs_sid) DESC `);
        sql.push(`LIMIT ${rankLimit}`);

        return sql.join('');
    },

    selectMusicInfo(params) {
        const sid = params
        const sql = [];

        sql.push(`SELECT playtime, thumbnail_path, album `);
        sql.push(`FROM tb_songs `);
        sql.push(`WHERE sid = ${sid}`);

        return sql.join('');
    },

    selectSearchSong(params) {
        const keyword = params;
        const sql = [];

        sql.push(`SELECT tbMusicians.musician_name as musician, tbAlbums.album_name as album, tbSongs.song_name as song, tbSongs.playtime as duration, tbSongs.thumbnail_path as songImg, tbAlbums.thumbnail_path as albumImg, count(tbAlbums.aid) as trackLen `);
        sql.push(`FROM tb_songs as tbSongs `);
        sql.push(`INNER JOIN tb_albums as tbAlbums ON tbSongs.tb_albums_aid = tbAlbums.aid `);
        sql.push(`INNER JOIN tb_musicians as tbMusicians ON tbAlbums.tb_musicians_mid = tbMusicians.mid `);
        sql.push(`WHERE tbSongs.song_name LIKE "%${keyword}%" OR tbAlbums.album_name LIKE "%${keyword}%" OR tbMusicians.musician_name LIKE "%${keyword}%" `);
        sql.push(`GROUP BY tbAlbums.aid`);

        return sql.join('');
    },

    deleteLikeSong(params) {
        const sql = [];

        sql.push(`DELETE `);
        sql.push(`FROM tb_song_likes `);
        sql.push(`WHERE tb_users_uid = ${params}`);

        return sql.join('');
    },

    selectLikeSong(params) {
        const songName = params.songName;
        const userId = params.userId;
        const sid = params.sid;
        const sql = [];

        sql.push(`SELECT tb_users_uid `);
        sql.push(`FROM tb_song_likes `);
        sql.push(`WHERE tb_users_uid = ${userId} `);
        sql.push(`AND tb_songs_sid = ${sid}`);

        return sql.join('');
    },

    selectLikeCount(params) {
        const sid = params.sid
        const songName = params.songName;
        const currPage = params.currPage;
        const pageSize = params.pageSize;
        const sql = [];

        sql.push(`SELECT tbUsers.id `);
        sql.push(`FROM tb_song_likes as tbSongLikes `);
        sql.push(`LEFT JOIN tb_users as tbUsers ON tbSongLikes.tb_users_uid = tbUsers.uid `)
        sql.push(`WHERE tbSongLikes.tb_songs_sid = ${sid} `);
        sql.push(`LIMIT ${currPage * pageSize}, ${pageSize}`);

        return sql.join('');
    },

    insertLikeSong(params) {
        const songName = params.songName;
        const userId = params.userId;
        const sql = [];

        sql.push(`INSERT INTO `);
        sql.push(`tb_song_likes(tb_songs_sid, tb_users_uid) `);
        sql.push(`VALUES((SELECT sid FROM tb_songs WHERE song_name = "${songName}"), ${userId})`);

        return sql.join('');
    },

    insertMusician(params) {
        const musicianName = params.artist;
        const thumbnailPath = params.path ? params.path : '/cover/musician.png';
        const userId = params.userId;
        const sql = [];

        console.log(thumbnailPath, 'insertMusician')

        sql.push(`INSERT INTO `);
        sql.push(`tb_musicians(musician_name, thumbnail_path, registrant_uid) `);
        sql.push(`VALUES ("${musicianName}", "${thumbnailPath}", ${userId})`);

        return sql.join('');
    },

    insertAlbum(params) {
        const musicianName = params.artist;
        const albumName = params.album;
        const thumbnailPath = params.path ? params.path : '/cover/musician.png';
        const userId = params.userId;
        const sql = [];

        console.log(thumbnailPath, 'insertAlbum')

        sql.push(`INSERT INTO `);
        sql.push(`tb_albums(album_name, tb_musicians_mid, thumbnail_path, registrant_uid) `);
        sql.push(`VALUES ("${albumName}", (SELECT mid FROM tb_musicians WHERE musician_name="${musicianName}" AND registrant_uid = ${userId}), "${thumbnailPath}", ${userId})`);

        return sql.join('');
    },

    insertSong(params) {
        const songName = params.title;
        const duration = params.duration;
        const thumbnailPath = params.path ? params.path : '/cover/musician.png';
        const albumName = params.album;
        const lyrics = params.lyrics;
        const userId = params.userId;
        const sql = [];

        sql.push(`INSERT INTO `)
        sql.push(`tb_songs(song_name, playtime, thumbnail_path, tb_albums_aid, album, lyrics, registrant_uid) `)
        sql.push(`VALUES ("${songName}", "${duration}", "${thumbnailPath}", (SELECT aid FROM tb_albums WHERE album_name = "${albumName}" AND registrant_uid = ${userId}), "${albumName}", "${lyrics}", ${userId})`)

        return sql.join('');
    }
}