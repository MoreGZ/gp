const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    async login() {
        await this.ctx.render('app1.html')
    }
}