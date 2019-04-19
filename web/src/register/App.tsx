import * as React from "react"
import { hot } from 'react-hot-loader'
import { message } from 'antd'
import RegisterBox, { FormFields } from './components/RegisterBox'
import { UserApi } from './services/api'
import './style.less'
import * as _ from 'lodash';

interface AppState {
    boxType: 'login' | 'register';
    isLoading: boolean,
    formFields: FormFields
}

@hot(module)
export default class extends React.Component<{}, AppState>{
    
    constructor(props: {}) {
        super(props)

        this.state = {
            boxType: 'login',
            isLoading: false,
            formFields: {}
        }
    }

    handleToLoginPage() {
        location.replace('/login')
    }

    handleClickRegister() {
        const { formFields } = this.state
        const data = _.mapValues(formFields, (value) => value.value)

        this.setState({
            isLoading: true
        }, () => {
            UserApi.register(data).then((res) => {
                message.success('注册成功')

                location.replace('./login')
            }).catch((error) => {    
                message.error(`注册失败：${error.message}`)
                throw error
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    handleInputChange(fields: any) {
        this.setState({
            formFields: fields
        })
    }

    render() {
        const { isLoading, formFields } = this.state; 
        return (
            <div className='register_page'>
                <RegisterBox 
                    isLoading={isLoading}
                    formFields={formFields}
                    onInput={this.handleInputChange.bind(this)}
                    onRegister={this.handleClickRegister.bind(this)}
                    onToLoginPage={this.handleToLoginPage.bind(this)}
                />
            </div>
        );
    }
}