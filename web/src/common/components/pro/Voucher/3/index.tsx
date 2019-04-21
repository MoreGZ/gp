import * as React from 'react'
import './style.less'
import { Menu } from 'antd'
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
        let href = isEdit ? 'javascripts:;' : '/voucher/${data.bindVoucher.id}'

        return (
            <div className='voucher_module_content3'>
            {
                _.map(moduleInfo.values, (data: any, index: number) => (
                    <a href={href} target='blank'>
                        <div className={index === 3 ? "editable_voucher" : 'mr30 editable_voucher'}>
                            <div className="voucher_info" style={{background: data.infoBgColor}}>
                                <div className="value_wrapper" style={{color: data.valueTextColor}}>
                                    <span className='value'>￥{data.value}</span>
                                    <span className="name">代金券</span><br/>
                                </div>
                                <div className="voucher_button" style={{ color: data.buttonTextColor }}>
                                    <span className="condition">{data.contition}</span>
                                    <span className="button">立即领取 ></span>
                                </div>
                            </div>
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
            <img src='http://localhost:7003/img/pro/voucher3.png' width='150'/>
        </Menu.Item>
    )
}

