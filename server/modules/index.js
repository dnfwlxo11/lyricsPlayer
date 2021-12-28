const Database = require('./mariadb')
const { auth } = require('./auth')

module.exports = {
    Database: new Database,
    Auth: auth
}