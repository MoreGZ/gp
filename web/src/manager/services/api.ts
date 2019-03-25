import { Request } from '@common/index'

export class GoodApi extends Request {
    static list(data: any, params?: any) {
        return this.request( '/api/good/list', { 
            method: 'get',
            data,
            ...params 
        })
    }

    static query(data: any, params?: any) {
        return this.request( '/api/good/query', { 
            method: 'get',
            data,
            ...params 
        })
    } 

    static delete(data: any, params?: any) {
        return this.request( '/api/good/delete', { 
            method: 'post',
            data,
            ...params 
        })
    }

    static updateBaseInfo(data: any, params?: any) {
        return this.request( '/api/good/update', { 
            method: 'post',
            data,
            ...params 
        })
    }

    static add(data: any, params?: any) {
        return this.request( '/api/good/add', { 
            method: 'post',
            data,
            ...params 
        })
    }

    static listCategory(data: any, params?: any) {
        return this.request( '/api/good/list_category', { 
            method: 'get',
            data,
            ...params 
        })
    }

    static updateSubGood(data: any, params?: any) {
        return this.request( '/api/good/update_sub_good', { 
            method: 'post',
            data,
            ...params 
        })
    }
}

export class ActivityApi extends Request {
    static list(data: any, params?: any) {
        return this.request( '/api/activity/list', { 
            method: 'get',
            data,
            ...params 
        })
    }

    static query(data: any, params?: any) {
        return this.request( '/api/activity/query', { 
            method: 'get',
            data,
            ...params 
        })
    } 

    static delete(data: any, params?: any) {
        return this.request( '/api/activity/delete', { 
            method: 'post',
            data,
            ...params 
        })
    }

    static updateBaseInfo(data: any, params?: any) {
        return this.request( '/api/activity/update', { 
            method: 'post',
            data,
            ...params 
        })
    }

    static add(data: any, params?: any) {
        return this.request( '/api/activity/add', { 
            method: 'post',
            data,
            ...params 
        })
    }
}