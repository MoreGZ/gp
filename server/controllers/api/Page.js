const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    async list() {
        const data = this.request.query;
        
        const resData = await this.service.page.list({
            ...data,
            page_index: +data.page_index,
            page_size: +data.page_size,
        })

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async delete() {
        const data = this.request.body;
        
        const resData = await this.service.page.delete(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async add() {
        const data = this.request.body;
        
        const resData = await this.service.page.add(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async updateTitle() {
        const data = this.request.body;
        
        const resData = await this.service.page.updateTitle(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async save() {
        const data = this.request.body;
        
        const resData = await this.service.page.save(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async public() {
        const data = this.request.body;
        
        const resData = await this.service.page.public(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async offline() {
        const data = this.request.body;
        
        const resData = await this.service.page.offline(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async getPageConfig() {
        const query = this.request.query;
        const data = {
            page_id: +query.page_id
        }
        
        const resData = await this.service.page.getPageConfig(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async getPageEditConfig() {
        const query = this.request.query;
        const data = {
            page_id: +query.page_id
        }
        
        const resData = await this.service.page.getPageEditConfig(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }
}