const User = require('../routes/user/models');
const mariaDB = require('./mariadb');
const DB = new mariaDB();

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;
    if (token == undefined) {
        req.success = false ;
    };

    let verifyToken = User.verifyToken(token);

    const verifyUserWork = DB.connect(async (conn) => {
        const sql = `SELECT uid, password FROM tb_users WHERE id = "${'qwe'}"`;
        const rows = await conn.query(sql);

        console.log(rows, 'rows');

        if (!rows.length) return false;

        if (rows[0].password == verifyToken) return rows[0];
        else return false;
    });

    verifyUserWork()
    .then((result) => {
        console.log(result, 'query result');
        console.log(!result)
        if (!result) {
            res.send({ success: false });
        } else { 
            req.success = true;
            req.user = result
        };
    });

    next();
}

module.exports = { auth }