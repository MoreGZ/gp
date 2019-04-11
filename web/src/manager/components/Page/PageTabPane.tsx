import * as React from "react"
import { hot } from 'react-hot-loader'
import { Link } from 'react-router-dom'
import { Input, Button, Table, Card, Form, Popconfirm, Icon, Modal, Radio, Row, Col, Tag, message } from 'antd'
import { PageApi } from '../../services/api'
import AddGoodDialog from '../Good/AddGoodDialog'
import './style.less'
import * as _ from 'lodash'

const FormItem = Form.Item
const Search = Input.Search
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
            dialogFormField: {},
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
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, 
        {
            title: '页面标题',
            dataIndex: 'title',
            key: 'title',
        }, 
        {
            title: '页面状态',
            dataIndex: 'status',
            key: 'status',
            render: (value: any, record: any, index: number) => {
                const map = ['下线', '上线']

                return map[value]
            },
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '更新时间',
            dataIndex: 'update_time',
            key: 'update_time',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (value: any, record: any, index: number) => {
                return <span>
                    <Popconfirm title='确定删除此商品？' onConfirm={() => {this.deletePage(record.id)}} okText="删除" cancelText="取消">
                        <a href="javascripts:;" className='mr15'>删除</a>
                    </Popconfirm>
                    <a href="javascripts:;" onClick={this.handleClickEditBtn.bind(this, record)} className='mr15'>修改标题</a>
                    <a href={`http://localhost:7001/page_editor.html#/pro/${record.id}`} target='blank'>编辑</a>
                </span>
            }
        }
    ];

    fetchPageList() {
        const { pagination } = this.state

        const data = {
            page_index: pagination.current,
            page_size: pagination.pageSize,
            activity_id: this.props.activity_id
        }

        this.setState({
            isLoading: true
        }, () => {
            PageApi.list(data).then(res => {
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

    createPage() {
        const { form } = this.props
        form.validateFields((errors: any, values: any) => {
            if(errors) {
                return false
            }
            console.log(values)
            const data = {
                title: values.title,
                activity_id: +this.props.activity_id
            }
            console.log(data)
            
            this.setState({
                isLoading: true,
                isDialogVisible: false,
                dialogFormField: {}
            }, () => {
                PageApi.add(data).then((res) => {
                    message.success('添加成功')
                    this.fetchPageList()
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

    deletePage(page_id: number) {
        this.setState({
            isLoading: true
        }, () => {
            PageApi.delete({
                page_id: page_id,
            }).then(res => {
                message.success('删除成功')
                this.fetchPageList()
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

    updatePage() {
        const { form } = this.props
        form.validateFields((errors: any, values: any) => {
            if(errors) {
                return false
            }

            const data = {
                title: values.title,
                id: +this.state.dialogFormField.id,
            }
            console.log(data)
            
            this.setState({
                isLoading: true,
                isDialogVisible: false,
                dialogFormField: {}
            }, () => {
                PageApi.updateTitle(data).then((res) => {
                    message.success('添加成功')
                    this.fetchPageList()
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
        this.fetchPageList()
    }

    handleDialogSubmit() {
        console.log(this.state.dialogFormField)
        if(!this.state.dialogFormField.id) {
            this.createPage()
        }else {
            this.updatePage()
        }
    }

    handleClickEditBtn(record: any) {
        this.setState({
            isDialogVisible: true,
            dialogFormField: {
                title: record.title,
                id: record.id
            }
        })
    }

    render() {
        const { pagination, isDialogVisible, listData, dialogFormField} = this.state;
        const { form } = this.props
        const { getFieldDecorator } = form

        const radioOption = [
            { label: '上线', value: 'Apple' },
            { label: '下线', value: 'Pear' },
        ];

        return (
            <div className='container activity_container'>
                <div className="container_header">
                    <Form layout="inline">
                        <FormItem className='inline_item'>
                            <Button type='primary' className='btn' onClick={() => { this.setState({isDialogVisible: true, dialogFormField: {}}) }}>
                                <Icon type='plus'/>添加页面
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="container_body">
                    <Table 
                    columns={this.columns} 
                    pagination={pagination}
                    dataSource={listData}></Table>  
                </div>
                {
                    isDialogVisible &&
                    <Modal
                    onCancel={() => { this.setState({isDialogVisible: false}) }}
                    visible={isDialogVisible}
                    title='添加活动'
                    onOk={this.handleDialogSubmit.bind(this)}
                    >
                        <Form>
                            <Row gutter={24}>
                                <Col span={6}></Col>
                                <Col span={12}>
                                    <FormItem className='input_item' label='title'> 
                                    {
                                        getFieldDecorator('title', { 
                                            rules: [{ required: true, message: '请填写用户名' }],
                                            initialValue: dialogFormField.title
                                        })(
                                            <Input 
                                                placeholder='用户名' 
                                                className='input'
                                            />
                                        )
                                    }
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                }
            </div>
        );
    }
}

export default Form.create()(Activity);