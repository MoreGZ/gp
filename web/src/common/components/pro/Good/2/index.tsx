import * as React from 'react'
import { Menu } from 'antd'
import * as _ from 'lodash'
import config from './config'
import util from '@common/libs/util'
import './style.less'

export class Module extends React.Component<any, any> {
    render () {
        const { moduleInfo, onClick, isEdit=false } = this.props
        const moduleInfoValues = moduleInfo.values
        let href = isEdit ? 'javascripts:;' : 'http://www.baidu.com'

        return (
            <div className='good_module_content2'>
            {
                _.map(moduleInfo.values, (data: any, index: number) => (
                    <div className={index === 3 ? "good_card" : 'mr32 good_card'}>
                        <div className="good_card_img">
                            <img src={data.coverImg} alt=""/>
                        </div>
                        <div className="good_card_desc" style={{background: data.bcColor}}>
                            <div className="good_card_desc_name">{data.name}</div>
                            <div className="good_card_desc_price">抢购价￥{data.activityPrice}</div>
                        </div>
                        <div className="good_card_btns">
                            <button className='good_card_button good_card_button1' style={{
                                borderColor: data.buttonBorderColor1,
                                color: data.buttonTextColor1,
                                background: data.buttonColor1
                            }}>加入购物车</button>
                            <button className='good_card_button good_card_button2' style={{
                                borderColor: data.buttonBorderColor2,
                                color: data.buttonTextColor2,
                                background: data.buttonColor2
                            }}>立即抢购</button>
                        </div>
                    </div>
                ))
            }
            </div>
        )
    }
}

export default Module

export { default as Editor } from './Editor';

export { default as config } from './config';

export const MenuItem = (props: any) => {
    const {onClick} = props

    return (
        <Menu.Item 
        key='voucher_1' 
        style={{height: 'auto', paddingLeft: '20px', position: 'relative', right: '24px', textAlign: 'center'}} 
        className='img-menu-item'
        {...props}
        onClick={() => { onClick( util.deepClone(config) ) }}
        >
            <img src='http://localhost:7003/img/pro/good2.png' width='150'/>
        </Menu.Item>
    )
}