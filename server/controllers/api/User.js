const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    async login() {
        const data = this.request.body;
        
        const resData = await this.service.user.login(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async logout() {
        const data = this.request.body;
        
        const resData = await this.service.user.logout(data)

        this.send(resData)
    }

    async register() {
        const data = this.request.body;
        
        const resData = await this.service.user.register(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async getUserInfo() {
        
    }
}