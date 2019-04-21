import * as React from 'react'
import Module from '.'
import { Menu, Upload, Drawer, Icon, Form, Input, Button, Popconfirm, message, Select, Switch } from 'antd'
import ProModuleWrapper from '../../../ProModuleWrapper'
import ColorSelect from '../../../ColorSelet'
import * as _ from 'lodash'
import './style.less'

const { SubMenu } = Menu;
const { TextArea } = Input
const { Option } = Select;
const { Item: FormItem } = Form;

export default class Container extends React.Component<any, any>{
    state = {
        isShowDrawer: false
    }
    
    handleClickModule() {
        this.setState({
            isShowDrawer: true
        })
    }

    handleCloseDrawer() {
        this.setState({
            isShowDrawer: false
        })
    }

    handleUploadChange(info: any) {
        const { onInfoChange } = this.props
        const status = info.file.status;
        
        if(status === 'done') {
            const filedir = info.file.response.data.filePath;
            onInfoChange(`.info.values.coverImg`, filedir)
        }
    }
    
    render() {
        const { onDelete, onInfoChange, moduleInfo, goodList, voucherList, onModuleUp, onModuleDown} = this.props;
        const { isShowDrawer } = this.state
        
        return (
            <React.Fragment>
                <ProModuleWrapper 
                    onDelete={onDelete}
                    onUp={onModuleUp}
                    onDown={onModuleDown}
                    onClick={(e: any) => {
                        this.handleClickModule()
                    }}
                >
                    <Module moduleInfo={moduleInfo} isEdit={true}/>
                </ProModuleWrapper>
                <Drawer
                    title= '代金券-样式1'
                    placement='left'
                    style={{padding: '0px'}}
                    closable={true}
                    visible={isShowDrawer}
                    onClose={this.handleCloseDrawer.bind(this)}
                    width={500}
                >
                    <div style={{marginLeft: '15px'}}>
                        <FormItem label='float' style={{marginBottom: '5px'}}>
                            <Switch
                                checkedChildren="左" unCheckedChildren="右"
                                checked={moduleInfo.float === 'right'}
                                onChange={(checked) => {
                                    let value = checked ? 'right' : 'left'
                                    onInfoChange(`.info.float`, value)
                                }}
                            ></Switch>
                        </FormItem>
                    </div>

                    <div style={{marginLeft: '15px'}}>
                        <FormItem label='图片' style={{marginBottom: '5px'}}>
                            <Upload action='/upload/img' multiple={false} onChange={(info) => { this.handleUploadChange(info) }}>
                                <Button style={{ display: 'inline-block', width: '216px' }}>
                                    <Icon type="upload" /> 图片
                                </Button>
                            </Upload>
                        </FormItem>
                    </div>

                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="商品标题" style={{marginBottom: '5px'}}>
                            <Input 
                                value={_.get(moduleInfo, `values.name`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.name`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
                    </div>

                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="商品描述" style={{marginBottom: '5px'}}>
                            <TextArea 
                                value={_.get(moduleInfo, `values.desc`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.desc`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
                    </div>

                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="原价" style={{marginBottom: '5px'}}>
                            <Input 
                                value={_.get(moduleInfo, `values.price`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.price`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
                    </div>

                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="抢购价" style={{marginBottom: '5px'}}>
                            <Input 
                                value={_.get(moduleInfo, `values.activityPrice`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.activityPrice`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
                    </div>

                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="按钮颜色" style={{marginBottom: '5px'}}>
                            <span style={{fontSize: '12px'}}>背景</span><br/>
                            <ColorSelect 
                                value={_.get(moduleInfo, `values.buttonColor`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.buttonColor`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
                    </div>

                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="字体颜色" style={{marginBottom: '5px'}}>
                            <span style={{fontSize: '12px'}}>标题</span><br/>
                            <ColorSelect 
                                value={_.get(moduleInfo, `values.nameColor`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.nameColor`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            /><br/>
                            <span style={{fontSize: '12px'}}>描述</span><br/>
                            <ColorSelect 
                                value={_.get(moduleInfo, `values.descColor`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.descColor`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            /><br/>
                            <span style={{fontSize: '12px'}}>原价&抢购价</span><br/>
                            <ColorSelect 
                                value={_.get(moduleInfo, `values.priceColor`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.priceColor`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            /><br/>
                            <span style={{fontSize: '12px'}}>按钮</span><br/>
                            <ColorSelect 
                                value={_.get(moduleInfo, `values.buttonTextColor`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.buttonTextColor`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            /><br/>
                        </FormItem>
                    </div>

                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="背景颜色" style={{marginBottom: '5px'}}>
                            <ColorSelect 
                                value={_.get(moduleInfo, `values.bcColor`, '')} 
                                onChange={(e: any) => {onInfoChange(`.info.values.bcColor`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
                    </div>
                    {/*                 
                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="绑定商品" style={{marginBottom: '5px'}}>
                            <Select
                                value={_.get(moduleInfo, `bindGood.name`, '')} 
                                onChange={this.handleSelectBindGood.bind(this)}
                                style={{ display: 'inline-block', width: '216px' }}
                            >
                            {
                                _.map(goodList, (good, index) => (
                                    <Option value={good.id} key={index}>{good.name}</Option>
                                ))
                            }
                            </Select>
                        </FormItem>
                    </div> */}

                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <Button type="danger" style={{width: '216px'}} onClick={onDelete}>删除</Button>
                    </div>
                </Drawer>
            </React.Fragment>
        )
    }
}