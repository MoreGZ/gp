import { Request } from '@common/index'

export class PageApi extends Request {
    static getPageEditConfig(data: any, params?: any) {
        return this.$request( '/api/page/get_page_edit_config', { 
            method: 'get',
            data,
            ...params 
        })
    }

    static save(data: any, params?: any) {
        return this.$request( '/api/page/save', { 
            method: 'post',
            data,
            ...params 
        })
    }
    
    static public(data: any, params?: any) {
        return this.$request( '/api/page/public', { 
            method: 'post',
            data,
            ...params 
        })
    }

    static offline(data: any, params?: any) {
        return this.$request( '/api/page/offline', { 
            method: 'post',
            data,
            ...params 
        })
    }

    static getPageConfig(data: any, params?: any) {
        return this.$request( '/api/page/get_page_config', { 
            method: 'get',
            data,
            ...params 
        })
    }
}

export class VoucherApi extends Request {
    static list(data: any, params?: any) {
        return this.$request( '/api/voucher/list', { 
            method: 'get',
            data,
            ...params 
        })
    }
}

export class GoodApi extends Request {
    static list(data: any, params?: any) {
        return this.$request( '/api/good/list', { 
            method: 'get',
            data,
            ...params 
        })
    }
}