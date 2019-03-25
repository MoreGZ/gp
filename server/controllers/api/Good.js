const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    async list() {
        const data = this.request.query;
        
        const resData = await this.service.good.list({
            ...data,
            page_index: +data.page_index,
            page_size: +data.page_size,
            activity_id: +data.activity_id,
            category_id: +data.category_id,
            good_id: +data.good_id,
        })

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async delete() {
        const data = this.request.body;
        
        const resData = await this.service.good.delete(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async query() {
        const data = this.request.query;
        
        const resData = await this.service.good.query(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async add() {
        const data = this.request.body;
        
        const resData = await this.service.good.add(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async update() {
        const data = this.request.body;
        
        const resData = await this.service.good.update(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async listCategory() {
        const data = this.request.query;
        
        const resData = await this.service.good.listCategory(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async updateSubGood() {
        const data = this.request.body;
        
        const resData = await this.service.good.updateSubGood(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }
}