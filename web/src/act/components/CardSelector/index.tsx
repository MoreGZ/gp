import * as React from 'react'
import './style.less'
import * as _ from 'lodash'

export default class CardSelector extends React.Component<any, any> {
    render() {
        const { onSelect, options, label } = this.props

        return (
            <div className="card_selector">
                <div className="card_selector_label">
                {label}
                </div>
                <div className="card_selector_options">
                {
                    _.map(options, (option: any, index: any) => {
                        return (
                            <div className='card_selector_option' onClick={() => {onSelect(option.value)}} key={index}>
                            {option.label}
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}