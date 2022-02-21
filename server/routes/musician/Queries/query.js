module.exports = {
    selectMusicianAlbums(params) {
        let mid = params
        let sql = []

        sql.push(`select tbMusicians.musician_name, tbMusicians.thumbnail_path, tbAlbums.aid, tbAlbums.album_name, tbAlbums.thumbnail_path as albumImg, count(tbAlbums.album_name) `)
        sql.push(`from tb_musicians as tbMusicians `)
        sql.push(`inner join tb_albums as tbAlbums on tbAlbums.tb_musicians_mid = tbMusicians.mid `)
        sql.push(`where tbMusicians.mid = ${mid}`)

        return sql.join('')
    },

    selectMusicianSongs(params) {
        let mid = params
        let sql = []

        sql.push(`select musician_name, tbSongs.sid, tbSongs.thumbnail_path as songImg, tbSongs.album, tbSongs.song_name, tbSongs.playtime, (SELECT count(tb_users_uid) FROM tb_song_likes WHERE tb_songs_sid = tbSongs.sid) as likes `)
        sql.push(`from tb_musicians as tbMusicians `)
        sql.push(`inner join tb_albums as tbAlbums on tbAlbums.tb_musicians_mid = tbMusicians.mid `)
        sql.push(`inner join tb_songs as tbSongs on tbSongs.tb_albums_aid = tbAlbums.aid `)
        sql.push(`where tbMusicians.mid = ${mid}`)
        
        return sql.join('')
    },
}