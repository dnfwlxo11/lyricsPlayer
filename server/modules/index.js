const Database = require('./mariadb')
const Es = require('./elastic')
const { auth } = require('./auth')

module.exports = {
    Database: new Database,
    Es: new Es,
    Auth: auth
}