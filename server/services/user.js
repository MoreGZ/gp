const Service = require('../libs/Service')

module.exports = class UserService extends Service {
    async login(data) {
        const selectSql = `
            select * from manager
            where username='${data.username}' and password=md5('${data.password}')
        `
        let res;

        try{
            let selectSqlRes = await db.query(selectSql)
            let isExit = selectSqlRes.results.length > 0

            if(isExit) {
                this.ctx.session = {
                    isLogin: true,
                    userInfo: {
                        username: data.username,
                        userId: selectSqlRes.results[0].id
                    }
                }

                res = this.packege({})
            }else {
                res = this.packege({}, false, '用户名或者密码错误')
            }
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }
        
        return res
    }

    async logout(data) {
        this.ctx.session = {
            isLogin: false
        }

        return this.packege({})
    }

    async register(data) {
        const selectSql = `
            select * from manager
            where username='${data.username}'
        `
        const insertSql = `
            INSERT INTO manager 
            (username, password)
            value
            ('${data.username}',md5('${data.password}'));
        `

        let res
        try{
            let selectSqlRes = await db.query(selectSql)
            let isExitBefore = selectSqlRes.results.length > 0
            
            if(!isExitBefore) {
                let sqlRes = await db.query(insertSql)
                res = this.packege(sqlRes)
            }else {
                res = this.packege({}, false, '用户名已经存在')
            }
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }
        console.log(res)
        return res
    }

    async getUserInfo(data) {
        const { userId } = data

        const selectSql = `
            select * from manager
            where id='${userId}'
        `

        let res
        try{
            let selectSqlRes = (await db.query(selectSql)).results[0]

            res = this.packege(selectSqlRes)
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }
}