import * as React from 'react'
import { Input, Icon } from 'antd'
import './index.less'
import * as _ from 'lodash'

const Search = Input.Search
export default class ProHeader extends React.Component<any, any>{
    state = {
        currentTabKey: '0'
    }

    topNamNavMenu = [
        {   
            text:'登录',
            key: 'login',
            link: 'javascritp:;'
        },
        {   
            text:'注册',
            key: 'register',
            link: 'javascritp:;'
        },
        {   
            text:'我的订单',
            key: 'deal',
            link: 'javascritp:;'
        },
        {   
            text:'购物车',
            key: 'shoppingcar',
            link: 'javascritp:;'
        },
    ]

    navMenu = [
        {
            text: '首页',
            link: 'javascritp:;'
        },
        {
            text: '居家',
            link: 'javascritp:;'
        },
        {
            text: '箱包配饰',
            link: 'javascritp:;'
        },
        {
            text: '服饰',
            link: 'javascritp:;'
        },
        {
            text: '电器',
            link: 'javascritp:;'
        },
        {
            text: '洗护',
            link: 'javascritp:;'
        },
        {
            text: '婴童',
            link: 'javascritp:;'
        },
        {
            text: '图书',
            link: 'javascritp:;'
        },
        {
            text: '饮食',
            link: 'javascritp:;'
        },
    ]

    render() {
        const { currentTabKey } = this.state

        return (
            <div className='pro_header'>
                <div className="level1_wrapper">
                    <div className="level1">
                        <div className="search_box">
                            <Search placeholder='直降300' size='small'/>
                        </div>
                        <div className="topnav">
                            <ul>
                            {
                                _.map(this.topNamNavMenu, ( item ) => (
                                    <li key={item.key} className='topnav_item'>
                                        <a href={item.link}>{item.text}</a>
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="level2_wrapper">
                    <div className="level2">
                        <ul className='downnav'>
                        {
                            _.map(this.navMenu, (item, index: number) => (
                                <li key={index} className={currentTabKey == index ? 'nav_item active' : 'nav_item'}>
                                    <a href={item.link}>{item.text}</a>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}