module.exports = {
    selectUser(params) {
        const id = params;
        const sql = [];

        sql.push(`SELECT uid `);
        sql.push(`FROM tb_users `);
        sql.push(`WHERE id="${id}"`);

        return sql.join('');
    },

    insertUser(params) {
        const id = params.id;
        const password = params.password;
        const sql = [];

        sql.push(`INSERT INTO `);
        sql.push(`tb_users(id, password) `);
        sql.push(`VALUES("${id}", "${password}")`);

        return sql.join('');
    }
}