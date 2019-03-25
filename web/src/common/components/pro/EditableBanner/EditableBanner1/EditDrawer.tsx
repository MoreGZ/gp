import * as React from 'react'
import { Menu, Upload, Drawer, Icon, Form, Input, Button, Popconfirm, message } from 'antd'
import defaultValue from '../defaultValue'
import '../index.less'
import * as _ from 'lodash'

const { SubMenu } = Menu;
const { Item: FormItem } = Form;
export default class EditBanner1 extends React.Component<any, any> {
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

        moduleInfo.push(Object.assign([], defaultValue[0]))

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

    render () {
        const { moduleInfo=[], onClose, visible, onInfoChange, onDelete } = this.props

        return (
            <Drawer
                title= 'banner'
                placement='left'
                style={{padding: '0px'}}
                closable={true}
                visible={visible}
                onClose={onClose}
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
        )
    }
}