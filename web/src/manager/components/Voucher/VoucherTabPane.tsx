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
            isDialogVisible: false,
            isLoading: true,
            editId: undefined,
            filterFields: {},
            goodList: new Array(),
            dialogFormFields: {},
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
            dataIndex: 'scenes',
            key: 'scenes',
            render: (value: any, record: any) => {
                const map = [
                    '',
                    '通用代金券',
                    '品类代金券',
                    '商品代金券'
                ]
                return map[value]
            }
        }, 
        {
            title: '门槛',
            dataIndex: 'threshold',
            key: 'threshold',
        }, 
        {
            title: '面值',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: '有效期',
            dataIndex: 'date',
            key: 'date',
            render: (value: any, record: any) => {
                return `${record.period_start} - ${record.period_end}`
            }
        },
        {
            title: '总量',
            dataIndex: 'num',
            key: 'num',
        },
        {
            title: '已领取',
            dataIndex: 'use_num',
            key: 'use_num',
        },
        {
            title: '已使用',
            dataIndex: 'received_num',
            key: 'received_num',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (value: any, record: any) => {
                return value === 1 ? '启用' : '不启用'
            }
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        // {
        //     title: '更新时间',
        //     dataIndex: 'update_time',
        //     key: 'update_time',
        // },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (value: any, record: any, index: number) => {
                return <span>
                    <Popconfirm title='确定删除此商品？' onConfirm={() => {this.deleteVoucher(record.id)}} okText="删除" cancelText="取消">
                        <a href="javascript:;" className='mr15'>删除</a>
                    </Popconfirm>
                    <a href="javascript:;" onClick={this.handleClickEditBtn.bind(this, record)}>修改</a>
                </span>
            }
        }
    ];

    fetchGoodList() {
        const { filterFields, pagination } = this.state

        const data = {
            ..._.mapValues(filterFields, (value) => value.value),
            page_index: pagination.current,
            page_size: pagination.pageSize,
        }

        this.setState({
            isLoading: true
        }, () => {
            GoodApi.list(data).then(res => {
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

    fetchVoucher() {
        const { pagination } = this.state

        const data = {
            page_index: pagination.current,
            page_size: pagination.pageSize,
            activity_id: this.props.activity_id
        }

        this.setState({
            isLoading: true
        }, () => {
            VoucherApi.list(data).then(res => {
                const { data: {list, total} } = res;
                this.setState({
                    listData: list,
                    pagination: {
                        ...this.state.pagination,
                        total: total
                    }
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

    deleteVoucher(voucher_id: number) {
        this.setState({
            isLoading: true
        }, () => {
            VoucherApi.delete({
                voucher_id: voucher_id,
            }).then(res => {
                message.success('删除成功')
                this.fetchVoucher()
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

    updateVoucher() {
        const { form } = this.props
        const { editId } = this.state
        form.validateFields((errors: any, values: any) => {
            if(errors) {
                return false
            }

            const data = {
                id: editId,
                name: values.name,
                threshold: values.threshold,
                value: values.value,
                period_start: values.period[0].format('YYYY-MM-DD hh:mm:ss'),
                period_end: values.period[1].format('YYYY-MM-DD hh:mm:ss'),
                num: values.num,
                use_num: values.use_num,
                received_num: values.received_num,
                status: values.status ? 1 : 0,
                scenes: values.scenes,
                category_id: values.category_id,
                goods: values.goods,
                activity_id: +this.props.activity_id
            }

            this.setState({
                isLoading: true,
                isDialogVisible: false,
            }, () => {
                VoucherApi.update(data).then((res) => {
                    message.success('修改成功')
                    this.fetchVoucher()
                }).catch((err) => {
                    message.error(`修改失败：${err.message}`)
                }).finally(() => {
                    this.setState({
                        isLoading: false,
                        editId: undefined,
                        dialogFormFields: {}
                    })
                })
            })
        })
    }

    handleClickEditBtn(record: any) {
        this.setState({
            dialogFormFields: {
                id: record.id,
                name: record.name,
                threshold: record.threshold,
                value: record.value,
                period: [moment(record.period_start), moment(record.period_end)],
                num: record.num,
                use_num: record.use_num,
                received_num: record.received_num,
                status: record.status ? 1 : 0,
                scenes: record.scenes,
                category_id: record.category_id,
                goods: record.goods,
                activity_id: this.props.activity_id
            },
            isDialogVisible: true,
            editId: record.id
        })
    }

    handleDialogSubmit() {
        const { editId } = this.state
        if(!editId) {
            this.addVoucher()
        }else {
            this.updateVoucher()
        }
    }

    handleChangeList(pagination: any) {
        this.setState({
            pagination: pagination
        }, () => {
            this.fetchVoucher()
        })
    }

    addVoucher() {
        const { form } = this.props
        form.validateFields((errors: any, values: any) => {
            if(errors) {
                return false
            }
            console.log(values.category_id)
            const data = {
                name: values.name,
                threshold: values.threshold,
                value: values.value,
                period_start: values.period[0].format('YYYY-MM-DD hh:mm:ss'),
                period_end: values.period[1].format('YYYY-MM-DD hh:mm:ss'),
                num: values.num,
                use_num: values.use_num,
                received_num: values.received_num,
                status: values.status ? 1 : 0,
                scenes: values.scenes,
                category_id: values.category_id,
                goods: values.goods,
                activity_id: +this.props.activity_id
            }
            console.log(data)
            
            this.setState({
                isLoading: true,
                isDialogVisible: false
            }, () => {
                VoucherApi.add(data).then((res) => {
                    message.success('添加成功')
                    this.fetchVoucher()
                }).catch((err) => {
                    message.error(`添加失败：${err.message}`)
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                })
            })
        })
    }

    componentDidMount() {
        this.fetchVoucher()
        this.fetchCategory()
        this.fetchGoodList()
    }

    render() {
        const { pagination, isDialogVisible, category, goodList, dialogFormFields, listData} = this.state;
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
                    <Table 
                    columns={this.columns} 
                    pagination={pagination} 
                    dataSource={listData}
                    onChange={this.handleChangeList.bind(this)}
                    rowKey='id'></Table>
                </div>
                {
                    isDialogVisible &&
                    <Modal
                        onCancel={() => { this.setState({isDialogVisible: false, editId: undefined, dialogFormFields: {}}) }}
                        visible={isDialogVisible}
                        width={770}
                        bodyStyle={{padding: '45px'}}
                        className='add_voucher_dialog'
                        footer={false}
                    >
                        <Form>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <FormItem className='input_item' label='代金券名称'> 
                                    {
                                        getFieldDecorator('name', { 
                                            rules: [{ required: true, message: '请填写活动名称' }],
                                            initialValue: dialogFormFields.name,
                                        })(
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
                                        getFieldDecorator('period', { 
                                            rules: [{ required: true, message: '请选择有效期' }],
                                            initialValue: dialogFormFields.period,
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
                                            initialValue: dialogFormFields.scenes,
                                        })(
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
                                            getFieldDecorator('category_id', { 
                                                rules: [{ required: true, message: '请选择类别' }],
                                                initialValue: dialogFormFields.category_id,
                                            })(
                                                <Select 
                                                className='input'
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
                                                initialValue: dialogFormFields.goods,
                                            })(
                                                <Select 
                                                className='input'
                                                mode='multiple'
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
                                            initialValue: dialogFormFields.num,
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
                                            initialValue: dialogFormFields.threshold,
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
                                            initialValue: dialogFormFields.status === 1 ? true : false,
                                        })(
                                            <Switch defaultChecked={dialogFormFields.status === 1 ? true : false}/>
                                        )
                                    }
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem className='input_item' label='面值'>
                                    {
                                        getFieldDecorator('value', { 
                                            rules: [{ required: true, message: '请填写面值' }],
                                            initialValue: dialogFormFields.value
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

export default Form.create({})(Activity);