
const login = require("./api/login")
const signup = require("./api/signup")
const updateToken = require("./api/update-token")

const user = require("./api/user")
const room = require("./api/room")
// const message = require("./api/message")

module.exports = app => {
    app.use('/api/login', login)
    app.use('/api/signup', signup)
    app.use('/api/update-token', updateToken)

    app.use('/api/user', user)
    app.use('/api/room', room)
    // app.use('/api/message', message)
}