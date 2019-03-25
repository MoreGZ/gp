import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Popconfirm, Upload, Row, Col, Tag, message, Tooltip, Spin } from 'antd'
import { GoodApi } from '../../services/api'
import AddGoodDialog from '../../components/AddGoodDialog'
import GoodFilter from '../../components/Filter/good'
import {Link} from 'react-router-dom'
import './style.less'
import * as _ from 'lodash'
import { any } from "prop-types";

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

@hot(module)
export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            isDialogVisible: false,
            isLoading: true,
            addDialogBaseFields: {},
            addDialogConfigs: [],
            filterFields: {},
            listData: [],
            category: [],
            pagination: {
                size: 'small',
                pageSize: 10,
                current: 1,
                total: 0
            }
        }
    }

    columns = [{
        title: '商品id',
        dataIndex: 'id',
        key: 'id',
        render: (value: any, record: any, index: number) => {
            return <Link to={`/good/detail/${value}`}>{value}</Link>
        }
        }, {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        }, {
        title: '商品类别',
        dataIndex: 'category',
        key: 'category',
        }, {
        title: '商品配置',
        dataIndex: 'config',
        key: 'config',
        render(value: any, record: any, index: number) {
            
            return _.map(value, (item, index) => {
                return (
                    <Tooltip placement="topLeft" title={item.value.join(', ')}>
                        <Tag>{item.name}</Tag>
                    </Tooltip>
                )
            })
        }
        }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (value: any, record: any, index: number) => {
            return <span>
                <Popconfirm title='确定删除此商品？' onConfirm={() => {this.deleteGood(record.id)}} okText="删除" cancelText="取消">
                    <a href="javascripts:;" className='mr15'>删除</a>
                </Popconfirm>
                <Link to={`/good/detail/${record.id}`}>详情</Link>
            </span>
        }
    }];

    fetchGoodList() {
        const { filterFields, pagination } = this.state
        const data = {
            ..._.mapValues(filterFields, (value) => value.value),
            page_index: pagination.current,
            page_size: pagination.pageSize
        }

        this.setState({
            isLoading: true
        }, () => {
            GoodApi.list(data).then(res => {
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

    fetchCategory() {
        this.setState({
            isLoading: true
        }, () => {
            GoodApi.listCategory({}).then(res => {
                const { data: {list} } = res;
                this.setState({
                    category: _.map(list, (value) => ({value: value.name, label: value.name}))
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

    deleteGood(good_id: number) {
        this.setState({
            isLoading: true
        }, () => {
            GoodApi.delete({good_id}).then(res => {
                message.success('删除商品成功')
                this.fetchGoodList()
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

    handleFilterChange(fields: any) {
        console.log(fields)
        this.setState({
            filterFields: fields
        })
    }

    handleFilter() {
        this.setState({
            pagination: {
                ...this.state.pagination,
                current: 1
            }
        }, () => {
            this.fetchGoodList()
        })
    }
    
    handleChangePage(pagination: any) {
        this.setState({
            pagination: pagination
        }, () => {
            this.fetchGoodList()
        })
    }

    handleDialogSubmit() {
        const {addDialogBaseFields, addDialogConfigs} = this.state;
        const data = {
            ..._.mapValues(addDialogBaseFields, (value) => value.value),
            config: _.map(addDialogConfigs, (value, index) => ({name: value.name, value: value.value})),
            img: new Array,
        }
        console.log(data);

        this.setState({
            isLoading: true
        }, () => {
            GoodApi.add(data).then((res) => {
                message.success('添加商品成功')
                this.fetchGoodList()
                this.setState({
                    addDialogConfigs: {},
                    addDialogBaseFields: [],
                    isDialogVisible: false
                })
            }).catch((err) => {
                message.error(err.message)
                throw err
            }).finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
        })
    }

    handleDialogBaseFieldChange(fields: any) {
        this.setState({
            addDialogBaseFields: fields
        })
    }

    handleUpload() {

    }

    handleChangeConfigName(value: string, index: number) {
        const { addDialogConfigs } = this.state
        addDialogConfigs[index].name = value

        this.setState({
            addDialogConfigs
        })
    }

    handleAddConfig() {
        this.setState((preState: any) => {
            return {
                addDialogConfigs: preState.addDialogConfigs.concat([{
                    name: '',
                    itemInput: '',
                    value: []
                }])
            }
        }, () => {
            console.log(this.state.addDialogConfigs)
        })
    }

    handleItemInputChange(value: string, index: number) {
        const { addDialogConfigs } = this.state
        addDialogConfigs[index].itemInput = value

        this.setState({
            addDialogConfigs
        })
    }

    handleDeleteConfig(index: number) {
        this.setState((preState: any) => {
            _.remove(preState.addDialogConfigs, (value, i) => {
                return index === i
            })
            return {
                addDialogConfigs: preState.addDialogConfigs
            }
        })
    }

    handleAddConfigItem(index: number) {
        const { addDialogConfigs } = this.state

        if(!addDialogConfigs[index].itemInput) {
            return
        }
        this.setState((preState: any) => {
            preState.addDialogConfigs[index].value.push(preState.addDialogConfigs[index].itemInput)
            preState.addDialogConfigs[index].itemInput = ''
            return {
                addDialogConfigs: preState.addDialogConfigs
            }
        })
    }

    handleDelectConfigItem(index: number, subIndex: number) {
        this.setState((preState: any) => {
            _.remove(preState.addDialogConfigs[index].value, (value, i) => {
                console.log(i, subIndex)
                return subIndex === i
            })
            return {
                addDialogConfigs: preState.addDialogConfigs
            }
        })
    }

    componentDidMount() {
        this.fetchGoodList()
        this.fetchCategory()
    }

    render() {
        const { pagination, isDialogVisible, addDialogBaseFields, addDialogConfigs, listData, isLoading, filterFields, category } = this.state;
        
        return (
            <div className='container good_container'>
                <div className="container_header">
                    <FormItem className='inline_item'>
                            <Button type='primary' className='btn' onClick={() => { this.setState({isDialogVisible: true}) }}>
                                <Icon type='plus'/>添加商品
                            </Button>
                    </FormItem>
                    <GoodFilter 
                    formFields={filterFields}
                    category={category}
                    onChange={this.handleFilterChange.bind(this)}
                    onFilter={this.handleFilter.bind(this)}
                    />
                </div>
                <div className="container_body">
                    <Card title={<span>商品列表</span>}>
                        <Spin spinning={isLoading}>
                            <Table 
                            columns={this.columns} 
                            pagination={pagination}
                            onChange={this.handleChangePage.bind(this)}
                            dataSource={listData}>
                            </Table>
                        </Spin>
                    </Card>
                </div>
                
                <AddGoodDialog
                    visible={isDialogVisible}
                    baseFields={addDialogBaseFields}
                    category={category}
                    config={addDialogConfigs}
                    onCancel={() => {this.setState({isDialogVisible: false})}}
                    onBaseFieldChange={this.handleDialogBaseFieldChange.bind(this)}
                    onUpload={this.handleUpload.bind(this)}

                    onChangeConfigName={this.handleChangeConfigName.bind(this)}
                    onItemInputChange={this.handleItemInputChange.bind(this)}
                    onAddConfig={this.handleAddConfig.bind(this)}
                    onDeleteConfig={this.handleDeleteConfig.bind(this)}
                    onAddConfigItem={this.handleAddConfigItem.bind(this)}
                    onDeleteConfigItem={this.handleDelectConfigItem.bind(this)}
                    onSubmit={this.handleDialogSubmit.bind(this)}
                />
            </div>
        );
    }
}