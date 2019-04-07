import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Popconfirm, Upload, Row, Col, Tag, message, Tooltip, Spin, Modal } from 'antd'
import { GoodApi } from '../../services/api'
import GoodFilter from './GoodFilter'
import GoodList from './GoodList'
import './style.less'
import * as _ from 'lodash'

const FormItem = Form.Item

@hot(module)
export default class extends React.Component<any, any> {
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

    handleDialogSubmit() {
        
    }

    componentDidMount() {
        this.fetchGoodList()
        this.fetchCategory()
    }

    render() {
        const { pagination, listData, isLoading, filterFields, category, isDialogVisible } = this.state;
        
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
                <Modal 
                title='添加商品'
                visible={isDialogVisible} 
                onCancel={() => {this.setState({isDialogVisible: false})}}
                width={'900px'}
                onOk={this.handleDialogSubmit.bind(this)}
                bodyStyle={{padding: '20px 20px 20px 20px'}}
                >
                    <div className="container_header">
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
                        onDelete={this.deleteGood.bind(this)}
                        hasSelector={true}
                        isShowOperation={false}>
                        </GoodList>
                    </div>
                </Modal>
            </div>
        );
    }
}