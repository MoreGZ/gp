import * as React from "react"
import { hot } from 'react-hot-loader'
import { Link } from 'react-router-dom'
import { Input, Button, Table, Card, Form, Select, Icon, Modal, Radio, Row, Col, Tag, message, Spin, Popconfirm } from 'antd'
import AddActivityDialog from '../../components/AddActivityDialog'
import { ActivityApi } from '../../services/api'
import './style.less'
import * as _ from 'lodash'

const FormItem = Form.Item
const Search = Input.Search
const RadioGroup = Radio.Group;

// @hot(module)
class Activity extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            isDialogVisible: false,
            isLoading: true,
            dialogFormFields: {},
            searchInput: '',
            listData: [],
            pagination: {
                size: 'small',
                pageSize: 10,
                current: 1,
                total: 0
            }
        }
    }

    columns = [{
        title: '活动id',
        dataIndex: 'id',
        key: 'id',
        render: (value: any, record: any, index: number) => {
            return <Link to={`/activity/detail/${value}`}>{value}</Link>
        }
        }, {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
        }, {
        title: '活动时间',
        dataIndex: 'time',
        key: 'time',
        render: (value: any, record: any, index: number) => {
            return `${record.begin_date} ~ ${record.end_date}`
        }
        }, {
        title: '活动创建人',
        dataIndex: 'creator',
        key: 'creator',
        render: () => '_'
        }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (value: any, record: any, index: number) => {
            return <span>
                <Popconfirm title='确定删除此商品？' onConfirm={() => {this.deleteActivity(record.id)}} okText="删除" cancelText="取消">
                    <a href="javascripts:;" className='mr15'>删除</a>
                </Popconfirm>
                <Link to={`/activity/detail/${record.id}`}>详情</Link>
            </span>
        }
    }];

    fetchActivityList() {
        const { pagination, searchInput } = this.state
        const data = {
            name: searchInput,
            page_index: pagination.current,
            page_size: pagination.pageSize
        }

        this.setState({
            isLoading: true
        }, () => {
            ActivityApi.list(data).then(res => {
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

    deleteActivity(activity_id: number) {
        this.setState({
            isLoading: true
        }, () => {
            ActivityApi.delete({activity_id}).then(res => {
                message.success('删除活动成功')
                this.fetchActivityList()
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

    handleDialogCancel() {
        this.setState({
            dialogFormFields: {},
            isDialogVisible: false
        })
    }

    handleDialogChange(allFields: any) {
        this.setState({
            dialogFormFields: allFields
        })
    }

    handleSearch() {
        this.setState({
            pagination: {
                ...this.state.pagination,
                current: 1
            }
        }, () => {
            this.fetchActivityList()
        })
    }

    handleDialogSubmit() {
        const { dialogFormFields } = this.state
        const data = {
            name: dialogFormFields.name.value,
            begin_date: dialogFormFields.date.value[0].format('YYYY-MM-DD hh:mm:ss'),
            end_date: dialogFormFields.date.value[1].format('YYYY-MM-DD hh:mm:ss')
        }
        this.setState({
            isLoading: true
        }, () => {
            ActivityApi.add(data).then((res) => {
                message.success('添加商品成功')
                this.fetchActivityList()
                this.setState({
                    dialogFormFields: {},
                    isDialogVisible: false
                })
            }).catch((err) => {
                message.error(err.message)
                throw err
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    componentDidMount() {
        this.fetchActivityList();
    }

    render() {
        const { pagination, isDialogVisible, dialogFormFields, listData, isLoading} = this.state;

        return (
            <div className='container activity_container'>
                <div className="container_header">
                    <Form layout="inline">
                        <FormItem>
                            <Search 
                            className='search_input' 
                            style={{width: 220, display: 'inline-block'}}
                            onChange={(e) => {this.setState({searchInput: e.target.value})}}
                            onBlur={this.handleSearch.bind(this)}></Search>
                        </FormItem>
                        <FormItem className='inline_item'>
                            <Button type='primary' className='btn' onClick={() => { this.setState({isDialogVisible: true}) }}>
                                <Icon type='plus'/>添加活动
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="container_body">
                    <Spin spinning={isLoading}>
                        <Card title={<span><Icon type='caret-right' className='title_arrow'></Icon>活动列表</span>}>
                            <Table 
                            columns={this.columns} 
                            pagination={pagination}
                            dataSource={listData}></Table>
                        </Card>
                    </Spin>
                </div>
                <AddActivityDialog
                    onCancel={this.handleDialogCancel.bind(this)}
                    visible={isDialogVisible}
                    formFields={dialogFormFields}
                    onChange={this.handleDialogChange.bind(this)}
                    onSubmit={this.handleDialogSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default Form.create({

})(Activity);