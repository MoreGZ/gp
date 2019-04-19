import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Modal, Popconfirm, message } from 'antd'
import AddGoodDialog from '../../components/Good/AddGoodDialog'
import SubGoodEditDialog from '../../components/Good/SubGoodEditDialog'
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
            isSubGoodDialogVisible: false,
            subGoodDialogFormFields: {},
            subGoods: [],
            baseInfo: {},
            dialogFormField: {},
            dialogConfigs: [],
            category: [],
            pagination: {
                size: 'small',
                pageSize: 10,
                current: 1,
                total: 9
            },
            subGoodsColumns: this.initialSubGoodsColumns
        }
    }

    initialSubGoodsColumns: any = [{
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
                <a href="javascripts:;" className='mr15' onClick={this.handleEditSubGood.bind(this, record)}>编辑</a>
            </span>
        }
    }]

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
            return value && value.length > 0 ? <img src={value[0]} alt="" width='200'/> : ''
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
                    dialogFormField: _.mapValues(baseInfo, (value, key) => {
                        return {
                            value: key ==='img' ? _.map(value, (item, index) => ({
                                uid: index,
                                name: item.split('/')[item.split('/').length -1],
                                status: 'done',
                                url: item,
                                thumbUrl: item
                            })) : value
                        }
                    }),
                    dialogConfigs: JSON.parse(baseInfo.config),
                    baseInfo,
                    pagination: {
                        ...this.state.pagination,
                        total: subGoods.length
                    },
                    subGoodsColumns: [
                        ...configColumns,
                        ...this.initialSubGoodsColumns
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

    handleUpdateGood() {
        const { dialogFormField, dialogConfigs} = this.state
        const data = {
            id: dialogFormField.id.value,
            name: dialogFormField.name.value,
            category: dialogFormField.category.value,
            descp: dialogFormField.descp.value,
            img: _.map(dialogFormField.img.value, (img) => img.response ? img.response.data.filePath : img.thumbUrl),
            config: _.map(dialogConfigs, (value, index) => ({name: value.name, value: value.value}))
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

    handleUpdateSubGood() {
        const { subGoodDialogFormFields } = this.state

        this.setState({
            isLoading: true
        }, () => {
            GoodApi.updateSubGood({
                ..._.mapValues(subGoodDialogFormFields, (item) => item.value)
            }).then(res => {
                message.success('修改成功')
                this.setState({
                    isSubGoodDialogVisible: false,
                    subGoodDialogFormFields: {}
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

    handleSubGoodDialogChange(fields: any) {
        this.setState({
            subGoodDialogFormFields: fields
        })
    }

    handleEditSubGood(record: any) {
        this.setState({
            isSubGoodDialogVisible: true,
            subGoodDialogFormFields: {
                original_price: {
                    value: record.original_price
                },
                activity_price: {
                    value: record.activity_price
                },
                count: {
                    value: record.count
                },
                id: {
                    value: record.id
                }
            }
        })
    }

    handleChangeConfigName(value: string, index: number) {
        const { dialogConfigs } = this.state
        dialogConfigs[index].name = value

        this.setState({
            dialogConfigs
        })
    }

    handleItemInputChange(value: string, index: number) {
        const { dialogConfigs } = this.state
        dialogConfigs[index].itemInput = value

        this.setState({
            dialogConfigs
        })
    }

    handleAddConfig() {
        this.setState((preState: any) => {
            return {
                dialogConfigs: preState.dialogConfigs.concat([{
                    name: '',
                    itemInput: '',
                    value: []
                }])
            }
        }, () => {
            console.log(this.state.dialogConfigs)
        })
    }

    handleDeleteConfig(index: number) {
        this.setState((preState: any) => {
            _.remove(preState.dialogConfigs, (value, i) => {
                return index === i
            })
            return {
                dialogConfigs: preState.dialogConfigs
            }
        })
    }

    handleAddConfigItem(index: number) {
        const { dialogConfigs } = this.state

        if(!dialogConfigs[index].itemInput) {
            return
        }
        this.setState((preState: any) => {
            preState.dialogConfigs[index].value.push(preState.dialogConfigs[index].itemInput)
            preState.dialogConfigs[index].itemInput = ''
            return {
                dialogConfigs: preState.dialogConfigs
            }
        })
    }

    handleDelectConfigItem(index: number, subIndex: number) {
        this.setState((preState: any) => {
            _.remove(preState.dialogConfigs[index].value, (value, i) => {
                console.log(i, subIndex)
                return subIndex === i
            })
            return {
                dialogConfigs: preState.dialogConfigs
            }
        })
    }

    componentDidMount() {
        this.fetchGood()
        this.fetchCategory()
    }

    render() {
        const { pagination, isDialogVisible, subGoods, baseInfo, subGoodsColumns, dialogFormField, category, dialogConfigs, isSubGoodDialogVisible, subGoodDialogFormFields } = this.state;
        // console.log(dialogFormField)
        console.log(dialogConfigs)
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
                <AddGoodDialog
                    visible={isDialogVisible}
                    baseFields={dialogFormField}
                    category={category}
                    config={dialogConfigs}
                    onCancel={this.handleCancelDialog.bind(this)}

                    onBaseFieldChange={this.handleDialogChange.bind(this)}

                    onChangeConfigName={this.handleChangeConfigName.bind(this)}
                    onItemInputChange={this.handleItemInputChange.bind(this)}
                    onAddConfig={this.handleAddConfig.bind(this)}
                    onDeleteConfig={this.handleDeleteConfig.bind(this)}
                    onAddConfigItem={this.handleAddConfigItem.bind(this)}
                    onDeleteConfigItem={this.handleDelectConfigItem.bind(this)}
                    
                    onSubmit={this.handleUpdateGood.bind(this)}
                />
                <SubGoodEditDialog
                    visible={isSubGoodDialogVisible}
                    formFields={subGoodDialogFormFields}
                    onCancel={() => {
                        this.setState({
                            isSubGoodDialogVisible: false,
                            subGoodDialogFormFields: {}
                        })
                    }}
                    onOk={this.handleUpdateSubGood.bind(this)}
                    onChange={this.handleSubGoodDialogChange.bind(this)}
                />
            </div>
        );
    }
}

export default withRouter(GoodDetail)