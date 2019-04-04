import * as React from 'react'
import * as _ from 'lodash'

export default (components: any) => {
    let menu = [
        {
            title: "Banner",
            key: 'banner',
            subMenu: new Array
        },
        {
            title: "Photo",
            key: 'photo',
            subMenu: new Array
        },
        {
            title: "商品",
            key: 'good',
            subMenu: new Array
        },
        {
            title: "代金券",
            key: 'voucher',
            subMenu: new Array
        },
    ], Components = new Array
    _.forEach(components, (component, index) => {
        _.find(menu, (menuItem, index) => menuItem.key === component.config.type)
            .subMenu.push(component.MenuItem)
        Components[component.config.version] = component.Editor
    })

    return (Editor: any) => {
        return (props: any) => <Editor {...props} Components={Components} menu={menu}/>
    }
}