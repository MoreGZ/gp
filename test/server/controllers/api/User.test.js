const assert = require('power-assert')
const axios = require('axios')

const requestDatas = [
    {
        username: 'georgemo',
        password: 'george960124.'
    },
    {
        username: 'Georgemo',
        password: 'George960124.'
    },
    {
        username: 'georgemo',
        password: 'e960124'
    },
    {
        username: 'george',
        password: 'george960124.'
    },
    {
        username: 'george',
        password: 'george94.'
    },
    {},
]

const responseDatas = [
    {
        code: 1,
        data: {},
        message: "成功",
        success: true
    },
    {
        code: 0,
        data: {},
        message: "用户名或者密码错误",
        success: false
    },
    {
        code: 0,
        data: {},
        message: "用户名或者密码不能为空",
        success: false
    }
]

describe('用户模块测试', () => { // 单个模块
    describe('登录操作', () => { //单个接口
        it('1. 同时传入正确的用户名和密码', async () => { //单个接口用例
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/login/login',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: null,
                method: 'post',
                data: requestDatas[0]
            })
            assert.deepEqual(response.data, responseDatas[0])
        })

        it('2. 传入大写字母开头的用户名，测试用户名大小写敏感', async () => { //单个接口用例
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/login/login',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: null,
                method: 'post',
                data: requestDatas[1]
            })

            assert.deepEqual(response.data, responseDatas[1])
        })

        it('3. 传入正确的用户名和错误的密码', async () => { //单个接口用例
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/login/login',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: null,
                method: 'post',
                data: requestDatas[2]
            })

            assert.deepEqual(response.data, responseDatas[1])
        })

        it('4. 传入错误的用户名和正确的密码', async () => { //单个接口用例
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/login/login',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: null,
                method: 'post',
                data: requestDatas[3]
            })

            assert.deepEqual(response.data, responseDatas[1])
        })

        it('5. 传入错误的用户名和错误的密码', async () => { //单个接口用例
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/login/login',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: null,
                method: 'post',
                data: requestDatas[4]
            })

            assert.deepEqual(response.data, responseDatas[1])
        })

        it('6. 不传入用户名和密码', async () => { //单个接口用例
            let response = await axios({
                baseURL: 'http://localhost:7003',
                url: '/api/login/login',
                method: 'get',
                withCredentials: true,
                timeout: 30000,
                headers: null,
                method: 'post',
                data: requestDatas[5]
            })

            assert.deepEqual(response.data, responseDatas[2])
        })
    })
})