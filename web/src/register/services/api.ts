import { Request } from '@common/index'

export class UserApi extends Request {
    static register(data: any, params?: any) {
        return this.request( '/api/login/register', { 
            method: 'post',
            data,
            ...params 
        })
    }
}