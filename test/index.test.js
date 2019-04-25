var expect = require('chai').expect

var add = function (a, b) {
    return a + b
}
var m = function (a, b) {
    return a - b
}

describe('算数测试', function () {
    describe('加法测试', function () {
        it('1 + 1应该等于2', function () {
            expect(add(1,1)).to.be.equal(2);
        })
    
        it('1 + 2应该等于3', function () {
            expect(add(1,2)).to.be.equal(3);
        })
    })

    describe('减法测试', function () {
        it('2 - 1应该等于1', function () {
            expect(m(2,1)).to.be.equal(1);
        })
    
        it('3 - 1应该等于2', function () {
            expect(m(3,1)).to.be.equal(2);
        })
    })
})