const Service = require('../libs/Service')

module.exports = class UserService extends Service {
    async list(data) {
        const { page_index, page_size} = data

        if(!page_index || !page_size) {
            return this.packege({}, false, 'page_index 或者 page_size不能为空')
        }

        let res,
            selectSql = 'select * from voucher ',
            countSql = 'select count(*) from voucher ',
            whereSql = 'where '
        
        _.map(data, (value, key) => {
            if(value && key !== 'page_size' && key !== 'page_index') {
                whereSql += `${key} like '${value}' and `
            }
        })
        if(whereSql !== 'where ') {
            whereSql = _.trimEnd(whereSql, ' and ')
            countSql += whereSql
            selectSql += whereSql
        }
        selectSql += ` limit ${page_index-1},${page_size}`

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
        const { voucher_id } = data;

        let res

        try{
            let deleteRes = (await db.query(`DELETE from voucher_include_good where voucher_id=${voucher_id} `)).results
            let deleteRes = (await db.query(`DELETE from voucher_include_cetagory where voucher_id=${voucher_id} `)).results
            let deleteRes = (await db.query(`DELETE from voucher where id=${voucher_id} `)).results
        
            res = this.packege({
                deleteRes,
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async add(data) {
        const { name, activity_id, threshold, value, period_start, period_end, num, status, scenes, goods, cetagory } = data
        let res;

        // 新建代金券
        let inserVoucherSql = `
            INSERT INTO voucher 
            (name, threshold, value, period_start, period_end, num, use_num, status, scenes)
            value
            ('${name}', '${threshold}', '${value}', '${period_start}', '${period_end}', ${num}, ${num}, ${status}, ${scenes})
        ` 

        try{
            const inserVoucherRes = await db.query(inserVoucherSql)
            const voucher_id = inserVoucherRes.results.insertId

            // 为代金券绑定商品或者品类
            let inserUseSql = ''
            if(scenes === 2 && cetagory && cetagory.length > 0) { //品类代金券
                inserUseSql = `
                    INSERT INTO voucher_include_cetagory 
                    (voucher_id, category_id)
                    value
                    ('${activity_id}', '${voucher_id}')
                `
                cetagory.forEach((item, index) => {
                    inserUseSql += `('${voucher_id}', '${item}'),`
                })

                inserUseSql =  _.trimEnd(inserUseSql, ',')
                
            } else if (scenes === 3 && good && good.length > 0) {
                inserUseSql = `
                    INSERT INTO voucher_include_good 
                    (voucher_id, good_id)
                    value
                    ('${activity_id}', '${voucher_id}')
                `
                goods.forEach((item, index) => {
                    inserUseSql += `('${voucher_id}', '${item}'),`
                })

                inserUseSql =  _.trimEnd(inserUseSql, ',')
            }
            consoele.log(inserUseSql)
            if(scenes === 2 && scenes === 3){
                const inserUseRes = await db.query(inserUseSql)
            }
            

            res = this.packege({
                inserVoucherRes,
                inserActivityRes,
                inserUseRes
            })
            
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res;
    }

    async update(data) {
        const { id, name, threshold, value, period_start, period_end, num, status, goods, cetagory  } = data;
        let res;

        const sql = `
            UPDATE activity 
            SET name='${name}', threshold='${threshold}', value='${value}', period_start='${period_start}, period_end='${period_end}, num=${num}, status=${status}'
            where id=${id}
        `
        let inserUseSql = ''

        if(cetagory && cetagory.length > 0) { //品类代金券
            inserUseSql = `
                INSERT INTO voucher_include_cetagory 
                (voucher_id, category_id)
                value
                ('${activity_id}', '${voucher_id}')
            `
            cetagory.forEach((item, index) => {
                inserUseSql += `('${voucher_id}', '${item}'),`
            })

            inserUseSql =  _.trimEnd(inserUseSql, ',')
            
        } else if (good && good.length > 0) {
            inserUseSql = `
                INSERT INTO voucher_include_good 
                (voucher_id, good_id)
                value
                ('${activity_id}', '${voucher_id}')
            `
            goods.forEach((item, index) => {
                inserUseSql += `('${voucher_id}', '${item}'),`
            })

            inserUseSql =  _.trimEnd(inserUseSql, ',')
        }
        
        try{
            let sqlRes = await db.query(sql)
            await db.query(`DELETE from voucher_include_good where voucher_id=${voucher_id} `)
            await db.query(`DELETE from voucher_include_cetagory where voucher_id=${voucher_id} `)
            if(scenes === 2 && scenes === 3){
                const inserUseRes = await db.query(inserUseSql)
            }
            res = this.packege({
                sqlRes,
                inserUseRes
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }
}