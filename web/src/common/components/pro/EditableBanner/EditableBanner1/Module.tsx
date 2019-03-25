import * as React from 'react'
import {Carousel} from 'antd'
import '../index.less'
import * as _ from 'lodash'

export default class EditBanner1 extends React.Component<any, any> {
    render () {
        const { moduleInfo, status, onClick } = this.props

        return (
            <div  className={status == 'edit' ? 'module_wrapper module_editable' : 'module_wrapper'} onClick={onClick}>
                <Carousel>
                {
                    _.map(moduleInfo, (data) => (
                        <a href={status === 'edit' ? 'javascript:;' : (data.link || 'javascripts:;')} target='blank'>
                            <div className='editable_banner1_item' style={{
                                backgroundImage: `url(${data.img})`, 
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}>
                            </div>
                        </a>
                    ))
                }
                </Carousel>
            </div>
            
        )
    }
}