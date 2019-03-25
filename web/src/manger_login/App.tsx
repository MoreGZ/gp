import * as React from "react"
import { hot } from 'react-hot-loader'
import { message } from 'antd'
import LoginBox, { FormFields } from './components/LoginBox'
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
        this.setState({
            boxType: 'login'
        })
    }

    handleToRegisterPage() {
        this.setState({
            boxType: 'register'
        })
    }

    handleClickLogin() {
        const { formFields } = this.state
        const data = _.mapValues(formFields, (value) => value.value)

        this.setState({
            isLoading: true
        }, () => {
            UserApi.login(data).then((res) => {
                message.success('登陆成功')

                setTimeout(() => {
                    location.replace('./app1.html')
                }, 2000);
            }).catch((err) => {
                message.error(`注册失败：${err.message}`)
                throw err
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
            
        })
    }

    handleClickRegister() {
        const { formFields } = this.state
        const data = _.mapValues(formFields, (value) => value.value)

        this.setState({
            isLoading: true
        }, () => {
            UserApi.register(data).then((res) => {
                message.success('注册成功')

                setTimeout(() => {
                    location.reload()
                }, 2000);
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
        const { boxType, isLoading, formFields } = this.state; 

        return (
            <div className='login_page'>
                <LoginBox 
                    boxType={boxType} 
                    isLoading={isLoading}
                    formFields={formFields}
                    onInput={this.handleInputChange.bind(this)}
                    onLogin={this.handleClickLogin.bind(this)}
                    onRegister={this.handleClickRegister.bind(this)}
                    onToLoginPage={this.handleToLoginPage.bind(this)}
                    onToRegisterPage={this.handleToRegisterPage.bind(this)}
                />
            </div>
        );
    }
}