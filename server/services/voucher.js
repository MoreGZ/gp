const Service = require('../libs/Service')

module.exports = class VoucherService extends Service {
    async list(data) {
        const { page_index=1, page_size=10} = data

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

            let res1 = [], res2 = []
            if(list.length > 0) {
                let sql1 = 'select * from voucher_include_category where '
                let sql2 = 'select * from voucher_include_good where '
                list.forEach((item, index) => {
                    sql1 += `voucher_id=${item.id} or `
                    sql2 += `voucher_id=${item.id} or `
                })
                sql1 = _.trimEnd(sql1, ' or ')
                sql2 = _.trimEnd(sql2, ' or ')

                res1 = (await db.query(sql1)).results
                res2 = (await db.query(sql2)).results
            }
            
        
            res = this.packege({
                list: list.map((item, index) => {
                    let goods = res2.filter((val) => item.id == val.voucher_id).map((val) => val.good_id)
                    let category_id = res1.filter((val) => item.id == val.voucher_id).map((val) => val.category_id)
                    return {
                        ...item,
                        goods,
                        category_id: category_id.length > 0 ? category_id[0] : undefined
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

        try{
            let inserVoucherSql = `
            INSERT INTO voucher 
            (name, activity_id, threshold, value, period_start, period_end, num, use_num, received_num, status, scenes)
            value
            ('${name}', '${activity_id}', '${threshold}', '${value}', '${period_start}', '${period_end}', ${num}, ${num}, ${num}, ${status}, ${scenes})
        ` 

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
        const { id, name, threshold, value, period_start, period_end, num, status, scenes, goods, category_id  } = data;
        let res;

        const sql = `
            UPDATE voucher 
            SET name='${name}', threshold=${threshold}, value=${value}, period_start='${period_start}', period_end='${period_end}', num=${num}, status=${status}, scenes=${scenes}
            where id=${id}
        `
        let inserUseSql = ''

        if(scenes === 2 && category_id) { //品类代金券
            inserUseSql = `
                INSERT INTO voucher_include_category 
                (voucher_id, category_id)
                value
                ('${id}', '${category_id}')
            `
        } else if (scenes === 3 && goods && goods.length > 0) {
            inserUseSql = `
                INSERT INTO voucher_include_good 
                (voucher_id, good_id)
                value
            `
            goods.forEach((item, index) => {
                inserUseSql += `('${id}', '${item}'),`
            })

            inserUseSql =  _.trimEnd(inserUseSql, ',')
        }
        
        try{
            console.log(sql)
            let sqlRes = await db.query(sql)
            await db.query(`DELETE from voucher_include_good where voucher_id=${id} `).results
            await db.query(`DELETE from voucher_include_category where voucher_id=${id} `).results
            let inserUseRes
            if(scenes === 2 || scenes === 3){
                inserUseRes = await db.query(inserUseSql).results
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