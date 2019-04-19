const Router = require('../../libs/Router')
const checkAuthMiddleware = require('../../middlewares/checkAuth')
const router = new Router()

router
    .get('/list', 'api/Page@list')
    .post('/delete', 'api/Page@delete')
    .post('/add', 'api/Page@add')
    .post('/update_title', 'api/Page@updateTitle')
    .post('/save', 'api/Page@save')
    .post('/public', 'api/Page@public')
    .post('/offline', 'api/Page@offline')
    .get('/get_page_config', 'api/Page@getPageConfig')
    .get('/get_page_edit_config', 'api/Page@getPageEditConfig')

module.exports = (new Router()).group(router, [checkAuthMiddleware])