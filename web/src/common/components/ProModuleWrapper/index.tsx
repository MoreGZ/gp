import * as React from 'react'
import { Button, Icon } from 'antd'
import './index.less'

export default class ProModuleWrapper extends React.Component<any, any> {
    render() {
        const {onDelete, onUp, onDown, onClick } = this.props

        return (
            <div className="module_wrapper">
            <div onClick={onClick}>
            {
                ...this.props.children
            }
            </div>
                <div className='right_top_btns'>
                    <Button shape='circle' onClick={onUp}><Icon type='arrow-up'/></Button>
                    <Button shape='circle' onClick={onDown}><Icon type='arrow-down'/></Button>
                    <Button shape='circle' onClick={onDelete} type="danger"><Icon type='close'/></Button>
                </div>
            </div>
        )
    }
}