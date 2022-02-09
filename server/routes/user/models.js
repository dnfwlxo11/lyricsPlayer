const jwt = require('jsonwebtoken');

function verifyToken(token) {
    let verifyToken = jwt.verify(token, process.env.SECRET_TOKEN)

    return verifyToken;
}

function generateToken(obj) {
    let token = jwt.sign(obj, process.env.SECRET_TOKEN);

    return token;
}

module.exports = {
    generateToken,
    verifyToken,
}