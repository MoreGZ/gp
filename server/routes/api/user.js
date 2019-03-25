const Router = require('../../libs/Router')

const router = new Router()

router
    .post('/login', 'api/User@login')
    .post('/logout', 'api/User@logout')
    .post('/register', 'api/User@register')

module.exports = router