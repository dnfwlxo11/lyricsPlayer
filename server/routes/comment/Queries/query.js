module.exports = {
    selectCntComments(params) {
        const sid = params.sid;

        const sql = [];

        sql.push(`SELECT count(cid) as commentLen `);
        sql.push(`FROM tb_comments `);
        sql.push(`WHERE tb_songs_sid = ${sid}`);

        return sql.join('');
    },

    selectComments(params) {
        const pageSize = params.pageSize;
        const cid = params.cid;
        const sid = params.sid;

        const sql = [];

        sql.push(`SELECT (SELECT id FROM tb_users WHERE uid = tb_users_uid) as userName, comment, create_time as time, cid, tb_users_uid as uid, is_edited `);
        sql.push(`FROM tb_comments `);
        sql.push(`WHERE tb_songs_sid = ${sid} `);
        sql.push(`AND cid > ${cid} `);
        sql.push(`LIMIT ${pageSize}`);

        return sql.join('');
    },

    insertComment(params) {
        const sid = params.sid;
        const userId = params.userId;
        const content = params.content;

        const sql = [];

        sql.push(`INSERT INTO `);
        sql.push(`tb_comments(tb_songs_sid, tb_users_uid, comment) `);
        sql.push(`VALUES(${sid}, ${userId}, "${content}")`);

        return sql.join('');
    },

    updateComment(params) {
        const cid = params.cid;
        const sid = params.sid;
        const userId = params.userId;
        const modifyComment = params.modifyComment;

        const sql = [];

        sql.push(`UPDATE tb_comments `);
        sql.push(`SET comment = "${modifyComment}", is_edited = 1 `);
        sql.push(`WHERE tb_songs_sid = ${sid} `);
        sql.push(`AND tb_users_uid = ${userId} `);
        sql.push(`AND cid = ${cid}`);

        return sql.join('');
    },

    deleteComment(params) {
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