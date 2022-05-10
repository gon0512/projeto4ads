const jwt = require('jsonwebtoken')
const md5 = require('crypto-md5')
const User = require('../models/users')

exports.userCreate = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const newUser = await User.create({
            name, 
            email, 
            password: md5(password)
        })
    
        res.json(newUser)
        res.status(200)
    
    } catch (error) {
        res.json({message: "Deu ruim!"})
        console.log(error)
    }
}

exports.signin = async (req, res) => {
    const { user } = req.body

    console.log(user)
    
    const user_bd = await User.findOne({where: {email: user.login}})

    if(user.login === user_bd.email) {
        if(md5(user.password) === user_bd.password){
            console.log("Passou aqui!")
            const jwtPayload = {
                name: user_bd.name,
                email: user_bd.email,
                role: 'pleno-developer',
                idNumber: user_bd.id
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