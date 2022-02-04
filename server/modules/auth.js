const User = require('../routes/user/models');
const mariaDB = require('./mariadb');
const DB = new mariaDB();

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    let verifyToken = User.verifyToken(token);

    console.log(DB)

    const verifyUserWork = DB.connect(async (conn) => {
        const sql = `SELECT password FROM tb_users WHERE id = "${'qwe'}"`;
        const rows = await conn.query(sql);

        if (rows[0] == undefined) return false;

        console.log()
        if (rows[0] == verifyToken) return true;
        else return false;
    });

    verifyUserWork()
    .then((result) => {
        if (!result) req.success = false;
        else req.success = true;
    });

    next();
}

module.exports = { auth }