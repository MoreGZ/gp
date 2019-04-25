import * as React from 'react'
import Module from '.'
import { Menu, Upload, Drawer, Icon, Form, InputNumber, Button, Popconfirm, message, Input } from 'antd'
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
    
    handleUploadChange(info: any) {
        const { onInfoChange } = this.props
        const status = info.file.status;
        
        if(status === 'done') {
            const filedir = info.file.response.data.filePath;
            onInfoChange(`.info.values.photoUrl`, filedir)
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
                title= '图片'
                placement='left'
                style={{padding: '0px'}}
                closable={true}
                visible={isShowDrawer}
                onClose={this.handleCloseDrawer.bind(this)}
                width={500}
                >
                    <Menu mode="inline">
                    <div style={{marginLeft: '15px'}}>
                        <FormItem label='背景图片' style={{marginBottom: '5px'}}>
                            <Upload 
                            action='/upload/img' 
                            multiple={false} 
                            onChange={(info) => { this.handleUploadChange(info) }}>
                                <Button style={{ display: 'inline-block', width: '216px' }}>
                                    <Icon type="upload" /> 上传背景图片
                                </Button>
                            </Upload>
                        </FormItem>
                    </div>
                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="图片宽度" style={{marginBottom: '5px'}}>
                            <Input 
                                value={moduleInfo.photoWidth} 
                                onChange={(e) => {onInfoChange(`.info.photoWidth`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
                    </div>
                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="图片高度" style={{marginBottom: '5px'}}>
                            <Input 
                                value={moduleInfo.photoHeight} 
                                onChange={(e) => {onInfoChange(`.info.photoHeight`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
                    </div>
                    <div style={{marginLeft: '15px'}}>
                        <FormItem label="链接" style={{marginBottom: '5px'}}>
                            <Input 
                                value={moduleInfo.values.link} 
                                onChange={(e) => {onInfoChange(`.info.values.link`, e.target.value)}}
                                style={{ display: 'inline-block', width: '216px' }}
                            />
                        </FormItem>
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