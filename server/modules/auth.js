const User = require('../routes/user/models');
const mariaDB = require('./mariadb');
const DB = new mariaDB();

let auth = async (req, res, next) => {
    let token = req.cookies.x_auth;

    if (token == undefined) {
        req.success = false;
    } else {
        let verifyToken = User.verifyToken(token);
        console.log(verifyToken, 'verifyToken')

        const verifyUserWork = DB.connect(async (conn) => {
            const sql = `SELECT uid FROM tb_users WHERE id = "${verifyToken.id}"`;
            const rows = await conn.query(sql);

            if (!rows.length) return false;

            if (rows[0].uid == verifyToken.uid) return rows[0];
            else return false;
        });

        let response = await verifyUserWork()
        
        if (!response) {
            res.success = false;
        } else { 
            req.success = true;
            req.user = response;
        };
    }

    next();
}

module.exports = { auth }