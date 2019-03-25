const Service = require('../libs/Service')

module.exports = class UserService extends Service {
    async list(data) {
        const { page_index, page_size} = data

        if(!page_index || !page_size) {
            return this.packege({}, false, 'page_index 或者 page_size不能为空')
        }

        let res,
            selectSql = 'select * from good ',
            countSql = 'select count(*) from good ',
            whereSql = 'where '
        
        _.map(data, (value, key) => {
            if(value && key !== 'page_size' && key !== 'page_index') {
                whereSql += `${key}='${value}' and `
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
            list = _.map(list, (value) => ({
                ...value,
                config: JSON.parse(value.config)
            }))

            if(data.activity_id) {
                let activityGoos = (await db.query(`select good_id from activity_include_good where activity_id = ${activity_id}`)).results
                console.log(activityGoos)
                list = _.filter(list, (value, index) => {
                    return _.includes(activityGoos, value.id)
                })
            }
        
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
        const { good_id } = data;

        let res

        try{
            let deleteSubGoodRes = (await db.query(`DELETE from sub_good where good_id=${good_id} `)).results
            let deleteGoodRes = (await db.query(`DELETE from good where id=${good_id} `)).results
        
            res = this.packege({
                deleteGoodRes,
                deleteSubGoodRes
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async query(data) {
        const { good_id } = data;

        let res

        try{
            let baseInfo = (await db.query(`select * from good where id=${good_id} `)).results[0]
            let subGoods = (await db.query(`select * from sub_good where good_id=${good_id} `)).results
        
            res = this.packege({
                baseInfo,
                subGoods
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async add(data) {
        const { name, category, descp, config, is_in_activity=1, img } = data
        let res;

        // 配置不得为空
        if(config.length === 0) {
            this.packege({}, false, '商品应该至少有一种配置')
        }

        //往good插入数据
        let inserGoodSql = `
            INSERT INTO good 
            (name, category, config, descp, is_in_activity, img)
            value
            ('${name}', '${category}', '${JSON.stringify(config)}', '${descp}', ${is_in_activity}, '${JSON.stringify(img)}')
        `
        console.log(inserGoodSql)
        try{
            const inserGoodRes = await db.query(inserGoodSql)
            console.log(inserGoodRes)
            const good_id = inserGoodRes.results.insertId
            //往sub_good插入数据
            const sub_goods = this.buildSubGoodFromConfig(config, 0, [])
            console.log(sub_goods)
            let inserSubGoodSql = _.reduce(sub_goods, (result, value, index) => {
                return result + `(${good_id}, '${JSON.stringify(value)}', 0, 0, '${this.ctx.username || ""}', 0),`
            }, `
                INSERT INTO sub_good 
                (good_id, config, original_price, activity_price, creator, count)
                value
            `)
            inserSubGoodSql = inserSubGoodSql.substr(0, inserSubGoodSql.length-1)
            console.log(inserSubGoodSql)
            const inserSubGoodRes = await db.query(inserSubGoodSql)

            res = this.packege({
                inserGoodRes,
                inserSubGoodRes
            })
            
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res;
    }

    async update(data) {
        const { id, name, category, descp, img } = data;
        let res;

        if(id === undefined || name === undefined || category === undefined || descp === undefined || img === undefined) {
            return this.packege({}, false, '请求参数必须包含id, name, category, descp, img')
        }

        const sql = `
            UPDATE good 
            SET name='${name}', category='${category}', descp='${descp}', img='${JSON.stringify(img)}'
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

    async listCategory(data) {
        let res

        try{
            let list = (await db.query('select * from category')).results
        
            res = this.packege({
                list
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async updateSubGood(data) {
        const { sub_good_id, original_price, activity_price, count } = data
        let res

        if(sub_good_id === undefined || original_price === undefined || activity_price === undefined || count === undefined) {
            return this.packege({}, false, '请求参数必须包含sub_good_id, original_price, activity_price, count')
        }

        const sql = `
            UPDATE sub_good 
            SET original_price=${original_price}, activity_price=${activity_price}, count=${count}
            where id=${sub_good_id}
        `

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

    buildSubGoodFromConfig(config, cur, stap) {
        if(config.length === 0) return []

        if(cur === 0) {
            return this.buildSubGoodFromConfig(config, cur+1, _.map(config[0].value, (value) => {
                return {
                    [config[0].name]: value
                }
            }))
        }

        if(config.length === cur) {
            return stap
        }

        let tmp = []

        for(let i = 0; i < stap.length; i++) {
            for( let j = 0; j < config[cur]['value'].length;j++ ){
                tmp.push({
                    ...stap[i],
                    [config[cur].name]: config[cur]['value'][j]
                })
            }
        }

        return this.buildSubGoodFromConfig(config, cur+1, tmp)
    }
}