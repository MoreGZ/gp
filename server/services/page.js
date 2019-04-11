const Service = require('../libs/Service')

module.exports = class PageService extends Service {
    async list(data) {
        const { page_index=1, page_size=10, activity_id} = data

        if(!page_index || !page_size) {
            return this.packege({}, false, 'page_index 或者 page_size不能为空')
        }

        let res,
            selectSql = 'select * from page ',
            countSql = 'select count(*) from page ',
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
        const { page_id } = data;

        let res

        try{
            let deleteRes = (await db.query(`DELETE from page where id=${page_id} `)).results
        
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
        const { activity_id, title } = data
        let res;

        let inserSql = `
            INSERT INTO page 
            (activity_id, title, config, config_edit, status)
            value
            ('${activity_id}', '${title}', '${JSON.stringify([])}', '${JSON.stringify([])}', 0)
        `

        try{
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

    async updateTitle(data) {
        const { id, title } = data
        let res;

        let updateSql = `
            UPDATE page 
            SET title='${title}'
            where id=${id}
        `
        console.log(updateSql)
        try{
            const updateRes = await db.query(updateSql)

            res = this.packege({
                updateRes
            })
            
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res;
    }

    async save(data) {
        const { page_id, config_edit} = data
        
        if(page_id === undefined || config_edit === undefined) {
            return this.packege({}, false, '缺少必要参数')
        }

        let res;

        const sql = `
        UPDATE page 
        SET config_edit='${JSON.stringify(config_edit)}'
        where id=${page_id}
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

    async public(data) {
        const { page_id } = data

        if(page_id === undefined) {
            return this.packege({}, false, '缺少必要参数')
        }
        const selectSql = `
            select config_edit from page where id=${page_id}
        `
        let res

        try{
            let config_edit = (await db.query(selectSql)).results[0].config_edit
            let sql = `
                UPDATE page 
                SET status=${1}, config='${config_edit}'
                where id=${page_id} 
            `
            console.log(sql)
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

    async offline(data) {
        const { page_id } = data

        if(page_id === undefined) {
            return this.packege({}, false, '缺少必要参数')
        }

        let res;

        const sql = `
            UPDATE page 
            SET status='${0}'
            where id=${page_id}
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

    async getPageConfig(data) {
        const { page_id } = data;

        let res

        try{
            let config = (await db.query(`select config from page where id=${page_id} `)).results[0].config
        
            res = this.packege({
                config: JSON.parse(config)
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }

    async getPageEditConfig(data) {
        const { page_id } = data;

        let res

        try{
            let config = (await db.query(`select config_edit from page where id=${page_id} `)).results[0].config_edit
        
            res = this.packege({
                config: JSON.parse(config)
            })
        }catch(err) {
            res = this.packege({}, false, '服务器出了点错误')
            throw err
        }

        return res
    }
}