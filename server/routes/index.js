const Router = require('../libs/Router')
const apiRouter = require('./api')
const pageRouter = require('./page')

const router = new Router();

router
    .group(apiRouter)
    .group(pageRouter)

module.exports = router.getCoreRouter()