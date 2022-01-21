module.exports = {
    selectMusicianInfo(params) {
        let musicianNmae = params
        let sql = []

        sql.join(`select musician_name, tbAlbums.thumbnail_path as albumImg, tbSongs.thumbnail_path as songImg, tbSongs.album, tbSongs.song_name, tbSongs.playtime, count(distinct tbAlbums.aid) as albumLen, count(tbSongs.sid) as SongLen `)
        sql.join(`from tb_musicians as tbMusicians `)
        sql.join(`inner join tb_albums as tbAlbums on tbAlbums.tb_musicians_mid = tbMusicians.mid `)
        sql.join(`inner join tb_songs as tbSongs on tbSongs.tb_albums_aid = tbAlbums.aid `)
        sql.join(`where tbMusicians.musician_name LIKE '${musicianNmae}' `)
        sql.join(`group by tbAlbums.aid`)

        return sql.join('')
    },
}