const Router = require('../../libs/Router')

const router = new Router()

router
    .get('/list', 'api/Voucher@list')
    .post('/delete', 'api/Voucher@delete')
    .post('/add', 'api/Voucher@add')
    .post('/update', 'api/Voucher@update')

module.exports = router