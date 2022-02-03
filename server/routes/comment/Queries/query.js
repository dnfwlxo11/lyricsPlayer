module.exports = {
    selectComments(params) {
        const songName = params;

        const sql = [];

        sql.push(`SELECT comment `);
        sql.push(`FROM tb_comments `);
        sql.push(`WHERE tb_songs_sid = (SELECT sid FROM tb_songs WHERE song_name = "${songName}")`);

        return sql.join('');
    },

    insertComment(params) {
        const songName = params.songName;
        const userId = params.userId;
        const content = params.content;

        const sql = [];

        sql.push(`INSERT INTO `);
        sql.push(`tb_comments(tb_songs_sid, tb_users_uid, comment) `);
        sql.push(`VALUES((SELECT sid FROM tb_songs WHERE song_name = "${songName}"), ${userId}, "${content}")`);

        return sql.join('');
    }
}