import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Form, Select, Icon, message, Upload, Row, Col, Tag } from 'antd'
import './style.less'
import { GoodApi } from '../../services/api'
import * as _ from 'lodash'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

@hot(module)
class BaseInfoForm extends React.Component<any, any> {
    normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { form, category } = this.props
        const { getFieldDecorator } = form
        return (
            <Form className='form'>
                <div className="form_left">
                    <FormItem label='商品名称'>
                    {
                        getFieldDecorator('name', { rules: [{ required: true, message: '请填写商品名称' }] })(
                            <Input 
                                className='input'
                            />
                        )
                    }
                    </FormItem>
                    <FormItem label='商品类别'>
                    {
                        getFieldDecorator('category', { rules: [{ required: true, message: '选择商品名称' }] })(
                            <Select className='select'>
                            {
                                _.map(category, (item, index) => {
                                    return (
                                        <Option value={item.value} key={index}>{item.label}</Option>
                                    )
                                })
                            }
                            </Select>
                        )
                    }
                    </FormItem>
                    <FormItem>
                    {
                        getFieldDecorator('img', { 
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile
                        })(
                            <Upload action="/upload/img" listType='picture'>
                                <Button className='mt15'><Icon type='upload'></Icon>上传图片</Button>
                            </Upload>
                        )
                    }
                    </FormItem>
                </div>
                <div className="form_right">
                    <FormItem label='商品介绍'>
                    {
                        getFieldDecorator('descp', { rules: [{ required: true, message: '填写商品名称' }] })(
                            <TextArea></TextArea>
                        )
                    }
                    </FormItem>
                </div>
            </Form>
        );
    }
}

export default Form.create({
    mapPropsToFields(props: any) {
        const {formFields} = props;
        console.log(formFields)
        return _.mapValues(formFields, (value, key) => {
            return Form.createFormField(value)
        })
    },
    onFieldsChange(props: any, fields: object, allFields: any, add: string) {
        props.onChange(allFields)
    }
})(BaseInfoForm)