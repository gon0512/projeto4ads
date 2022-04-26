const jwt = require('jsonwebtoken')
const md5 = require('crypto-md5')

exports.signin = (req, res) => {
    const { user } = req.body
    const fakeUser = {
        login: 'l.figueiroa',
        pass: '12345@'
    }

    if(user.login === fakeUser.login) {
        if(md5(user.pass) === md5(fakeUser.pass)){
            const jwtPayload = {
                login: 'l.figueiroa',
                role: 'pleno-developer',
                idNumber: '12345ABC'
            }
            const token = jwt.sign(jwtPayload, process.env.JWT_KEY)
            res.json({message: 'Usuário logado com sucesso!', token})
        }
        else {
            res.status(401).json({message: 'Login ou senha incorreto!'})
        }
    }
    else {
        res.status(401).json({message: 'Login ou senha incorreto!'})
    }
}

exports.users = (req, res) => {
    const userArray = [
        {
            id: 001,
            name: 'Layon Figueiroa',
            email: 'layon@mail.com'
        },
        {
            id: 002,
            name: 'Alexsandro Barros',
            email: 'alex@mail.com'
        }
    ]

    res.json(userArray)
}

exports.show = (req, res) => {
    const { userId } = req.params
    const token = req.headers.authorization

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const fakeUsuario =  {
            id: 001,
            name: 'Layon Figueiroa',
            email: 'layon@mail.com'
        }
        
        res.json({message: 'Ok, deu certo!', fakeUsuario})
    }
    catch(err) {
        console.log(err)
        res.status(401).json({message: 'Usuário não autorizado!'})
    }
}