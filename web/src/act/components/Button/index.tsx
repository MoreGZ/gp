import * as React from 'react'
import './style.less'
import * as _ from 'lodash'

export default class CardSelector extends React.Component<any, any> {
    render() {
        const { onClick } = this.props

        return (
            <button onClick={onClick} className='buy_button'>
            {
                ...this.props.children
            }
            </button>
        )
    }
}