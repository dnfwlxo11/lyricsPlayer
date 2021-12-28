const User = require('../routes/user/models')

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;


}

module.exports = { auth }