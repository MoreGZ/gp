import { Request } from '@common/index'

export class UserApi extends Request {
    static login(data: any, params?: any) {
        return this.request( '/api/user/login', { 
            method: 'post',
            data,
            ...params 
        })
    }

    static logout(data: any, params?: any) {
        return this.request( '/api/user/logout', { 
            method: 'post',
            data,
            ...params 
        })
    } 

    static register(data: any, params?: any) {
        return this.request( '/api/user/register', { 
            method: 'post',
            data,
            ...params 
        })
    }
}

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

    static update(data: any, params?: any) {
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