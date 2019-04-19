import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, 
    Form, Select, Icon, Modal, Radio, Row, Col, Tag, message, Popconfirm, InputNumber, Switch, DatePicker  } from 'antd'
import { GoodApi, VoucherApi } from '../../services/api'
import AddGoodDialog from '../Good/AddGoodDialog'
import './style.less'
import * as _ from 'lodash'
import * as moment from 'moment'
import { withRouter } from "react-router";

const FormItem = Form.Item
const Search = Input.Search 
const Rangepicker = DatePicker.RangePicker
const RadioGroup = Radio.Group;
const Option = Select.Option

@hot(module)
class Activity extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            goodList: [],
            category: []
        }
    }

    fetchGoodList() {
        this.setState({
            isLoading: true
        }, () => {
            GoodApi.list({
                page_index: 1,
                page_size: 12,
            }).then(res => {
                const { data: {list} } = res;
                this.setState({
                    goodList: _.map(list, (value) => ({value: value.id, label: value.name}))
                })
            }).catch((error) => {
                message.error(error.message)
                throw error
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    fetchCategory() {
        this.setState({
            isLoading: true
        }, () => {
            GoodApi.listCategory({}).then(res => {
                const { data: {list} } = res;
                this.setState({
                    category: _.map(list, (value) => ({value: value.id, label: value.name}))
                })
            }).catch((error) => {
                message.error(error.message)
                throw error
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }


    componentDidMount() {
        this.fetchCategory()
        this.fetchGoodList()
    }

    render() {
        const { category, goodList, dialogFormFields} = this.state;
        const { form } = this.props
        const { getFieldDecorator } = form
        
        const scenesOption = [
            { label: '通用代金券', value: 1 },
            { label: '品类代金券', value: 2 },
            { label: '商品代金券', value: 3 },
        ];

        return (
            <Form>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem className='input_item' label='代金券名称'> 
                        {
                            getFieldDecorator('name', { 
                                rules: [{ required: true, message: '请填写活动名称' }],
                            })(
                                <Input
                                    className='input'
                                    style={{width: '260px'}}
                                />
                            )
                        }
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem className='input_item' label='有效期'> 
                        {
                            getFieldDecorator('period', { 
                                rules: [{ required: true, message: '请选择有效期' }],
                            })(
                                <Rangepicker style={{width: '260px'}}></Rangepicker>
                            )
                        }
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem className='input_item' label='代金券类别'>
                        {
                            getFieldDecorator('scenes', { 
                                rules: [{ required: true, message: '请选择类别' }],
                            })(
                                <Select 
                                className='input'
                                style={{width: '260px'}}
                                >
                                {
                                    _.map(scenesOption, (item, index) => {
                                        return <Option key={index} value={item.value}>{item.label}</Option>
                                    })
                                }
                                </Select>
                            )
                        }
                        </FormItem>
                    </Col>
                    {
                        this.props.form.getFieldValue('scenes') === 2 &&
                        <Col span={12}>
                            <FormItem className='input_item' label='适用商品类别'>
                            {
                                getFieldDecorator('category_id', { 
                                    rules: [{ required: true, message: '请选择类别' }],
                                })(
                                    <Select 
                                    className='input'
                                    style={{width: '260px'}}
                                    >
                                    {
                                        _.map(category, (item, index) => {
                                            return <Option key={index} value={item.value}>{item.label}</Option>
                                        })
                                    }
                                    </Select>
                                )
                            }
                            </FormItem>
                        </Col>
                    }
                    {
                        this.props.form.getFieldValue('scenes') === 3 &&
                        <Col span={12}>
                            <FormItem className='input_item' label='适用商品'>
                            {
                                getFieldDecorator('goods', { 
                                    rules: [{ required: true, essage: '请选择类别', type: 'array' }],
                                })(
                                    <Select 
                                    className='input'
                                    mode='multiple'
                                    style={{width: '260px'}}
                                    >
                                    {
                                        _.map(goodList, (item, index) => {
                                            return <Option key={index} value={item.value}>{item.label}</Option>
                                        })
                                    }
                                    </Select>
                                )
                            }
                            </FormItem>
                        </Col>
                    }
                    <Col span={12}>
                        <FormItem className='input_item' label='总量'>
                        {
                            getFieldDecorator('num', { 
                                rules: [{ required: true, message: '请填写总量' }],
                            })(
                                <InputNumber
                                    className='input'
                                />
                            )
                        }
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem className='input_item' label='门槛'>
                        {
                            getFieldDecorator('threshold', { 
                                rules: [{ required: true, message: '请填写门槛' }],
                            })(
                                <InputNumber
                                    className='input'
                                />
                            )
                        }
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem className='input_item' label='状态'>
                        {
                            getFieldDecorator('status', { 
                                rules: [{ required: true, message: '请填写状态' }],
                            })(
                                <Switch/>
                            )
                        }
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem className='input_item' label='面值'>
                        {
                            getFieldDecorator('value', { 
                                rules: [{ required: true, message: '请填写面值' }],
                            })(
                                <InputNumber
                                    className='value'
                                />
                            )
                        }
                        </FormItem>
                    </Col>
                </Row>
            </Form>
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
})(Activity);