import * as React from 'react'
import { Menu } from 'antd'
import * as _ from 'lodash'
import config from './config'
import util from '@common/libs/util'
import './style.less'

export class Module extends React.Component<any, any> {
    componentDidMount() {
        document.title = '活动页面'
    }

    render () {
        const { moduleInfo, onClick, isEdit=false } = this.props
        const moduleInfoValues = moduleInfo.values
        let href = isEdit ? 'javascript:;' : `/act/buy/${moduleInfoValues.bindGood ? moduleInfoValues.bindGood.id : ''}`

        return (
            <div className='good_module_content1'>
                {
                    moduleInfo.float == 'left'
                    ? (
                        <div className="editable_good1" style={{color: moduleInfoValues.bcColor}}>
                            <div className="img_wrapper" style={{
                                backgroundImage: `url('${moduleInfoValues.coverImg}')`,
                            }}>
                            </div>
                            <div className="content_right ml45">
                                <div className="good_info">
                                    <p className="name" style={{color: moduleInfoValues.nameColor}}>{moduleInfoValues.name}</p>
                                    <p className="desc" style={{color: moduleInfoValues.descColor}}>{moduleInfoValues.desc}</p>
                                </div>
                                <div className="good_price" style={{color: moduleInfoValues.priceColor}}>
                                    <p className="price">原价￥{moduleInfoValues.price}</p>
                                    <p className="activity_price">抢购价￥{moduleInfoValues.activityPrice}</p>
                                </div>
                                <a target='_blank' href={href} className="button" style={{color: moduleInfoValues.buttonTextColor, backgroundColor: moduleInfoValues.buttonColor}}>立即抢购</a>
                            </div>
                        </div>
                    )
                    : (
                        <div className="editable_good1" style={{color: moduleInfoValues.bcColor}}>
                            <div className="content_right mr45">
                                <div className="good_info">
                                    <p className="name" style={{color: moduleInfoValues.nameColor}}>{moduleInfoValues.name}</p>
                                    <p className="desc" style={{color: moduleInfoValues.descColor}}>{moduleInfoValues.desc}</p>
                                </div>
                                <div className="good_price" style={{color: moduleInfoValues.priceColor}}>
                                    <p className="price">原价￥{moduleInfoValues.price}</p>
                                    <p className="activity_price">抢购价￥{moduleInfoValues.activityPrice}</p>
                                </div>
                                <a target='_blank' href={href} className="button" style={{color: moduleInfoValues.buttonTextColor, backgroundColor: moduleInfoValues.buttonColor}}>立即抢购</a>
                            </div>
                            <div className="img_wrapper" style={{
                                backgroundImage: `url('${moduleInfoValues.coverImg}')`
                            }}>
                            </div>
                        </div>
                    )
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
            <img src='http://localhost:7003/img/pro/good1.png' width='150'/>
        </Menu.Item>
    )
}