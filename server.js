require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./src/routes/index')
const sequelize = require('./db')

try {
    sequelize.authenticate()
    console.log('Connection has been established successfully!')
} catch (error) {
    console.error('Unable to connect to the database', error)
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))

routes(app)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))