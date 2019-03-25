const Router = require('../../libs/Router')

const router = new Router()

router
    .get('/list', 'api/Activity@list')
    .post('/delete', 'api/Activity@delete')
    .get('/query', 'api/Activity@query')
    .post('/add', 'api/Activity@add')
    .post('/update', 'api/Activity@update')

module.exports = router