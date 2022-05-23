const auth = require('../middlewares/auth')

module.exports = app => {
    const controllers = require('../controllers/userController')

    app.route('/signin')
        .post(controllers.signin)

    app.route('/users')
        .get(auth, controllers.users)
        .post(controllers.userCreate)

    app.route('/users/:userId')
        .get(controllers.show)
}