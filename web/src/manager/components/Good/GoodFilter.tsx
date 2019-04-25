
import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Modal, Upload, Row, Col, Tag, message, Tooltip, Spin } from 'antd'
import * as _ from 'lodash'
import { any } from "prop-types";

const FormItem = Form.Item
const Option = Select.Option

@hot(module)
class GoodFilter extends React.Component<any, any> {
    handleFilter() {
        const { onFilter, form } = this.props

        if(onFilter) {
            onFilter(form.getFieldsValue())
        }
    }

    render() {
        const { onFilter, category } = this.props
        const {getFieldDecorator} = this.props.form

        return (
            <Form layout="inline" className='form'>
                <FormItem>
                {
                    getFieldDecorator('name')(
                        <Input placeholder='商品名称' className='input'></Input>
                    )
                } 
                </FormItem>
                <FormItem>
                {
                    getFieldDecorator('id')(
                        <Input placeholder='商品id' className='input'></Input>
                    )
                }
                </FormItem>
                <FormItem>
                {
                    getFieldDecorator('category')(
                        <Select placeholder='分类' className='select'>
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
                    <Button type='primary' onClick={onFilter}>筛选</Button>
                </FormItem>
            </Form>
        )
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
})(GoodFilter)