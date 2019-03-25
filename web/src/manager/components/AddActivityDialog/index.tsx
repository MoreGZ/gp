import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Modal, Radio, Row, Col, Tag, DatePicker } from 'antd'
import * as _ from 'lodash'

const FormItem = Form.Item
const Search = Input.Search
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group;

@hot(module)
class Activity extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            isDialogVisible: false,
            isLoading: true,
            addDialogBaseFields: {},
            addDialogConfigs: [],
            filterFields: {},
            pagination: {
                size: 'small',
                pageSize: 10,
                current: 1,
                total: 50
            }
        }
    }

    columns = [{
        title: '活动id',
        dataIndex: 'id',
        key: 'id',
        }, {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
        }, {
        title: '活动时间',
        dataIndex: 'time',
        key: 'time',
        }, {
        title: '活动创建人',
        dataIndex: 'creator',
        key: 'creator',
        }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
    }];

    

    componentDidMount() {
    }

    render() {
        const { form, visible, onCancel, onSubmit, isUpdate=false } = this.props
        const { getFieldDecorator } = form

        const radioOption = [
            { label: '上线', value: 1 },
            { label: '下线', value: 0 },
        ];

        return (
            <Modal
                onCancel={onCancel}
                visible={visible}
                title='添加活动'
                onOk={onSubmit}
            >
                <Form>
                    <Row gutter={24}>
                        <Col span={6}></Col>
                        <Col span={12}>
                            <FormItem className='input_item' label='活动名称'> 
                            {
                                getFieldDecorator('name', { rules: [{ required: true, message: '请填写用户名' }] })(
                                    <Input 
                                        className='input'
                                    />
                                )
                            }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}></Col>
                        <Col span={12}>
                            <FormItem className='input_item' label='活动时间'>
                            {
                                getFieldDecorator('date', { rules: [{ required: true, message: '请填写密码' }] })(
                                    <RangePicker
                                    />
                                )
                            }
                            </FormItem>
                        </Col>
                    </Row>
                    {
                        isUpdate &&
                        <Row gutter={24}>
                            <Col span={6}></Col>
                            <Col span={12}>
                                <FormItem className='input_item' label='活动是否上线'>
                                {
                                    getFieldDecorator('status', { rules: [{ required: true, message: '请填写密码' }] })(
                                        <RadioGroup>
                                        {
                                            _.map(radioOption, (item, index) => {
                                                return <Radio value={item.value} key={index}>{item.label}</Radio>
                                            })
                                        }
                                        </RadioGroup>
                                    )
                                }
                                </FormItem>
                            </Col>
                        </Row>
                    }
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
})(Activity);