module.exports = {
    selectAlbumMusics(params) {
        const aid = params;
        const sql = [];

        sql.push(`SELECT tbAlbums.album_name, tbSongs.song_name, tbSongs.thumbnail_path as songImg, tbSongs.sid `);
        sql.push(`FROM tb_songs as tbSongs `);
        sql.push(`LEFT JOIN tb_albums as tbAlbums ON tbSongs.tb_albums_aid = tbAlbums.aid `);
        sql.push(`LEFT JOIN tb_musicians as tbMusicians ON tbMusicians.mid = tbAlbums.tb_musicians_mid `);
        sql.push(`WHERE tbAlbums.aid = ${aid}`);

        return sql.join('')
    },

    selectAlbumInfo(params) {
        const aid = params;
        const sql = [];

        sql.push(`SELECT tbMusicians.musician_name, tbAlbums.thumbnail_path, tbAlbums.album_name `);
        sql.push(`FROM tb_albums as tbAlbums `);
        sql.push(`LEFT JOIN tb_musicians as tbMusicians ON tbMusicians.mid = tbAlbums.tb_musicians_mid `);
        sql.push(`WHERE tbAlbums.aid = ${aid}`);

        return sql.join('')
    }
}