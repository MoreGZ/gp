import * as React from "react"
import { hot } from 'react-hot-loader'
import { InputNumber, Button, Form, Select, Icon, message, Upload, Row, Col, Tag, Modal } from 'antd'
import './style.less'
import { GoodApi } from '../../services/api'
import * as _ from 'lodash'

const FormItem = Form.Item
const Option = Select.Option
// const TextArea = Input.TextArea

@hot(module)
class SubGoodEditDialog extends React.Component<any, any> {
    normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const { form, category, visible, onOk, onCancel } = this.props
        const { getFieldDecorator } = form
        return (
            <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
            width="300px"
            >
                <Form className='form'>
                    <FormItem label='原价'>
                    {
                        getFieldDecorator('original_price', { rules: [{ required: true, message: '请填写子商品原价' }] })(
                            <InputNumber 
                                className='input'
                                style={{width: '250px'}}
                            />
                        )
                    }
                    </FormItem>
                    <FormItem label='活动价'>
                    {
                        getFieldDecorator('activity_price', { rules: [{ required: true, message: '请填写子商品活动价格' }] })(
                            <InputNumber 
                                className='input'
                                style={{width: '250px'}}
                            />
                        )
                    }
                    </FormItem>
                    <FormItem label='库存'>
                    {
                        getFieldDecorator('count', { rules: [{ required: true, message: '请填写子商品库存' }] })(
                            <InputNumber 
                                className='input'
                                style={{width: '250px'}}
                            />
                        )
                    }
                    </FormItem>
                </Form>
            </Modal>
            
        );
    }
}

export default Form.create({
    mapPropsToFields(props: any) {
        const {formFields} = props;

        return _.mapValues(formFields, (value, key) => {
            return Form.createFormField(value)
        })
    },
    onFieldsChange(props: any, fields: object, allFields: any, add: string) {
        props.onChange(allFields)
    }
})(SubGoodEditDialog)