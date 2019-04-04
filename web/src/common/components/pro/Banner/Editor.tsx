import * as React from 'react'
import Module from '.'
import { Menu, Upload, Drawer, Icon, Form, Input, Button, Popconfirm, message } from 'antd'
import config from './config'
import * as _ from 'lodash'

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

        moduleInfo.push(Object.assign([], config.info.values[0]))

        onInfoChange(undefined, moduleInfo);
    }

    handleDeletInfo(index: number) {
        let { moduleInfo, onInfoChange } = this.props

        moduleInfo.splice(index, 1);

        onInfoChange(undefined, moduleInfo);
    }
    
    handleUploadChange(info: any, index: number) {
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
            console.log(index);
            onInfoChange(`[${index}].img`, filedir)
        }
    }
    
    handleCickModule() {
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
        const { onDelete, onInfoAdd, onInfoChange, onInfoDelete, moduleInfo} = this.props;
        const { isShowDrawer } = this.state
        
        return (
            <React.Fragment>
                <div onClick={this.handleCickModule.bind(this)}>
                    <Module moduleInfo={moduleInfo}/>
                </div>

                <Drawer
                title= 'banner'
                placement='left'
                style={{padding: '0px'}}
                closable={true}
                visible={isShowDrawer}
                onClose={this.handleCloseDrawer.bind(this)}
                >
                    <Menu mode="inline">
                    {
                        _.map(moduleInfo, (data, index: number) => (
                            <SubMenu title={this._renderSubMemuTitle(index)}>
                                <div style={{marginLeft: '15px'}}>
                                    <FormItem label='背景图片' style={{marginBottom: '5px'}}>
                                        <Upload action='/api/upload' multiple={false} onChange={(info) => { this.handleUploadChange(info, index) }}>
                                            <Button style={{ display: 'inline-block', width: '216px' }}>
                                                <Icon type="upload" /> 上传背景图片
                                            </Button>
                                        </Upload>
                                    </FormItem>
                                </div>
                                <div style={{marginLeft: '15px'}}>
                                    <FormItem label="链接" style={{marginBottom: '5px'}}>
                                        <Input 
                                            value={_.get(moduleInfo, `[${index}].link`, '')} 
                                            onChange={(e) => {onInfoChange(`[${index}].link`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </FormItem>
                                </div>
                            </SubMenu>
                        ))
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