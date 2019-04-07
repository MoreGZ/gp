import * as React from 'react'
import { Menu, Upload, Drawer, Icon, Form, Input, Button, Popconfirm, message, Select } from 'antd'
import ColorSelect from '../../ColorSelet'
import './index.less'
import * as _ from 'lodash'

const { SubMenu } = Menu;
const { TextArea } = Input
const { Option } = Select;
const { Item: FormItem } = Form;
export default class EditDrawer extends React.Component<any, any> {

    // handleSelectBindGood(value: any) {
    //     const { goodList, onInfoChange } = this.props
        
    //     const good = _.find(goodList, (good) => good.id == value)

    //     onInfoChange(`bindGood`, _.extend({}, good))
    // }

    handleUploadChange(info: any) {
        const { onInfoChange } = this.props
        const status = info.file.status;
        

        if(status === 'uploading') {
            this.setState({
                isUploading: true
            })
        }
        if(status !== 'uploading') {
            this.setState({
                isUploading: false
            })
        }
        if(status === 'done') {
            const filedir = info.file.response.data.filedir;

            onInfoChange(`coverImg`, filedir)
        }
    }

    render () {
        const { moduleInfo={}, onClose, visible, onInfoChange, onDelete, goodList } = this.props

        return (
            <Drawer
                title= '代金券-样式1'
                placement='left'
                style={{padding: '0px'}}
                closable={true}
                visible={visible}
                onClose={onClose}
            >
                <div style={{marginLeft: '15px'}}>
                    <FormItem label='图片' style={{marginBottom: '5px'}}>
                        <Upload action='/api/upload' multiple={false} onChange={(info) => { this.handleUploadChange(info) }}>
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
                            onChange={(e: any) => {onInfoChange(`name`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                    </FormItem>
                </div>

                <div style={{marginLeft: '15px'}}>
                    <FormItem label="商品描述" style={{marginBottom: '5px'}}>
                        <TextArea 
                            value={_.get(moduleInfo, `values.desc`, '')} 
                            onChange={(e: any) => {onInfoChange(`desc`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                    </FormItem>
                </div>

                <div style={{marginLeft: '15px'}}>
                    <FormItem label="原价" style={{marginBottom: '5px'}}>
                        <Input 
                            value={_.get(moduleInfo, `values.price`, '')} 
                            onChange={(e: any) => {onInfoChange(`price`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                    </FormItem>
                </div>

                <div style={{marginLeft: '15px'}}>
                    <FormItem label="抢购价" style={{marginBottom: '5px'}}>
                        <Input 
                            value={_.get(moduleInfo, `values.activityPrice`, '')} 
                            onChange={(e: any) => {onInfoChange(`activityPrice`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                    </FormItem>
                </div>

                <div style={{marginLeft: '15px'}}>
                    <FormItem label="按钮颜色" style={{marginBottom: '5px'}}>
                        <span style={{fontSize: '12px'}}>背景</span>
                        <ColorSelect 
                            value={_.get(moduleInfo, `values.buttonColor`, '')} 
                            onChange={(e: any) => {onInfoChange(`buttonColor`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                    </FormItem>
                </div>

                <div style={{marginLeft: '15px'}}>
                    <FormItem label="字体颜色" style={{marginBottom: '5px'}}>
                        <span style={{fontSize: '12px'}}>标题</span>
                        <ColorSelect 
                            value={_.get(moduleInfo, `values.nameColor`, '')} 
                            onChange={(e: any) => {onInfoChange(`nameColor`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                        <span style={{fontSize: '12px'}}>描述</span>
                        <ColorSelect 
                            value={_.get(moduleInfo, `values.descColor`, '')} 
                            onChange={(e: any) => {onInfoChange(`descColor`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                        <span style={{fontSize: '12px'}}>原价&抢购价</span>
                        <ColorSelect 
                            value={_.get(moduleInfo, `values.priceColor`, '')} 
                            onChange={(e: any) => {onInfoChange(`priceColor`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                        <span style={{fontSize: '12px'}}>按钮</span>
                        <ColorSelect 
                            value={_.get(moduleInfo, `values.buttonTextColor`, '')} 
                            onChange={(e: any) => {onInfoChange(`buttonTextColor`, e.target.value)}}
                            style={{ display: 'inline-block', width: '216px' }}
                        />
                    </FormItem>
                </div>

                <div style={{marginLeft: '15px'}}>
                    <FormItem label="背景颜色" style={{marginBottom: '5px'}}>
                        <ColorSelect 
                            value={_.get(moduleInfo, `values.bcColor`, '')} 
                            onChange={(e: any) => {onInfoChange(`bcColor`, e.target.value)}}
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
        )
    }
}