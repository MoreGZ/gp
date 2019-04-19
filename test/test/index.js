// var assert = require('assert')
// var GoodServices = require('../services/good')

// var listResponse1 = {
//     data: {
//         list: [
//             {
//                 id: 10001,
//                 name: "iphone",
//                 category: "",
//                 descp: "",
//                 config: "",
//                 is_in_activity: "",
//                 create_time: "",
//                 update_time: "",
//             },
//         ],
//         total: 3
//     },
//     message: '成功',
//     code: 1
// }
// var goodServices = new GoodServices();

// describe('商品模测试c', function() { // 单个模块
//     describe('查询商品列表', function() { //单个接口
//         it('不传人任何筛选条件，仅传入页数和页码', function() { //单个接口用例
//             assert.equal(goodServices.list({
//                 page_size: 10,
//                 page_index: 1
//             }))
//         }, listResponse)
//     })
// })