import * as React from 'react'
import Module from '.'
import { Menu, Upload, Drawer, Icon, Form, Input, Button, Popconfirm, message, Select, Switch } from 'antd'
import ProModuleWrapper from '../../../ProModuleWrapper'
import * as _ from 'lodash'
import ColorSelect from '../../../ColorSelet'

const { Item: FormItem } = Form;
const { TextArea } = Input
const { SubMenu } = Menu;
const { Option } = Select;

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

    handleSelectBindGood(index: string | number, value: any) {
        const { goodList, onInfoChange } = this.props
        
        let good = _.find(goodList, (good) => good.id == value)
        good = _.mapValues(good, (item, key) => {
            return key === 'img' ? JSON.parse(item) : item
        })
        onInfoChange(`.info.values.${index}.bindGood`, _.extend({}, good))
        onInfoChange(`.info.values.${index}.name`, good.name)
        onInfoChange(`.info.values.${index}.desc`, good.descp)
        onInfoChange(`.info.values.${index}.activityPrice`, good.min_activity_price)

        if(good.img.length > 0) {
            onInfoChange(`.info.values.${index}.coverImg`, good.img[0])
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
                    title= '商品-样式2'
                    placement='left'
                    style={{padding: '0px'}}
                    closable={true}
                    visible={isShowDrawer}
                    onClose={this.handleCloseDrawer.bind(this)}
                    width={500}
                >
                    <Menu mode="inline">
                    {
                        _.map(moduleInfo.values, (data, index) => (
                            <SubMenu title={`商品${index+1}`} key={index}>
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
                                            value={_.get(data, `name`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.name`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </FormItem>
                                </div>

                                <div style={{marginLeft: '15px'}}>
                                    <FormItem label="抢购价" style={{marginBottom: '5px'}}>
                                        <Input 
                                            value={_.get(data, `activityPrice`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.activityPrice`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </FormItem>
                                </div>

                                <div style={{marginLeft: '15px'}}>
                                    <FormItem label="购物车按钮颜色" style={{marginBottom: '5px'}}>
                                        <span style={{fontSize: '12px'}}>背景</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `buttonColor1`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.buttonColor1`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                        <span style={{fontSize: '12px'}}>边框</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `buttonBorderColor1`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.buttonBorderColor1`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </FormItem>
                                </div>

                                <div style={{marginLeft: '15px'}}>
                                    <FormItem label="购买按钮颜色" style={{marginBottom: '5px'}}>
                                        <span style={{fontSize: '12px'}}>背景</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `buttonColor1`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.buttonColor2`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                        <span style={{fontSize: '12px'}}>边框</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `buttonBorderColor1`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.buttonBorderColor2`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </FormItem>
                                </div>

                                <div style={{marginLeft: '15px'}}>
                                    <FormItem label="字体颜色" style={{marginBottom: '5px'}}>
                                        <span style={{fontSize: '12px'}}>标题</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `nameColor`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.nameColor`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        /><br/>
                                        <span style={{fontSize: '12px'}}>抢购价</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `priceColor`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.priceColor`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        /><br/>
                                        <span style={{fontSize: '12px'}}>购物车按钮</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `buttonTextColor1`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.buttonTextColor1`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        /><br/>
                                        <span style={{fontSize: '12px'}}>购买按钮</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `buttonTextColor2`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.buttonTextColor2`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        /><br/>
                                    </FormItem>
                                </div>

                                <div style={{marginLeft: '15px'}}>
                                    <FormItem label="背景颜色" style={{marginBottom: '5px'}}>
                                        <ColorSelect 
                                            value={_.get(data, `bcColor`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.bcColor`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </FormItem>
                                </div>

                                <div style={{marginLeft: '15px'}}>
                                    <FormItem label="绑定商品" style={{marginBottom: '5px'}}>
                                        <Select
                                            value={_.get(moduleInfo, `bindGood.name`)} 
                                            onChange={this.handleSelectBindGood.bind(this, `[${index}]`)}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        >
                                        {
                                            _.map(goodList, (good, index) => (
                                                <Option value={good.id} key={index}>{good.name}</Option>
                                            ))
                                        }
                                        </Select>
                                    </FormItem>
                                </div>
                            </SubMenu>
                        ))
                    }
                    </Menu>
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <Button type="danger" style={{width: '216px'}} onClick={onDelete}>删除</Button>
                    </div>
                </Drawer>
            </React.Fragment>
        )
    }
}