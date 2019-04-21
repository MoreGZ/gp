import * as React from 'react'
import './style.less'
import { Icon } from 'antd'
import * as _ from 'lodash'

export default class CardSelector extends React.Component<any, any> {
    render() {
        const { value=1, onPlus, onMinus, label } = this.props

        return (
            <div className="number_input">
                <div className="cnumber_input_label">
                {label}
                </div>
                <div className="main">
                    <Icon type='minus' style={{fontSize: '8px'}}></Icon>
                    <input type="text" value={value}/>
                    <Icon type='plus' style={{fontSize: '8px'}}></Icon>
                </div>
            </div>
        )
    }
}