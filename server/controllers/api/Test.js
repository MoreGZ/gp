const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    getApi() {
        let response = {
            success: true,
            message: "success",
            data: {user: 'georgemo'},
            code: 0,
        }
        console.log('get')

        return this.ctx.body = response
    }

    postApi() {
        return this.ctx.body = JSON.stringify(this.request.body);
    }
}