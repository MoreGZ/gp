const userRouter = require('./user')
const goodRouter = require('./good')
const activityRouter = require('./activity')
const voucherRouter = require('./voucher')
const pageRouter = require('./page')
const Router = require('../../libs/Router')

const router = new Router()
router
    .group('/user', userRouter)
    .group('/good', goodRouter)
    .group('/activity', activityRouter)
    .group('/voucher', voucherRouter)
    .group('/page', pageRouter)

module.exports = (new Router).group('/api', router)