const Router = require('../../libs/Router')

const router = new Router()

router
    .get('/login(.*)', 'page/Manage@login')
    .get('/register(.*)', 'page/Manage@register')
    .get('/manager(.*)', 'page/Manage@manager')
    .get('/editor(.*)', 'page/Manage@editor')
    .get('/act(.*)', 'page/Manage@act')

module.exports = router