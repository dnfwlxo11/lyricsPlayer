const jwt = require('jsonwebtoken');

function verifyToken(token) {
    let verifyToken = jwt.verify(token, process.env.SECRET_TOKEN)

    return verifyToken;
}

function generateToken(pass) {
    let token = jwt.sign(pass, process.env.SECRET_TOKEN);

    return token;
}

module.exports = {
    generateToken,
    verifyToken,
}