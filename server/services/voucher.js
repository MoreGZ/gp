const Service = require('../libs/Service')

module.exports = class VoucherService extends Service {
    async list(data) {
        const { page_index=1, page_size=10, activity_id} = data

        if(!page_index || !page_size) {
            return this.packege({}, false, 'page_index 或者 page_size不能为空')
        }

        let res,
            selectSql = 'select * from voucher ',
            countSql = 'select count(*) from voucher ',
            whereSql = 'where '
        
        _.map(data, (value, key) => {
            if(value && key !== 'page_size' && key !== 'page_index') {
                whereSql += `${key} = '${value}' and `
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
                list: list.map((item, index) => {
                    return {
                        ...item
                    }
                }),
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
            let deleteRes1 = (await db.query(`DELETE from voucher_include_good where voucher_id=${voucher_id} `)).results
            let deleteRes2 = (await db.query(`DELETE from voucher_include_category where voucher_id=${voucher_id} `)).results
            let deleteRes3 = (await db.query(`DELETE from voucher where id=${voucher_id} `)).results
        
            res = this.packege({
                deleteRes1,
                deleteRes2,
                deleteRes3,
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async add(data) {
        const { name, activity_id, threshold, value, period_start, period_end, num, status, scenes, goods, category_id } = data
        let res;

        // 新建代金券
        let inserVoucherSql = `
            INSERT INTO voucher 
            (name, activity_id, threshold, value, period_start, period_end, num, use_num, received_num, status, scenes)
            value
            ('${name}', '${activity_id}', '${threshold}', '${value}', '${period_start}', '${period_end}', ${num}, ${num}, ${num}, ${status}, ${scenes})
        ` 

        try{
            const inserVoucherRes = await db.query(inserVoucherSql)
            const voucher_id = inserVoucherRes.results.insertId

            // 为代金券绑定商品或者品类
            let inserUseSql = ''
            console.log(category_id)
            if(scenes === 2 && category_id) { //品类代金券
                inserUseSql = `
                    INSERT INTO voucher_include_category 
                    (voucher_id, category_id)
                    value
                    (${voucher_id}, ${category_id})
                `
            } else if (scenes === 3 && goods && goods.length > 0) { //商品代金券
                inserUseSql = `
                    INSERT INTO voucher_include_good 
                    (voucher_id, good_id)
                    value
                `
                goods.forEach((item, index) => {
                    inserUseSql += `(${voucher_id}, ${item}),`
                })

                inserUseSql =  _.trimEnd(inserUseSql, ',')
            }

            console.log(inserUseSql, "inserUseSql")
            let inserUseRes
            if(scenes === 2 || scenes === 3){
                inserUseRes = await db.query(inserUseSql)
            }
            

            res = this.packege({
                inserVoucherRes,
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
            UPDATE voucher 
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