import * as React from 'react'
import { Menu } from 'antd'
import * as _ from 'lodash'
import config from './config'
import util from '@common/libs/util'
import '../index.less'

export class Module extends React.Component<any, any> {
    render () {
        const { moduleInfo, onClick, type=0 } = this.props
        const moduleInfoValues = moduleInfo.values
        
        return (
            <div className={'module_wrapper'} onClick={onClick}>
                <div className='good_module_content'>
                {
                    moduleInfo.float == 'left'
                    ? (
                        <div className="editable_good1" style={{color: moduleInfoValues.bcColor}}>
                            <div className="img_wrapper" style={{
                                backgroundImage: moduleInfoValues.coverImg,
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
                                <a href="" className="button" style={{color: moduleInfoValues.buttonTextColor, backgroundColor: moduleInfoValues.buttonColor}}>立即抢购</a>
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
                                <a href="" className="button" style={{color: moduleInfoValues.buttonTextColor, backgroundColor: moduleInfoValues.buttonColor}}>立即抢购</a>
                            </div>
                            <div className="img_wrapper" style={{
                                backgroundImage: moduleInfoValues.coverImg,
                            }}>
                            </div>
                        </div>
                    )
                }
                </div>
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