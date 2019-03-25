import * as _ from 'lodash'

let defaultValue = {
    name: '商品名称',
    coverImg: '',
    desc: '商品描述balabalabala',
    price: 8888,
    activityPrice: 6888,
    buttonColor: 'bisque',
    buttonTextColor: 'rgb(83,83,83)',
    nameColor: 'rgb(83,83,83)',
    descColor: 'rgb(83,83,83)',
    priceColor: 'rgb(83,83,83)',
    bcColor: '#fff',
    bindGood: {},
}

const defaultValueCreator = () => {
    return _.extend({}, defaultValue);
}

export default defaultValueCreator()
