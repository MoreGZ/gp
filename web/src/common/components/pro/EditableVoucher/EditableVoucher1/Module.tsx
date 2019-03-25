import * as React from 'react'
import {Carousel} from 'antd'
import '../index.less'
import * as _ from 'lodash'

export default class EditBanner1 extends React.Component<any, any>{
    render () {
        const { moduleInfo, status, onClick } = this.props

        return (
            <div className={status == 'edit' ? 'module_wrapper module_editable' : 'module_wrapper'} onClick={onClick}>
                <div className='voucher_module_content'>
                {
                    _.map(moduleInfo, (data: any, index: number) => (
                        <a href={status === 'edit' ? 'javascript:;' : `/voucher/${data.bindVoucher.id}`} target='blank'>
                            <div className={index === 3 ? "editable_voucher1" : 'mr30 editable_voucher1'}>
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
            </div>
        )
    }
}