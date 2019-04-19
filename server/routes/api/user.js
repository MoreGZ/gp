const Router = require('../../libs/Router')
const checkAuthMiddleware = require('../../middlewares/checkAuth')

const routerWithNoCheck = new Router()
const routerWithCheckAuth = new Router()

routerWithNoCheck
    .post('/login', 'api/User@login')
    .post('/logout', 'api/User@logout')
    .post('/register', 'api/User@register')

routerWithCheckAuth
    .get('/getUserInfo', 'api/User@getUserInfo')


module.exports = {
    routerWithNoCheck: routerWithNoCheck,
    routerWithCheckAuth: (new Router()).group(routerWithCheckAuth, [checkAuthMiddleware])
}