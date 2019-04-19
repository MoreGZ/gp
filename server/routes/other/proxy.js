const Router = require('../../libs/Router')

const router = new Router()

router
    .all('/sockjs-node(.*?)', 'other/proxy@index')
    .all('/__webpack_dev_server__(.*?)', 'other/proxy@index')
    .all('/upload/img', 'other/upload@img')
    

module.exports = router