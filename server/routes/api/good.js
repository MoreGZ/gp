const Router = require('../../libs/Router')
const checkAuthMiddleware = require('../../middlewares/checkAuth')
const router = new Router()

router
    .get('/list', 'api/Good@list')
    .post('/delete', 'api/Good@delete')
    .get('/query', 'api/Good@query')
    .post('/add', 'api/Good@add')
    .post('/update', 'api/Good@update')
    .get('/list_category', 'api/Good@listCategory')
    .post('/update_sub_good', 'api/Good@updateSubGood')

module.exports = (new Router()).group(router, [checkAuthMiddleware])