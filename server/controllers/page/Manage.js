const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    async login() {
        await this.ctx.render('login')
    }

    async manager() {
        await this.ctx.render('manager')
    }

    async editor() {
        await this.ctx.render('editor')
    }

    async act() {
        await this.ctx.render('act')
    }

    async register() {
        await this.ctx.render('register')
    }
}