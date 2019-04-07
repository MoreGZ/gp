import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, 
    Form, Select, Icon, Modal, Radio, Row, Col, Tag, message, Popconfirm, InputNumber, Switch, DatePicker  } from 'antd'
import { GoodApi } from '../../services/api'
import AddGoodDialog from '../Good/AddGoodDialog'
import './style.less'
import * as _ from 'lodash'

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
            isDialogVisible: false,
            isLoading: true,
            editId: undefined,
            filterFields: {},
            pagination: {
                size: 'small',
                pageSize: 10,
                current: 1,
                total: 50
            }
        }
    }

    columns = [
        {
            title: '代金券id',
            dataIndex: 'id',
            key: 'id',
        }, 
        {           
            title: '代金券名称',
            dataIndex: 'name',
            key: 'name',
        }, 
        {
            title: '代金券类型',
            dataIndex: 'time',
            key: 'time',
        }, 
        {
            title: '门槛',
            dataIndex: 'creator',
            key: 'creator',
        }, 
        {
            title: '面值',
            dataIndex: 'operation',
            key: 'operation',
        },
        {
            title: '有效期',
            dataIndex: 'operation',
            key: 'operation',
        },
        {
            title: '总量',
            dataIndex: 'operation',
            key: 'operation',
        },
        {
            title: '已领取',
            dataIndex: 'operation',
            key: 'operation',
        },
        {
            title: '已使用',
            dataIndex: 'operation',
            key: 'operation',
        },
        {
            title: '状态',
            dataIndex: 'operation',
            key: 'operation',
        },
        {
            title: '创建时间',
            dataIndex: 'operation',
            key: 'operation',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (value: any, record: any, index: number) => {
                return <span>
                    <Popconfirm title='确定删除此商品？' onConfirm={() => {}} okText="删除" cancelText="取消">
                        <a href="javascripts:;" className='mr15'>删除</a>
                    </Popconfirm>
                    <a href="javascripts:;">详情</a>
                </span>
            }
        }
    ];

    handleClickAddBtn() {
        
    }

    handleClickEditBtn() {

    }

    handleDialogSubmit() {
        const { editId } = this.state
        if(!editId) {
            this.addVoucher()
        }else {
            this.updateVoucher(editId)
        }
    }

    fetchVoucher() {

    }

    deleteVoucher() {
        
    }

    updateVoucher(editId: number) {

    }

    addVoucher() {
        const { form } = this.props
        const fieldsValue = form.getFieldsValue()
        // const data = {
        //     name: 
        // }

        console.log(fieldsValue)
    }

    componentDidMount() {
        this.fetchVoucher()
    }

    render() {
        const { pagination, isDialogVisible, addDialogBaseFields, addDialogConfigs} = this.state;
        const { form } = this.props
        const { getFieldDecorator } = form

        const scenesOption = [
            { label: '通用代金券', value: 1 },
            { label: '品类代金券', value: 2 },
            { label: '商品代金券', value: 3 },
        ];

        return (
            <div className='container activity_container'>
                <div className="container_header">
                    <Form layout="inline">
                        <FormItem className='inline_item'>
                            <Button type='primary' className='btn' onClick={() => { this.setState({isDialogVisible: true}) }}>
                                <Icon type='plus'/>添加代金券
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="container_body">
                    <Table columns={this.columns} pagination={pagination}></Table>
                </div>
                {
                    isDialogVisible &&
                    <Modal
                        onCancel={() => { this.setState({isDialogVisible: false}) }}
                        visible={isDialogVisible}
                        width={770}
                        bodyStyle={{padding: '45px'}}
                        className='add_voucher_dialog'
                        footer={false}
                    >
                        <Form>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <FormItem className='input_item' label='活动名称'> 
                                    {
                                        getFieldDecorator('name', { rules: [{ required: true, message: '请填写活动名称' }] })(
                                            <Input
                                                className='input'
                                            />
                                        )
                                    }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem className='input_item' label='有效期'> 
                                    {
                                        getFieldDecorator('period', { rules: [{ required: true, message: '请选择有效期' }] })(
                                            <Rangepicker style={{width: '260px'}}></Rangepicker>
                                        )
                                    }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem className='input_item' label='代金券类别'>
                                    {
                                        getFieldDecorator('scenes', { rules: [{ required: true, message: '请选择类别' }] })(
                                            <Select 
                                            className='input'
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
                                            getFieldDecorator('cetagory', { rules: [{ required: true, message: '请选择类别' }] })(
                                                <Select 
                                                className='input'
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
                                }
                                {
                                    this.props.form.getFieldValue('scenes') === 3 &&
                                    <Col span={12}>
                                        <FormItem className='input_item' label='适用商品'>
                                        {
                                            getFieldDecorator('goods', { rules: [{ required: true, essage: '请选择类别' }] })(
                                                <Select 
                                                className='input'
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
                                }
                                <Col span={12}>
                                    <FormItem className='input_item' label='总量'>
                                    {
                                        getFieldDecorator('num', { rules: [{ required: true, message: '请填写总量' }] })(
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
                                        getFieldDecorator('threshold', { rules: [{ required: true, message: '请填写门槛' }] })(
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
                                        getFieldDecorator('status', { rules: [{ required: true, message: '请填写状态' }] })(
                                            <Switch 
                                                
                                            />
                                        )
                                    }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem className='input_item' label='面值'>
                                    {
                                        getFieldDecorator('password', { rules: [{ required: true, message: '请填写面值' }] })(
                                            <InputNumber
                                                className='value'
                                            />
                                        )
                                    }
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <div className='sure_btn_box'>
                            <Button 
                            type='primary'
                            className='base_btn sure_btn'
                            onClick={this.handleDialogSubmit.bind(this)}
                            >完成<Icon type='check'></Icon></Button>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
}

export default Form.create({

})(Activity);