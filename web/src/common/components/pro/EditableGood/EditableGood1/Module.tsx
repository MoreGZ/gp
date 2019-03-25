import * as React from 'react'
import {Carousel} from 'antd'
import '../index.less'
import * as _ from 'lodash'

export default class EditableGood1 extends React.Component<any, any> {
    render () {
        const { moduleInfo, status, onClick, type=0 } = this.props
        
        return (
            <div className={status == 'edit' ? 'module_wrapper module_editable' : 'module_wrapper'} onClick={onClick}>
                <div className='good_module_content'>
                {
                    type == 0 
                    ? (
                        <div className="editable_good1" style={{color: moduleInfo.bcColor}}>
                            <div className="img_wrapper" style={{
                                backgroundImage: moduleInfo.coverImg,
                            }}>
                            </div>
                            <div className="content_right ml45">
                                <div className="good_info">
                                    <p className="name" style={{color: moduleInfo.nameColor}}>{moduleInfo.name}</p>
                                    <p className="desc" style={{color: moduleInfo.descColor}}>{moduleInfo.desc}</p>
                                </div>
                                <div className="good_price" style={{color: moduleInfo.priceColor}}>
                                    <p className="price">原价￥{moduleInfo.price}</p>
                                    <p className="activity_price">抢购价￥{moduleInfo.activityPrice}</p>
                                </div>
                                <a href="" className="button" style={{color: moduleInfo.buttonTextColor, backgroundColor: moduleInfo.buttonColor}}>立即抢购</a>
                            </div>
                        </div>
                    )
                    : (
                        <div className="editable_good1" style={{color: moduleInfo.bcColor}}>
                            <div className="content_right mr45">
                                <div className="good_info">
                                    <p className="name" style={{color: moduleInfo.nameColor}}>{moduleInfo.name}</p>
                                    <p className="desc" style={{color: moduleInfo.descColor}}>{moduleInfo.desc}</p>
                                </div>
                                <div className="good_price" style={{color: moduleInfo.priceColor}}>
                                    <p className="price">原价￥{moduleInfo.price}</p>
                                    <p className="activity_price">抢购价￥{moduleInfo.activityPrice}</p>
                                </div>
                                <a href="" className="button" style={{color: moduleInfo.buttonTextColor, backgroundColor: moduleInfo.buttonColor}}>立即抢购</a>
                            </div>
                            <div className="img_wrapper" style={{
                                backgroundImage: moduleInfo.coverImg,
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