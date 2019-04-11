import { Request } from '@common/index'

export class PageApi extends Request {
    static getPageConfig(data: any, params?: any) {
        return this.request( '/api/page/get_page_config', { 
            method: 'get',
            data,
            ...params 
        })
    }
}