import * as React from "react"
import { hot } from 'react-hot-loader'
import { Table, Popconfirm, Tag, Tooltip } from 'antd'
import {Link} from 'react-router-dom'
import './style.less'
import * as _ from 'lodash'

@hot(module)
export default class extends React.Component<any, any> {
    columns = [
        {
            title: '商品id',
            dataIndex: 'id',
            key: 'id',
            render: (value: any, record: any, index: number) => {
                return <Link to={`/good/detail/${value}`}>{value}</Link>
            }
        }, 
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        }, 
        {
            title: '商品类别',
            dataIndex: 'category',
            key: 'category',
        }, 
        {
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
        }
    ];

    render() {
        const { pagination, dataSource, onChange, hasSelector=false, isShowOperation=true} = this.props;
        const rowSelection = {
            onChange: (selectedRowKeys: any, selectedRows: any) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record: any) => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        }

        if(isShowOperation && !_.find(this.columns, (item, index) => item.key === 'operation')) {
            this.columns.push(        {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (value: any, record: any, index: number) => {
                    return <span>
                        <Popconfirm title='确定删除此商品？' onConfirm={() => {this.props.onDelete(record.id)}} okText="删除" cancelText="取消">
                            <a href="javascripts:;" className='mr15'>删除</a>
                        </Popconfirm>
                        <Link to={`/good/detail/${record.id}`}>详情</Link>
                    </span>
                }
            })
        }
        
        return (
            <Table 
            columns={this.columns} 
            pagination={pagination}
            onChange={onChange}
            dataSource={dataSource}
            rowSelection={hasSelector ? rowSelection : null}>
            </Table>
        );
    }
}