module.exports = {
    selectMusicRanking() {
        const rankLimit = 12;
        const sql = [];

        sql.push(`SELECT songs.song_name, musicians.musician_name, likes.cnt, songs.thumbnail_path `);
        sql.push(`FROM tb_song_likes as likes, tb_songs as songs, tb_albums as albums, tb_musicians as musicians `);
        sql.push(`WHERE likes.tb_songs_sid = songs.sid `);
        sql.push(`AND songs.tb_albums_aid = albums.aid `);
        sql.push(`AND musicians.mid = albums.tb_musicians_mid `);
        sql.push(`ORDER BY cnt `);
        sql.push(`LIMIT ${rankLimit}`);

        return sql.join('');
    },

    selectMusicInfo(params) {
        const songName = params
        const sql = [];

        sql.push(`SELECT playtime, thumbnail_path, album `)
        sql.push(`FROM tb_songs `)
        sql.push(`WHERE song_name = '${songName}'`)

        return sql.join('');
    },

    selectSearchSong(params) {
        const keyword = params;
        const sql = [];


        sql.push(`SELECT tbMusicians.musician_name as musician, tbAlbums.album_name as album, tbSongs.song_name as song, tbSongs.playtime as duration, tbSongs.thumbnail_path as songImg, tbAlbums.thumbnail_path as albumImg, count(tbAlbums.aid) as trackLen `)
        sql.push(`FROM tb_songs as tbSongs `)
        sql.push(`INNER JOIN tb_albums as tbAlbums ON tbSongs.tb_albums_aid = tbAlbums.aid `)
        sql.push(`INNER JOIN tb_musicians as tbMusicians ON tbAlbums.tb_musicians_mid = tbMusicians.mid `)
        sql.push(`WHERE tbSongs.song_name LIKE '%${keyword}%' OR tbAlbums.album_name LIKE '%${keyword}%' OR tbMusicians.musician_name LIKE '%${keyword}%' `)
        sql.push(`GROUP BY tbAlbums.aid`);

        return sql.join('');
    }
}