import * as React from 'react'
import './index.less'
import * as _ from 'lodash'
import { Divider } from 'antd'

export default (props: any) => {
    const footerText = [
        {
            title: '购物指南',
            list: ['购物流程', '会员介绍', '生活旅行/团购', '常见问题', '联系客服']
        },
        {
            title: '配送方式',
            list: ['上门自提', '211小时达', '配送服务查询', '配送收费标准', '海外配送']
        },
        {
            title: '购物指南',
            list: ['货到付款', '在线支付', '分期付款', '邮局汇款', '公司到账']
        },
        {
            title: '购物指南',
            list: ['售后政策', '价格保护', '退款说明', '运维/退换货', '取消订单']
        },
    ]
    const footerText2 = ['关于我们', '联系我们', '联系客服', '合作招商', '商家帮助', '营销中心']
    return (
        <div className='pro_footer'>
            <div className="level1">
                <div className="content">
                {
                    _.map(footerText, (list) => (
                        <ul className='footer_text'>
                            <p className='footer_text_title'>{list.title}</p>
                        {
                            _.map(list.list, (item) => (
                                <li className='footer_text_item'><a href="javascript:;">{item}</a></li>
                            ))
                        }
                        </ul>
                    ))
                }
                </div>
            </div>
            <div className='divider'/>
            <div className="level2">
                <div className="content">
                {
                    _.map(footerText2, (text) => (
                        <span><a href="javascript:;">{text}</a> <span className='br'>|</span></span>
                    ))
                }
                </div>
            </div>
        </div>
    )
}