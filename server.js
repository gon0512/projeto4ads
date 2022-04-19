const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const md5 = require('crypto-md5')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json({Mensagem: 'Hello World!'})
})

app.post('/signin', (req, res) => {
    const { user } = req.body
    const fakeUser = {
        login: 'l.figueiroa',
        pass: '12345@'
    }

    if(user.login === fakeUser.login) {
        if(md5(user.pass) === md5(fakeUser.pass)){
            res.json({message: 'Usuário logado com sucesso!'})
        }
        else {
            res.status(401).json({message: 'Login ou senha incorreto!'})
        }
    }
    else {
        res.status(401).json({message: 'Login ou senha incorreto!'})
    }
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))