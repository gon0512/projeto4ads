const express = require('express')
const app = express()
const port = 3000
const routes = require('./src/routes/index')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

routes(app)

app.get('/', (req, res) => {
    res.json({Mensagem: 'Hello World!'})
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))