import * as React from 'react'
import { Layout, Menu, Dropdown, Icon, Avatar, message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { UserApi } from '../../services/api'
import * as _ from 'lodash'

import './style.less'

const { Header, Content, Sider } = Layout;
interface MenuItem {
    text: string,
    iconName: string,
    key: string,
    link: string
}

class PageLayout extends React.Component<any, any> {
    menuItems: MenuItem[] = [
        {
            text: '活动管理',
            iconName: "setting",
            key: 'activity',
            link: '/manager/activity'
        },
        {
            text: '商品管理',
            iconName: "shopping-cart",
            key: 'good',
            link: '/manager/good'
        }
    ]

    handleLogout() {
        UserApi.logout({}).then(res => {
            location.replace('/login')
        }).catch(err => {
            message.error(err.message)
        })
    }

    
    renderDropDownMenu() {
        const { userInfo } = this.state

        return (
            <Menu>
                <Menu.Item>
                    <span>{userInfo.username ? `你好，${userInfo.username}` : '请登录'}</span>
                </Menu.Item>
                <Menu.Item>
                    <a href="javascript:;" onClick={this.handleLogout.bind(this)}>退出登录</a>
                </Menu.Item>
            </Menu>
        )
    }
    
    constructor(props: any) {
        super(props)

        this.state = {
            userInfo: {},
            isLoading: false
        }
    }

    getUserInfo() {
        this.setState({
            isLoading: true
        }, () => {
            UserApi.getUserInfo({}).then(res => {
                this.setState({
                    userInfo: res.data
                })
            }).catch(err => {
                message.error(err.message)
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    componentDidMount() {


        this.getUserInfo()
    }

    render() {
        const { location: {pathname} } = this.props
        
        const defaultSelectedKey = pathname.split('/')[2]

        return (
            <Layout className='page_layout'>
                <Header className="header">
                    <div className="logo">
                        <img src="http://localhost:7003/img/logo.png" alt="" height="42" width="44"/>
                    </div>
                    <Dropdown overlay={this.renderDropDownMenu()}>
                        <Avatar size="large" icon="user" className='avatar'/>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={104} className='sider'>
                        <Menu
                            mode="inline"
                            selectedKeys={[defaultSelectedKey]}
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

export default withRouter(PageLayout)