require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./src/routes/index')

const { Sequelize, DataTypes } = require('sequelize')

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

try {
    sequelize.authenticate()
    console.log('Connection has been established successfully!')
} catch (error) {
    console.error('Unable to connect to the database', error)
}

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

//User.sync({force:true})

const userCreate = async () => {
    try {
        const newUser = await User.create({
            name: 'layonfigueiroa',
            email: 'layon@mail.com',
            password: 'layon12345'
        })
    
        console.log(newUser)
    } catch (error) {
        console.error('Deu merda!', error)
    }
}

userCreate()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

routes(app)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))