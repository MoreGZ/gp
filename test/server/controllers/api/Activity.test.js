const assert = require('power-assert')
const axios = require('axios')

const requestDatas = [
    {
        page_index: 1,
        page_size: 1
    },
    {
        page_index: 1,
        page_size: 1,
        name: '测试'
    },
    {
        name: '测试'
    }
]

const responseDatas = [
    {
        code: 1,        
        data: {
            list: [{
                begin_date: "2019-04-02T01:51:39.000Z",
                create_time: "2019-04-25T01:54:17.000Z",
                creator: "blue",
                end_date: "2019-04-30T01:51:39.000Z",
                id: 10023,
                "name": "富士INSTAX 新品新品促销",
                status: 0,
                "update_time": "2019-04-25T01:54:17.000Z"
            }],
            total: 2
        },
        message: "成功",
        success: true
    },
    {
        code: 1,        
        data: {
            list: [{
                "begin_date": "2019-04-08T02:48:26.000Z",
                "create_time": "2019-04-25T02:49:04.000Z",
                creator: "blue",
                "end_date": "2019-04-30T02:48:26.000Z",
                id: 10024,
                "name": "测试活动",
                status: 0,
                "update_time": "2019-04-25T02:49:04.000Z"
            }],
            total: 1
        },
        message: "成功",
        success: true
    },
    {
        code: 0,        
        data: {},
        message: "page_index 或者 page_size不能为空",
        success: false
    },
]

describe('活动模块测试', () => { // 单个模块
    describe('搜索活动列表', () => { //单个接口
        let cookie

        before('0. 获取登录态', async () => {
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/login/login',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: null,
                method: 'post',
                data: {
                    username: 'georgemo',
                    password: 'george960124.'
                }
            })

            let setCookie = response.headers['set-cookie']
            
            cookie = setCookie.map((item) => {
                return item.split(';')[0]
            }).join(';')
        })

        it('1. 传入page_index, page_size', async () => { //单个接口用例
            // console.log(cookie)
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/activity/list',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: {
                    "Cookie" : cookie
                },
                method: 'get',
                params: requestDatas[0]
            })

            assert.deepEqual(response.data, responseDatas[0])
        })

        it('2. 传入page_index, page_size和搜索关键字', async () => { //单个接口用例
            // console.log(cookie)
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/activity/list',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: {
                    "Cookie" : cookie
                },
                method: 'get',
                params: requestDatas[1]
            })

            assert.deepEqual(response.data, responseDatas[1])
        })

        it('3. 传入搜索关键字不传入page_index和page_size', async () => { //单个接口用例
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/activity/list',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: {
                    "Cookie" : cookie
                },
                method: 'get',
                params: requestDatas[2]
            })

            assert.deepEqual(response.data, responseDatas[2])
        })
    })

    
})