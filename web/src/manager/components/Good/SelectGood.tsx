import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Popconfirm, Upload, Row, Col, Tag, message, Tooltip, Spin, Modal } from 'antd'
import { GoodApi } from '../../services/api'
import GoodFilter from './GoodFilter'
import GoodList from './GoodList'
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
            page_index: 1,
            page_size: 9999,
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

    componentDidMount() {
        this.fetchGoodList()
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

    handleFilterChange(fields: any) {
        this.setState({
            filterFields: fields
        })
    }

    handleSelect(selectedRowKeys: [], selectedRows: []) {
        this.props.onSelect(selectedRowKeys)
    }

    render() {
        const { pagination, listData, filterFields } = this.state;
        const { category, disableRowKeys, selectedRowKeys=[] } = this.props
        
        return (
            <React.Fragment>
                {
                    selectedRowKeys.length > 0 &&
                    <div
                        style={{marginBottom: '26px'}}
                    >
                        <div style={{color: '#bb9d77', fontSize: '16px', marginBottom: '5px'}}>已选择商品</div>
                    {
                        _.map(selectedRowKeys, (key, index) => {
                            return <Tag key={index}>{key}</Tag>
                        })
                    }
                    </div>
                }
                <div className="container_header">
                    <GoodFilter 
                    formFields={filterFields}
                    category={category}
                    onChange={this.handleFilterChange.bind(this)}
                    onFilter={() => {this.fetchGoodList()}}
                    />
                </div>
                <div className="container_body">
                    <GoodList
                    pagination={pagination}
                    dataSource={listData}
                    hasSelector={true}
                    isShowOperation={false}
                    onSelect={this.handleSelect.bind(this)}
                    disableRowKeys={disableRowKeys}
                    selectedRowKeys={selectedRowKeys}>
                    </GoodList>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(GoodTabPane)