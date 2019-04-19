import * as React from 'react';
import * as PropTypes from 'prop-types'
import { Button, Input, Divider, Icon, Form } from 'antd';
import { hot } from 'react-hot-loader'
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item

export interface FormFields{
    username?: any,
    password?: any,
}

interface LoginBoxProps{
    isLoading: boolean,
    formFields: FormFields,
    onInput: (fields: any) => void,
    onLogin: () => void,
    onToRegisterPage: () => void
}

interface LoginBoxFormProps extends FormComponentProps, LoginBoxProps {}

@hot(module)
class LoginBox extends React.Component<LoginBoxFormProps, any>{
    static PropTypes = {
        isLoading: PropTypes.string,
        onInput: PropTypes.func,
        onLogin: PropTypes.func,
        onRegister: PropTypes.func,
        onToLoginPage: PropTypes.func,
        onToRegisterPage: PropTypes.func
    }

    handleSubmit(e: any) {
        e.preventDefault();
        const { onLogin } = this.props
        
        this.props.form.validateFields((err, values) => {
            console.log(err)
            if (err) {
                return
            }

            onLogin()
        });
    }

    render() {
        const { form, isLoading } = this.props
        const { getFieldDecorator } = form

        return (
            <Form className="login_box" onSubmit={this.handleSubmit.bind(this)}>
                <img className='logo' src="http://localhost:7003/img/logo_big.png" alt=""/>
                <p className='title'>电商活动页搭建平台</p>
                <FormItem className='input_item'> 
                {
                    getFieldDecorator('username', { rules: [{ required: true, message: '请填写用户名' }] })(
                        <Input 
                            prefix={<Icon type="user" 
                            style={{ color: '#77654e' }} />} 
                            placeholder='用户名' 
                            className='input'
                        />
                    )
                }
                </FormItem>
                <FormItem className='input_item'>
                {
                    getFieldDecorator('password', { rules: [{ required: true, message: '请填写密码' }] })(
                        <Input 
                            prefix={<Icon type="lock" 
                            style={{ color: '#77654e' }} />} 
                            type='password'
                            placeholder='密码' 
                            className='input'
                        />
                    )
                }
                </FormItem>
                <FormItem>
                    <Button type="primary" className='btn' htmlType="submit" loading={isLoading}>登&nbsp;&nbsp;&nbsp;&nbsp;陆</Button>
                </FormItem>
                
                <div className="divider_box" >
                    <Divider className='divider'>
                        <a href="javascript:;" onClick={this.props.onToRegisterPage}>注册为新用户</a>
                    </Divider>
                </div>
            </Form>
        );
    }
}


export default Form.create<LoginBoxProps>({
    mapPropsToFields(props: LoginBoxProps) {
        return {
            username: Form.createFormField(props.formFields.username),
            password: Form.createFormField(props.formFields.password)
        }
    },
    onFieldsChange(props: LoginBoxProps, fields: object, allFields: any, add: string) {
        props.onInput(allFields)
    }
})(LoginBox);