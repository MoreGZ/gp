import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Modal, Radio, Row, Col, Tag, message } from 'antd'
import { GoodApi } from '../../services/api'
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
            filterFields: {},
            pagination: {
                size: 'small',
                pageSize: 10,
                current: 1,
                total: 50
            }
        }
    }

    columns = [{
        title: '活动id',
        dataIndex: 'id',
        key: 'id',
        }, {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
        }, {
        title: '活动时间',
        dataIndex: 'time',
        key: 'time',
        }, {
        title: '活动创建人',
        dataIndex: 'creator',
        key: 'creator',
        }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
    }];

    

    componentDidMount() {
    }

    render() {
        const { pagination, isDialogVisible, addDialogBaseFields, addDialogConfigs} = this.state;
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
                            <Button type='primary' className='btn' onClick={() => { this.setState({isDialogVisible: true}) }}>
                                <Icon type='plus'/>添加页面
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="container_body">
                    <Table columns={this.columns} pagination={pagination}></Table>  
                </div>
                
                <Modal
                    onCancel={() => { this.setState({isDialogVisible: false}) }}
                    visible={isDialogVisible}
                    title='添加活动'
                >
                    <Form>
                        <Row gutter={24}>
                            <Col span={6}></Col>
                            <Col span={12}>
                                <FormItem className='input_item' label='活动名称'> 
                                {
                                    getFieldDecorator('name', { rules: [{ required: true, message: '请填写用户名' }] })(
                                        <Input 
                                            prefix={<Icon type="user" 
                                            style={{ color: '#77654e' }} />} 
                                            placeholder='用户名' 
                                            className='input'
                                        />
                                    )
                                }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}></Col>
                            <Col span={12}>
                                <FormItem className='input_item' label='活动管理员'>
                                {
                                    getFieldDecorator('password', { rules: [{ required: true, message: '请填写密码' }] })(
                                        <Input 
                                            prefix={<Icon type="lock" 
                                            style={{ color: '#77654e' }} />} 
                                            type='password'
                                            placeholder='密码' 
                                            className='input'
                                        />
                                    )
                                }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}></Col>
                            <Col span={12}>
                                <FormItem className='input_item' label='活动状态'>
                                {
                                    getFieldDecorator('password', { rules: [{ required: true, message: '请填写密码' }] })(
                                        <RadioGroup options={radioOption}/>
                                    )
                                }
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create({

})(Activity);