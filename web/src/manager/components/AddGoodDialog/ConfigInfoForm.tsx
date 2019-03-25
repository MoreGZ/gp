import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Form, Select, Icon, Modal, Upload, Row, Col, Tag } from 'antd'
import './style.less'
import * as _ from 'lodash'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

@hot(module)
class ConfigInfoForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            itemInputValue: ''
        }
    }

    handleClickAddItem() {
        const { onAddItem } = this.props
    }

    render() {
        const { config, onAdd, onDelete, onAddItem, onDeleteItem, onChangeName, onItemInputChange } = this.props;
        
        return (
            <div>
                <FormItem>
                    <Button 
                    className='add_config_btn'
                    onClick={onAdd}
                    ><Icon type='plus'></Icon>添加商品配置</Button>
                </FormItem>
            {
                _.map(config, (value, index) => {
                    return (
                        <div className="config_edit_box" key={index}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <FormItem label='配置名称'>
                                        <Input 
                                        className='input' 
                                        value={value.name} 
                                        onChange={(e) => {onChangeName(e.target.value, index)}}>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem label='配置选项'>
                                        <Row>
                                            <Input 
                                            className='input' 
                                            style={{width: '150px'}}
                                            value={value.itemInput}
                                            onChange={(e) => {onItemInputChange(e.target.value, index)}}
                                            ></Input>
                                            <Button 
                                            className='base_btn ml15' 
                                            type='primary' 
                                            style={{borderRadius: '30px'}}
                                            onClick={() => {onAddItem(index)}}
                                            >添加</Button>
                                        </Row>
                                        <Row>
                                        {
                                            _.map(value.value, (item, subIndex) => {
                                                return (
                                                    <Tag
                                                    key={subIndex}
                                                    closable
                                                    visible={true}
                                                    onClose={() => {onDeleteItem(index, subIndex)}}
                                                    style={{borderRadius: '30px', height: '30px', lineHeight: '30px'}}
                                                    >
                                                    {item}
                                                    </Tag>
                                                )
                                            })
                                        }
                                        </Row>
                                    </FormItem>
                                </Col>
                                <Col>
                                    <Icon type='close' style={{cursor: 'pointer'}} onClick={() => {onDelete(index)}}></Icon>
                                </Col>
                            </Row>
                        </div>
                    )
                })
            }
            </div>
        );
    }
}

export default ConfigInfoForm