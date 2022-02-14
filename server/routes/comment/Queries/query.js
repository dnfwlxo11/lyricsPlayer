module.exports = {
    selectCntComments(params) {
        const songName = params.songName;

        const sql = [];

        sql.push(`SELECT count(cid) as commentLen `);
        sql.push(`FROM tb_comments `);
        sql.push(`WHERE tb_songs_sid = (SELECT sid FROM tb_songs WHERE song_name = "${songName}")`);

        return sql.join('');
    },

    selectComments(params) {
        const songName = params.songName;
        const currPage = params.currPage;
        const pageSize = params.pageSize;

        const sql = [];

        sql.push(`SELECT (SELECT id FROM tb_users WHERE uid = tb_users_uid) as userName, comment, create_time as time, cid, tb_users_uid as uid, is_edited `);
        sql.push(`FROM tb_comments `);
        sql.push(`WHERE tb_songs_sid = (SELECT sid FROM tb_songs WHERE song_name = "${songName}") `);
        sql.push(`LIMIT ${currPage * pageSize}, ${pageSize}`)

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
    },

    updateComment(params) {
        const cid = params.cid;
        const userId = params.userId;
        const songName = params.songName;
        const modifyComment = params.modifyComment;

        const sql = [];

        sql.push(`UPDATE tb_comments `);
        sql.push(`SET comment = "${modifyComment}", is_edited = 1 `);
        sql.push(`WHERE tb_songs_sid = (SELECT sid FROM tb_songs WHERE song_name = "${songName}") `);
        sql.push(`AND tb_users_uid = ${userId} `);
        sql.push(`AND cid = ${cid}`);

        return sql.join('');
    },

    deleteComment(params) {
        console.log(params)

        const userId = params.userId;
        const songName = params.songName;
        const cid = params.cid;

        const sql = [];

        sql.push(`DELETE `);
        sql.push(`FROM tb_comments `);
        sql.push(`WHERE tb_songs_sid = (SELECT sid FROM tb_songs WHERE song_name = "${songName}") `);
        sql.push(`AND tb_users_uid = ${userId} `);
        sql.push(`AND cid = ${cid}`);

        return sql.join('');
    }
}