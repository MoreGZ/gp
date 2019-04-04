import * as React from 'react'
import { Menu, Carousel } from 'antd'
import * as _ from 'lodash'
import '../index.less'
import config from './config'

export class Module extends React.Component<any, any> {
    render () {
        const { moduleInfo, onClick } = this.props

        return (
            <div  className={'module_wrapper'} onClick={onClick}>
                <Carousel>
                {
                    _.map(moduleInfo, (data) => (
                        <a href={data.link || 'javascripts:;'} target='blank'>
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
        onClick={() => { onClick( _.extend({}, config) ) }}
        >
            <img src='http://localhost:7003/img/pro/voucher1.png' width='150'/>
        </Menu.Item>
    )
}