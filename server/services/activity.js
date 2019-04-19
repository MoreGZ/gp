const Service = require('../libs/Service')

module.exports = class ActivityService extends Service {
    async list(data) {
        const { page_index, page_size} = data

        if(!page_index || !page_size) {
            return this.packege({}, false, 'page_index 或者 page_size不能为空')
        }

        let res,
            selectSql = 'select * from activity ',
            countSql = 'select count(*) from activity ',
            whereSql = 'where '
        
        _.map(data, (value, key) => {
            if(value && key !== 'page_size' && key !== 'page_index') {
                whereSql += `${key} like '%${value}%' and `
            }
        })
        if(whereSql !== 'where ') {
            whereSql = _.trimEnd(whereSql, ' and ')
            countSql += whereSql
            selectSql += whereSql
        }
        selectSql += ` limit ${(page_index-1)*page_size},${page_size}`

        try{
            let total = (await db.query(countSql)).results[0]['count(*)']
            let list = (await db.query(selectSql)).results
        
            res = this.packege({
                list,
                total
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async delete(data) {
        const { activity_id } = data;

        let res

        try{
            let selectRes = (await db.query(`select id from voucher where activity_id=${activity_id} `)).results
            if(selectRes.length > 0) {
                let sql1 = 'delete from voucher_include_category where '
                let sql2 = 'delete from voucher_include_good where '
                selectRes.forEach((item, index) => {
                    sql1 += `voucher_id=${item.id} or `
                    sql2 += `voucher_id=${item.id} or `
                })
                sql1 = _.trimEnd(sql1, ' or ')
                sql2 = _.trimEnd(sql2, ' or ')

                await db.query(sql1)
                await db.query(sql2)
            }

            let deleteRes1 = (await db.query(`DELETE from voucher where activity_id=${activity_id} `)).results
            let deleteRes2 = (await db.query(`DELETE from page where activity_id=${activity_id} `)).results
            let deleteRes3 = (await db.query(`DELETE from activity_include_good where activity_id=${activity_id} `)).results
            let deleteRes4 = (await db.query(`DELETE from activity where id=${activity_id} `)).results
        
            res = this.packege({
                deleteRes1,
                deleteRes2,
                deleteRes3,
                deleteRes4,
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async query(data) {
        const { activity_id } = data;

        let res

        try{
            let baseInfo = (await db.query(`select * from activity where id=${activity_id} `)).results[0]
        
            res = this.packege({
                baseInfo
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async add(data) {
        const { name, begin_date, end_date, status } = data
        let res;

        let inserSql = `
            INSERT INTO activity 
            (name, status, begin_date, end_date, creator)
            value
            ('${name}', '${status}', '${begin_date}', '${end_date}', '${this.ctx.session.userInfo.username}')
        `

        try{
            const inserRes = await db.query(inserSql)
            console.log(inserRes)
            const activity_id = inserRes.results.insertId

            res = this.packege({
                inserRes
            })
            
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res;
    }

    async update(data) {
        const { id, name, status, begin_date, end_date } = data;
        let res;

        if(id === undefined || name === undefined || status === undefined || begin_date === undefined || end_date === undefined) {
            return this.packege({}, false, '请求参数必须包含id, name, category, descp, img')
        }

        const sql = `
            UPDATE activity 
            SET name='${name}', status='${status}', begin_date='${begin_date}', end_date='${end_date}'
            where id=${id}
        `
        console.log(sql)
        try{
            let sqlRes = await db.query(sql)
        
            res = this.packege({
                sqlRes
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async addGoodToActivity(data) {
        const { activity_id, good_ids } = data

        if(good_ids.length <= 0) {
            return this.packege({})
        }
        
        let inserSql = `
            INSERT INTO activity_include_good 
            (activity_id, good_id)
            value
        `, res

        try{
            good_ids.forEach((item, index) => {
                inserSql += `('${activity_id}', '${item}'),`
            })
            inserSql =  _.trimEnd(inserSql, ',')

            const inserRes = await db.query(inserSql)

            res = this.packege({
                inserRes
            })
            
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res;
    }

    async removeGoodFromActivity(data) {
        const { activity_id, good_id } = data;

        let res

        try{
            let deleteRes = (await db.query(`DELETE from activity_include_good where activity_id=${activity_id} and good_id=${good_id}`)).results
        
            res = this.packege({
                deleteRes,
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }
}