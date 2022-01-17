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
    }
}