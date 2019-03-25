const Router = require('../../libs/Router')

const router = new Router()

router
    .get('/login', 'page/Manage@login')

module.exports = router