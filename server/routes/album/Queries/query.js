module.exports = {
    selectAlbumMusics(params) {
        const albumName = params
        const sql = [];

        sql.push(`SELECT tbAlbums.album_name, tbSongs.song_name, tbSongs.thumbnail_path as songImg `)
        sql.push(`FROM tb_songs as tbSongs, tb_albums as tbAlbums `)
        sql.push(`WHERE tbSongs.tb_albums_aid = tbAlbums.aid `)
        sql.push(`AND tbAlbums.album_name = '${albumName}';`)

        return sql.join('')
    },

    selectAlbumInfo(params) {
        const albumName = params
        const sql = [];

        sql.push(`SELECT tbMusicians.musician_name, tbAlbums.thumbnail_path, tbAlbums.album_name `)
        sql.push(`FROM tb_albums as tbAlbums, tb_musicians as tbMusicians `)
        sql.push(`WHERE tbAlbums.tb_musicians_mid = tbMusicians.mid `)
        sql.push(`AND album_name = '${albumName}'`)

        return sql.join('')
    }
}