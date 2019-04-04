import * as React from 'react'
import { Input } from 'antd';


export default class extends React.Component<any, any>{

    render() {
        const { value, onChange } = this.props
        const ColorIcon = (
            <input 
                type="color" style={{width: '30px', border: 'none', height: '30px'}}  
                onChange={onChange}
                value={value}
            />
        )

        return (
            <Input addonBefore={ColorIcon} value={value} {...this.props}/>
        )
    }
}