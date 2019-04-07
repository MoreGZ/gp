import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Modal, Popconfirm, message } from 'antd'
import { GoodApi } from '../../services/api'
import './style.less'
import * as _ from 'lodash'
import BaseInfoForm from '../../components/Good/BaseInfoForm'
import { withRouter } from 'react-router-dom'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

@hot(module)
class GoodDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            isDialogVisible: false,
            subGoods: [],
            baseInfo: {},
            dialogFormField: {},
            category: [],
            pagination: {
                size: 'small',
                pageSize: 10,
                current: 1,
                total: 9
            },
            subGoodsColumns: [{
                title: '活动价',
                dataIndex: 'activity_price',
                key: 'activity_price',
                }, {
                title: '原价',
                dataIndex: 'original_price',
                key: 'original_price',
                }, {
                title: '库存',
                dataIndex: 'count',
                key: 'count',
                }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (value: any, record: any, index: number) => {
                    return <span>
                        <a href="javascripts:;" className='mr15'>编辑</a>
                    </span>
                }
            }]
        }
    }

    columns = [{
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        }, {
        title: '商品类别',
        dataIndex: 'category',
        key: 'category',
        }, {
        title: '商品介绍',
        dataIndex: 'descp',
        key: 'descp',
        }, {
        title: '图片',
        dataIndex: 'img',
        key: 'img',
        render: (value: any, record: any, index: number) => {
            return value && value.length > 0 ? <img src={value[0]} alt=""/> : ''
        }
        }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (value: any, record: any, index: number) => {
            return <span>
                <a href="javascripts:;" className='mr15' onClick={() => {this.setState({isDialogVisible: true})}}>修改</a>
            </span>
        }
    }];

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

    fetchGood() {
        const { match: {params: {good_id}} } = this.props
        const data = {
            good_id
        }

        this.setState({
            isLoading: true
        }, () => {
            GoodApi.query(data).then(res => {
                const { data: {baseInfo, subGoods} } = res;
                const configColumns = _.map(JSON.parse(baseInfo.config), (value, index) => ({
                    title: value.name,
                    dataIndex: value.name,
                    key: value.name,
                }))
                
                this.setState({
                    subGoods: _.map(subGoods, (subGood, index) => {
                        return {
                            ...subGood,
                            ...JSON.parse(subGood.config)
                        }
                    }),
                    dialogFormField: _.mapValues(baseInfo, (value) => {
                        return {
                            value: value
                        }
                    }),
                    baseInfo,
                    pagination: {
                        ...this.state.pagination,
                        total: subGoods.length
                    },
                    subGoodsColumns: [
                        ...configColumns,
                        ...this.state.subGoodsColumns
                    ]
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

    handleCancelDialog() {
        this.setState({
            isDialogVisible: false
        })
    }

    handleDialogChange(fields: any) {
        this.setState({
            dialogFormField: fields
        })
    }

    handleUpload() {

    }

    handleUpdateGood() {
        const { dialogFormField} = this.state
        const data = {
            id: dialogFormField.id.value,
            name: dialogFormField.name.value,
            category: dialogFormField.category.value,
            descp: dialogFormField.descp.value,
            img: dialogFormField.img.value
        }
        console.log(data)
        this.setState({
            isLoading: true
        }, () => {
            GoodApi.updateBaseInfo(data).then(res => {
                message.success('修改信息成功')
                this.setState({
                    isDialogVisible: false
                })
                this.fetchGood()
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
        this.fetchGood()
        this.fetchCategory()
    }

    render() {
        const { pagination, isDialogVisible, subGoods, baseInfo, subGoodsColumns, dialogFormField, category } = this.state;
        console.log(this.props);
        console.log(subGoods)
        
        return (
            <div className='container good_container'>
                <div className="container_body mt15">
                    <Card title={<span><Icon type='caret-right' className='title_arrow'></Icon> 商品基本信息</span>}>
                        <Table 
                        columns={this.columns} 
                        pagination={false}
                        dataSource={[baseInfo]}
                        rowKey='id'
                        ></Table>
                    </Card>
                </div>
                <div className="container_body mt15">
                    <Card title={<span><Icon type='caret-right' className='title_arrow'></Icon> 商品配置</span>}>
                        <Table 
                        columns={subGoodsColumns} 
                        pagination={pagination}
                        dataSource={subGoods}
                        rowKey='id'
                        ></Table>
                    </Card>
                </div>
                <Modal 
                visible={isDialogVisible} 
                onCancel={this.handleCancelDialog.bind(this)}
                footer={null}
                className='add_good_dialog'
                width={'833px'}
                bodyStyle={{padding: '50px 56px 30px 56px'}}
                >
                    <BaseInfoForm
                    formFields={dialogFormField}
                    category={category}
                    onChange={this.handleDialogChange.bind(this)}
                    onUpload={this.handleUpload.bind(this)}
                    />
                    <div className='sure_btn_box'>
                        <Button 
                        type='primary'
                        className='base_btn sure_btn'
                        onClick={this.handleUpdateGood.bind(this)}
                        >完成<Icon type='check'></Icon></Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(GoodDetail)