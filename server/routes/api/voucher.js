const Router = require('../../libs/Router')
const checkAuthMiddleware = require('../../middlewares/checkAuth')
const router = new Router()

router
    .get('/list', 'api/Voucher@list')
    .post('/delete', 'api/Voucher@delete')
    .post('/add', 'api/Voucher@add')
    .post('/update', 'api/Voucher@update')

module.exports = (new Router()).group(router, [checkAuthMiddleware])