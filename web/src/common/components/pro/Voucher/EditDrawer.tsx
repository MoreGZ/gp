import * as React from 'react'
import { Menu, Upload, Drawer, Icon, Form, Input, Button, Popconfirm, message, Select } from 'antd'
import ColorSelect from '../../ColorSelet'
import * as _ from 'lodash'
import './index.less'

const { SubMenu } = Menu;
const { Option } = Select;
const { Item: FormItem } = Form;
export default class EditDrawer extends React.Component<any, any>{

    // handleSelectBindVoucher(key: string | number ,value: any) {
    //     const { voucherList, onInfoChange } = this.props
        
    //     const voucher = _.find(voucherList, (voucher) => voucher.id == value)
    //     console.log(key);
    //     console.log(value);
    //     console.log(voucher);
    //     onInfoChange(`${key}.bindVoucher`, _.extend({}, voucher))
    //     onInfoChange(`${key}.value`, voucher.value)
    //     onInfoChange(`${key}.contition`, `满${voucher.threshold}元使用`)
    // }

    render () {
        const { moduleInfo=[], onClose, visible, onInfoChange, onDelete, voucherList } = this.props
        // console.log(voucherList);
        return (
            <Drawer
                title= '代金券-样式1'
                placement='left'
                style={{padding: '0px'}}
                closable={true}
                visible={visible}
                onClose={onClose}
                width={500}
            >
                <Menu mode="inline">
                {
                    _.map(moduleInfo.values, (data, index) => (
                        <SubMenu title={`代金券${index+1}`} key={index}>
                            <div style={{marginLeft: '15px'}}>
                                <FormItem label="金额" style={{marginBottom: '5px'}}>
                                    <Input 
                                        value={_.get(data, `value`, '')} 
                                        onChange={(e: any) => {onInfoChange(`.info.values.[${index}].value`, e.target.value)}}
                                        style={{ display: 'inline-block', width: '216px' }}
                                    />
                                </FormItem>
                            </div>
                            <div style={{marginLeft: '15px'}}>
                                <FormItem label="优惠条件" style={{marginBottom: '5px'}}>
                                    <Input 
                                        value={_.get(data, `contition`, '')} 
                                        onChange={(e: any) => {onInfoChange(`.info.values.[${index}].contition`, e.target.value)}}
                                        style={{ display: 'inline-block', width: '216px' }}
                                    />
                                </FormItem>
                            </div>
                            <div style={{marginLeft: '15px'}}>
                                <FormItem label="背景颜色" style={{marginBottom: '5px'}}>
                                    <ColorSelect 
                                        value={_.get(data, `infoBgColor`, '')} 
                                        onChange={(e: any) => {onInfoChange(`.info.values.[${index}].infoBgColor`, e.target.value)}}
                                        style={{ display: 'inline-block', width: '216px' }}
                                    />
                                </FormItem>
                            </div>
                            <div style={{marginLeft: '15px'}}>
                                <FormItem label="字体颜色" style={{marginBottom: '5px'}}>
                                    <div>
                                        <span style={{fontSize: '12px'}}>金额</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `valueTextColor`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.[${index}].valueTextColor`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{fontSize: '12px'}}>代金券&条件</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `conditionTextColor`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.[${index}].conditionTextColor`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </div>
                                </FormItem>
                            </div>
                            <div style={{marginLeft: '15px'}}>
                                <FormItem label="按钮颜色" style={{marginBottom: '5px'}}>
                                    <div>
                                        <span style={{fontSize: '12px'}}>字体</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `buttonTextColor`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.[${index}].buttonTextColor`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{fontSize: '12px'}}>背景</span><br/>
                                        <ColorSelect 
                                            value={_.get(data, `buttonColor`, '')} 
                                            onChange={(e: any) => {onInfoChange(`.info.values.[${index}].buttonColor`, e.target.value)}}
                                            style={{ display: 'inline-block', width: '216px' }}
                                        />
                                    </div>
                                </FormItem>
                            </div>
                            {/* <div style={{marginLeft: '15px'}}>
                                <FormItem label="绑定优惠券" style={{marginBottom: '5px'}}>
                                    <Select
                                        value={_.get(data, `bindVoucher.name`, '')} 
                                        onChange={this.handleSelectBindVoucher.bind(this, `[${index}]`)}
                                        style={{ display: 'inline-block', width: '216px' }}
                                    >
                                    {
                                        _.map(voucherList, (voucher, index) => (
                                            <Option value={voucher.id} key={index}>{voucher.name}</Option>
                                        ))
                                    }
                                    </Select>
                                </FormItem>
                            </div> */}
                        </SubMenu>
                    ))
                }
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <Button type="danger" style={{width: '216px'}} onClick={onDelete}>删除</Button>
                </div>
                </Menu>
            </Drawer>
        )
    }
}