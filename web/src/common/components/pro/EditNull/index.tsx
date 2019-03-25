import * as React from 'react'
import './index.less'

export default (props: any) => {
    const { onClick } = props

    return (
        <div 
            className = 'edit_null'
            onClick={ onClick }
        >
            content
        </div>
    )
}