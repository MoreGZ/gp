const Router = require('../../libs/Router')

const router = new Router()

router
    .get('/list', 'api/Activity@list')
    .post('/delete', 'api/Activity@delete')
    .get('/query', 'api/Activity@query')
    .post('/add', 'api/Activity@add')
    .post('/update', 'api/Activity@update')
    .post('/add_good_to_activity', 'api/Activity@addGoodToActivity')
    .post('/remove_good_from_activity', 'api/Activity@removeGoodFromActivity')

module.exports = router