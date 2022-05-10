module.exports = app => {
    const controllers = require('../controllers/userController')

    app.route('/signin')
        .post(controllers.signin)

    app.route('/users')
        .get(controllers.users)
        .post(controllers.userCreate)

    app.route('/users/:userId')
        .get(controllers.show)
}