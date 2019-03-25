import * as React from 'react'
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'

import './style.less'

const { Header, Content, Sider } = Layout;
interface MenuItem {
    text: string,
    iconName: string,
    key: string,
    link: string
}

export default class PageLayout extends React.Component<any, any> {
    menuItems: MenuItem[] = [
        {
            text: '活动管理',
            iconName: "setting",
            key: 'activity',
            link: '/activity'
        },
        {
            text: '商品管理',
            iconName: "shopping-cart",
            key: 'good',
            link: '/good'
        }
    ]

    DropDownMenu: React.ReactElement = (
        <Menu>
            <Menu.Item>
                <a href="javascript:;">退出登陆</a>
            </Menu.Item>
        </Menu>
    )
    
    constructor(props: any) {
        super(props)

        
    }

    render() {
        return (
            <Layout className='page_layout'>
                <Header className="header">
                    <div className="logo">
                        <img src="http://localhost:7003/img/logo.png" alt="" height="42" width="44"/>
                    </div>
                    <Dropdown overlay={this.DropDownMenu}>
                        <Avatar size="large" icon="user" className='avatar'/>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={104} className='sider'>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["activity"]}
                            defaultOpenKeys={["sub1"]}
                            className='menu'
                        >
                        {
                            _.map(this.menuItems, (item) => {
                                return (
                                    <Menu.Item key={item.key} className='menu_item'>
                                        <Link to={item.link}>
                                            <Icon type={item.iconName} className="menu_item_icon"></Icon>
                                            <p className="menu_item_text">{item.text}</p>
                                        </Link>
                                    </Menu.Item>
                                )
                            })
                        }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content className='contant'>  
                        {
                            ...this.props.children
                        }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}