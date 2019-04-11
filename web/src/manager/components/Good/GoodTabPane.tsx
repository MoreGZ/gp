import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Popconfirm, Upload, Row, Col, Tag, message, Tooltip, Spin, Modal } from 'antd'
import { GoodApi, ActivityApi } from '../../services/api'
import GoodFilter from './GoodFilter'
import GoodList from './GoodList'
import SelectGoodDialog from './SelectGoodDialog'
import './style.less'
import * as _ from 'lodash'
import { withRouter } from "react-router";

const FormItem = Form.Item

@hot(module)
class GoodTabPane extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            isDialogVisible: false,
            isLoading: true,
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

    fetchGoodList() {
        const { filterFields, pagination } = this.state

        const data = {
            ..._.mapValues(filterFields, (value) => value.value),
            page_index: pagination.current,
            page_size: pagination.pageSize,
            activity_id: this.props.match.params.activity_id
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
            ActivityApi.removeGoodFromActivity({
                good_id: good_id,
                activity_id: +this.props.match.params.activity_id
            }).then(res => {
                message.success('移除商品成功')
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

    handleDialogSubmit(selectedRowKeys: []) {
        this.setState({
            isLoading: true,
            isDialogVisible: false
        }, () => {
            ActivityApi.addGoodToActivity({
                good_ids: selectedRowKeys,
                activity_id: +this.props.match.params.activity_id
            }).then((res) => {
                message.success('添加成功')
                this.fetchGoodList()
            }).catch((err) => {
                message.error(`添加失败：${err.message}`)
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    componentDidMount() {
        this.fetchGoodList()
        this.fetchCategory()
    }

    render() {
        const { pagination, listData, isLoading, filterFields, category, isDialogVisible } = this.state;
        const disableRowKeys = _.map(listData, (item) => item.id)
        // console.log(disableRowKeys)

        return (
            <div className='container good_container'>
                <Spin spinning={isLoading}>
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
                        <GoodList
                        pagination={pagination}
                        onChange={this.handleChangePage.bind(this)}
                        dataSource={listData}
                        onDelete={this.deleteGood.bind(this)}>
                        </GoodList>
                    </div>
                </Spin>
                {
                    isDialogVisible &&
                    <SelectGoodDialog
                    visible={isDialogVisible} 
                    category={category}
                    onCancel={() => {this.setState({isDialogVisible: false})}}
                    onOk={this.handleDialogSubmit.bind(this)}
                    disableRowKeys={disableRowKeys}
                    />
                }
            </div>
        );
    }
}

export default withRouter(GoodTabPane)