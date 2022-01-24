module.exports = {
    selectMusicianAlbum(params) {
        let musicianNmae = params
        let sql = []

        sql.push(`select musician_name, tbAlbums.album_name, tbAlbums.thumbnail_path as albumImg, count(tbAlbums.album_name) `)
        sql.push(`from tb_musicians as tbMusicians `)
        sql.push(`inner join tb_albums as tbAlbums on tbAlbums.tb_musicians_mid = tbMusicians.mid `)
        sql.push(`where tbMusicians.musician_name = '${musicianNmae}'`)
        
        return sql.join('')
    },
}