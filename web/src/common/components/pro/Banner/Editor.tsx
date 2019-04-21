import * as React from 'react'
import Module from '.'
import { Menu, Upload, Drawer, Icon, Form, Input, Button, Popconfirm, message } from 'antd'
import config from './config'
import * as _ from 'lodash'
import util from '@common/libs/util'
import ProModuleWrapper from '../../ProModuleWrapper'


const { SubMenu } = Menu;
const { Item: FormItem } = Form;
export default class Container extends React.Component<any, any> {
    state = {
        isShowDrawer: false
    }

    _renderSubMemuTitle(index: number) {
        const { onInfoDelete } = this.props;

        return (
            <span>
                banner{index+1}
                <Popconfirm title='确定要删除此banner吗' onConfirm={this.handleDeletInfo.bind(this)} okText="删除" cancelText="取消">
                    <Icon type='delete' style={{float: 'right', marginTop: '13px'}}/>
                </Popconfirm>
            </span>
        )
    }

    handleAddInfo() {
        let { moduleInfo, onInfoChange } = this.props

        const newModuleInfoValue = moduleInfo.values.concat([util.deepClone(config.info.values[0])])

        onInfoChange('.info.values', newModuleInfoValue);
    }

    handleDeletInfo(index: number) {
        let { moduleInfo, onInfoChange } = this.props

        let newModuleInfoValue = moduleInfo.values.slice()
        newModuleInfoValue.splice(index, 1)

        onInfoChange('.info.values', newModuleInfoValue);
    }
    
    handleUploadChange(info: any, index: number) {
        const { onInfoChange } = this.props
        const status = info.file.status;
        
        if(status === 'done') {
            const filedir = info.file.response.data.filePath;
            onInfoChange(`.info.values.[${index}].img`, filedir)
        }
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
    
    render() {
        const { onDelete, onInfoChange, moduleInfo, onModuleUp, onModuleDown} = this.props;
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
                title= 'banner'
                placement='left'
                style={{padding: '0px'}}
                closable={true}
                visible={isShowDrawer}
                onClose={this.handleCloseDrawer.bind(this)}
                width={500}
                >
                    <Menu mode="inline">
                    {
                        _.map(moduleInfo.values, (data, index: number) => {
                            console.log(data)
                            
                            return (
                                <SubMenu title={this._renderSubMemuTitle(index)}>
                                    <div style={{marginLeft: '15px'}}>
                                        <FormItem label='背景图片' style={{marginBottom: '5px'}}>
                                            <Upload 
                                            action='/upload/img' 
                                            multiple={false} 
                                            onChange={(info) => { this.handleUploadChange(info, index) }}>
                                                <Button style={{ display: 'inline-block', width: '216px' }}>
                                                    <Icon type="upload" /> 上传背景图片
                                                </Button>
                                            </Upload>
                                        </FormItem>
                                    </div>
                                    <div style={{marginLeft: '15px'}}>
                                        <FormItem label="链接" style={{marginBottom: '5px'}}>
                                            <Input 
                                                value={_.get(data, 'link', '')} 
                                                onChange={(e) => {onInfoChange(`.info.values.[${index}].link`, e.target.value)}}
                                                style={{ display: 'inline-block', width: '216px' }}
                                            />
                                        </FormItem>
                                    </div>
                                </SubMenu>
                            )
                        })
                    }
                    <div style={{textAlign: 'center'}}>
                        <Button shape='circle' onClick={this.handleAddInfo.bind(this)}><Icon type='plus'/></Button>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <Button type="danger" style={{width: '216px'}} onClick={onDelete}>删除</Button>
                    </div>
                    </Menu>
                </Drawer>
            </React.Fragment>
        )
    }
}