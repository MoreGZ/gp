import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Modal, Upload, Tabs, message } from 'antd'
import { ActivityApi } from '../../services/api'
import GoodContainer from '../Good'
import AddActivityDialog from '../../components/AddActivityDialog'
import VoucherList from '../../components/VoucherList'
import PageList from '../../components/PageList'
import * as _ from 'lodash'
import { withRouter } from 'react-router-dom'
import * as moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const TabPane = Tabs.TabPane;

@hot(module)
class ActivityDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            isDialogVisible: false,
            baseInfo: {},
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
            title: '活动id',
            dataIndex: 'id',
            key: 'id'
        }, 
        {
            title: '活动名称',
            dataIndex: 'name',
            key: 'name',
        }, 
        {
            title: '活动时间',
            dataIndex: 'time',
            key: 'time',
            render: (value: any, record: any, index: number) => {
                return `${record.begin_date} ~ ${record.end_date}`
            }
        },  
        {
            title: '活动是否开启',
            dataIndex: 'status',
            key: 'status',
            render: (value: any) => {
                return value ==0 ? '否' : '是'
            }
        }, 
        {
            title: '活动负责人',
            dataIndex: 'creator',
            key: 'creator',
            render: () => '_'
        }, 
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (value: any, record: any, index: number) => {
                return <span>
                    <a href="javascript:;" onClick={this.handleUpdate.bind(this)}>修改</a>
                </span>
        }
    }];

    handleUpdate() {
        this.setState({
            isDialogVisible: true
        })
    }

    handleDialogCancel() {
        this.setState({
            isDialogVisible: false
        })
    }

    handleDialogChange(allFields: any) {
        this.setState({
            dialogFormFields: allFields
        })
    }

    updateActivity() {
        const { dialogFormFields } = this.state
        const data = {
            id: dialogFormFields.id.value,
            name: dialogFormFields.name.value,
            status: dialogFormFields.status.value,
            begin_date: dialogFormFields.date.value[0].format('YYYY-MM-DD hh:mm:ss'),
            end_date: dialogFormFields.date.value[1].format('YYYY-MM-DD hh:mm:ss')
        }
        console.log(data)
        this.setState({
            isLoading: true
        }, () => {
            ActivityApi.updateBaseInfo(data).then(res => {
                message.success('修改信息成功')
                this.setState({
                    isDialogVisible: false
                })
                this.fetchActivity()
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

    fetchActivity() {
        const { match: {params: {activity_id}} } = this.props
        const data = {
            activity_id
        }

        this.setState({
            isLoading: true
        }, () => {
            ActivityApi.query(data).then(res => {
                const { data: {baseInfo} } = res;
                console.log(moment(baseInfo.begin_date.value))
                this.setState({
                    baseInfo, 
                    dialogFormFields:{
                        ... _.mapValues(baseInfo, (value, key) => {
                            return {
                                value: value
                            }
                        }),
                        date: {value: [moment(baseInfo.begin_date.value), moment(baseInfo.end_date.value)]}
                    },
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
        this.fetchActivity()
    }

    render() {
        const { pagination, isDialogVisible, baseInfo, dialogFormFields } = this.state;
        console.log(dialogFormFields)
        
        return (
            <div className='container good_container'>
                <div className="container_body mt15">
                    <Card title={<span><Icon type='caret-right' className='title_arrow'></Icon> 活动基本信息</span>}>
                        <Table 
                        columns={this.columns} 
                        pagination={false}
                        dataSource={[baseInfo]}></Table>
                    </Card>
                </div>
                <div className="container_body mt15">
                    <Card title={<span><Icon type='caret-right' className='title_arrow'></Icon> 活动配置</span>}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="活动商品" key="1">
                                <GoodContainer></GoodContainer>
                            </TabPane>
                            <TabPane tab="活动代金券" key="2">
                                <VoucherList></VoucherList>
                            </TabPane>
                            <TabPane tab="活动页面" key="3">
                                <PageList></PageList>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
                <AddActivityDialog
                    isUpdate={true}
                    onCancel={this.handleDialogCancel.bind(this)}
                    visible={isDialogVisible}
                    formFields={dialogFormFields}
                    onChange={this.handleDialogChange.bind(this)}
                    onSubmit={this.updateActivity.bind(this)}
                />
            </div>
        );
    }
}

export default withRouter(ActivityDetail)