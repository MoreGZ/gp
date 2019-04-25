import * as React from 'react'
import { Menu } from 'antd'
import * as _ from 'lodash'
import config from './config'

export class Module extends React.Component<any, any> {
    render () {
        const { moduleInfo, isEdit=false } = this.props
        const href = moduleInfo.values.link && !isEdit ? moduleInfo.values.link : 'javascript:;'
        return (
            <div style={{textAlign: 'center'}}>
                <a href={href} target='_blank'>
                    <img 
                    src={moduleInfo.values.photoUrl} 
                    alt="" 
                    width={moduleInfo.photoWidth} 
                    height={moduleInfo.photoHeight}
                    />
                </a>
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
        key='photo_1' 
        style={{height: 'auto', paddingLeft: '20px', position: 'relative', right: '24px', textAlign: 'center'}} 
        className='img-menu-item'
        {...props}
        onClick={() => { onClick( _.extend({}, config) ) }}
        >
            <img src='http://localhost:7003/img/pro/photo1.png' width='150'/>
        </Menu.Item>
    )
}