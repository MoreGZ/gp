const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    async list() {
        const data = this.request.query;
        
        const resData = await this.service.voucher.list({
            ...data,
            page_index: +data.page_index,
            page_size: +data.page_size,
            activity_id: +data.activity_id,
        })

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async delete() {
        const data = this.request.body;
        
        const resData = await this.service.voucher.delete(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async add() {
        const data = this.request.body;
        
        const resData = await this.service.voucher.add(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async update() {
        const data = this.request.body;
        
        const resData = await this.service.voucher.update(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }
}