const userRouter = require('./user')
const goodRouter = require('./good')
const activityRouter = require('./activity')
const Router = require('../../libs/Router')

const router = new Router()
router
    .group('/user', userRouter)
    .group('/good', goodRouter)
    .group('/activity', activityRouter)

module.exports = (new Router).group('/api', router)