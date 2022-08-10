const Database = require('./mariadb')
const Elastic = require('./elastic')
const { auth } = require('./auth')

module.exports = {
    Database: new Database,
    Elastic: new Elastic,
    Auth: auth
}