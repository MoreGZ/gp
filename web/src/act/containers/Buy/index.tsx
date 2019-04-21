import * as React from 'react'
import './style.less'
import {Icon, Col, Row, Carousel, Select, Form, Button} from 'antd'
import ProHeader from '@common/components/ProHeader'
import ProFooter from '@common/components/ProFooter'
import CardSelector from '../../components/CardSelector'
import NumberInput from '../../components/NumberInput'

const Option = Select.Option
const FormItem = Form.Item

export default class Buy extends React.Component{
    render() {
        const color = [
            {value: '奶酪色', label: '奶酪色'},
            {value: '水蓝色', label: '水蓝色'},
        ]
        const version = [
            {value: '单机标配', label: '单机标配'},
            {value: '礼盒套餐', label: '礼盒套餐'},
            {value: '实用套餐（含10张相纸）', label: '实用套餐（含10张相纸）'}
        ]

        
        return (
            <div className='buy_container'>
                <ProHeader></ProHeader>
                <div className="buy_containner_body">
                    <div className="body_breadcrumb">
                        数码>摄影摄像>拍立得>INSTAX >INSTAXmini7C
                    </div>
                    <div className="body_buy">
                        <Row gutter={24}>
                            <Col span={10}>
                            <Carousel dots={false} style={{width: '434px'}}>
                                <div className="img_box">
                                    <img src="/img/test.jpeg" alt=""/>
                                </div>
                                <div className="img_box">
                                    <img src="/img/test.jpeg" alt=""/>
                                </div>
                                <div className="img_box">
                                    <img src="/img/test.jpeg" alt=""/>
                                </div>
                                <div className="img_box">
                                    <img src="/img/test.jpeg" alt=""/>
                                </div>
                            </Carousel>
                            <div className="img_controller">
                                <div className='img_controller_btn'>
                                    <Icon type='left' style={{fontSize: '35px', color: '#c7c7c7'}}></Icon>
                                </div>
                                <div className="img_controller_btn_imgs">
                                    <div className="img_controller_btn_imgs_wrapper" style={{width: '345px'}}>
                                        <div className="img_btn_box">
                                            <img src="/img/test.jpeg" alt=""/>
                                            <div className="img_btn_box_border"></div>
                                        </div>
                                        <div className="img_btn_box">
                                            <img src="/img/test.jpeg" alt=""/>
                                        </div>
                                        <div className="img_btn_box">
                                            <img src="/img/test.jpeg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className='img_controller_btn img_controller_btn_right'>
                                    <Icon type='right' style={{fontSize: '35px', color: '#c7c7c7'}}></Icon>
                                </div>
                            </div>
                            </Col>
                            <Col span={14}>
                                <div className="good_name">
                                    富士一次成像相机（instax）mini7C 相机
                                </div>
                                <div className="good_desc">
                                    自动对焦/即拍即现
                                </div>
                                <div className="good_price">
                                    ￥399
                                </div>
                                <div className="good_send_address">
                                    <FormItem className='input_item' label='配送至' colon={false}>
                                        <Select 
                                        className='input'
                                        style={{width: '214px'}}
                                        size='large'
                                        defaultValue={'广东省广州市番禺区'}
                                        >
                                            <Option key={1} value="广东省广州市番禺区">广东省广州市番禺区</Option>
                                        </Select>
                                        <span class='is_has_good'>有货</span>
                                    </FormItem>
                                </div>
                                <div className="good_config">
                                    <CardSelector label='选择颜色' options={color} onChange={() => {}}></CardSelector>
                                </div>
                                <div className="good_config">
                                    <CardSelector label='选择版本' options={version} onChange={() => {}}></CardSelector>
                                </div>
                                <div className="good_count">
                                    <NumberInput label='数量'></NumberInput>
                                </div>
                                <div className="good_btns">
                                    <Button type='primary'>立即购买</Button>
                                    <Button>加入购物车</Button>
                                    <span className='like'>收藏</span>
                                    <Icon type='star' style={{color: '#bb9d77'}}></Icon>
                                </div>
                                
                            </Col>
                        </Row>
                    </div>
                    <div className="guide_menu">
                        
                    </div>
                    <div className="body_detail"></div>
                    <div className="body_config"></div>
                    <div className="body_comment"></div>
                </div>
                <ProFooter></ProFooter>
            </div>
        )
    }
}