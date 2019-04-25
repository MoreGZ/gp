import * as React from 'react'
import './style.less'
import { Menu, message } from 'antd'
import * as _ from 'lodash'
import config from './config'
import util from '@common/libs/util'

// export interface ModuleProps {
//     key: number | string,
//     moduleInfo: any,
// }

export class Module extends React.Component<any, any>{
    render () {
        const { moduleInfo, isEdit=false } = this.props
        let href = isEdit ? 'javascript:;' : 'javascript:;'

        return (
            <div className='voucher_module_content1'>
            {
                _.map(moduleInfo.values, (data: any, index: number) => (
                    <a href={href} target='blank' onClick={() => {message.success("领取代金券成功")}}>
                        <div className={index === 3 ? "editable_voucher" : 'mr30 editable_voucher'}>
                            <div className="voucher_info" style={{background: data.infoBgColor}}>
                                <div className="value_wrapper" style={{color: data.valueTextColor}}>
                                    <span className='value_unit'>￥</span>
                                    <span className='value_value' style={{fontSize: (5-(`${data.value}`).length)*10 + 20 + 'px' }}>{data.value}</span>
                                </div>
                                <div className="text_wrapper" style={{color: data.conditionTextColor}}>
                                    <span className="name">代金券</span><br/>
                                    <span className="condition">{data.contition}</span>
                                </div>
                            </div>
                            <div className="voucher_button" style={{
                                background: data.buttonColor,
                                color: data.buttonTextColor
                            }}>立即领取</div>
                        </div>
                    </a>
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
            <img src='http://localhost:7003/img/pro/voucher1.png' width='150'/>
        </Menu.Item>
    )
}

