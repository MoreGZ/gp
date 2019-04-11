const BaseController = require('../../libs/BaseController')

module.exports = class extends BaseController {
    async list() {
        const data = this.request.query;
        
        const resData = await this.service.activity.list({
            ...data,
            page_index: +data.page_index,
            page_size: +data.page_size,
        })

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async delete() {
        const data = this.request.body;
        
        const resData = await this.service.activity.delete(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async query() {
        const data = this.request.query;
        
        const resData = await this.service.activity.query(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async add() {
        const data = this.request.body;
        
        const resData = await this.service.activity.add(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async update() {
        const data = this.request.body;
        
        const resData = await this.service.activity.update(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async addGoodToActivity() {
        const data = this.request.body;
        
        const resData = await this.service.activity.addGoodToActivity(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }

    async removeGoodFromActivity() {
        const data = this.request.body;
        
        const resData = await this.service.activity.removeGoodFromActivity(data)

        this.send(resData.data, resData.success, resData.message, resData.code)
    }
}