import * as React from 'react'
import {Drawer, Menu} from 'antd'
import * as _ from 'lodash'

const SubMenu = Menu.SubMenu

export default (props: any) => {
    const { visible, onAddModule, onClose, current, menu } = props;

    return (
        <Drawer
            title="添加区块"
            placement='left'
            style={{padding: '0px'}}
            closable={true}
            visible={visible}
            onClose={onClose}
        >
            <Menu
                selectedKeys={[current]}
                mode="inline"
            >
            {
                _.map(menu, (item) => (
                    <SubMenu key={item.key} title={item.title}>
                    {
                        _.map(item.subMenu, (MenuItem) => <MenuItem onClick={onAddModule}></MenuItem>)
                    }
                    </SubMenu>
                ))
            }
            </Menu>
        </Drawer>
    )
}