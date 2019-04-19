const BaseController = require('../../libs/BaseController')
var qs = require("qs")
const axios = require('axios')

module.exports = class extends BaseController {
    async index() {
        let options = {
            baseURL: 'http://localhost:7001',
            url: this.ctx.url,
            method: this.request.method,
            timeout: 30000,
            headers: this.request.headers,
            data: this.request.body 
        }

        const res = await axios(options).then((res) => {
            return res.data
        }).catch((err) => {
            return err
        })

        this.ctx.body = res
    }
}