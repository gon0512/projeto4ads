require('dotenv').config()
const { Sequelize } = require('sequelize')

const db_database = process.env.DB_NAME
const db_username = process.env.DB_USER
const db_password = process.env.DB_PASS
const db_host = process.env.DB_HOST
const db_dialect = process.env.DB_DIALECT
const db_port = process.env.DB_PORT

const sequelize = new Sequelize(db_database, db_username, db_password, {
    host: db_host,
    port: db_port,
    dialect: db_dialect
})

module.exports = sequelize