import * as React from 'react'
import { Card, Icon, Steps, Button, message, Tag, Modal, Spin } from 'antd'
import { withRouter } from 'react-router-dom'
import BaseInfo from '../../components/Activity/BaseInfo'
import SelectGood from '../../components/Good/SelectGood'
import AddVoucher from '../../components/Voucher/AddVoucher'
import { ActivityApi, VoucherApi, PageApi } from '../../services/api'
import './style.less'
import _ = require('lodash');

const Step = Steps.Step
class CreateActivity extends React.Component<any, any> {

    constructor(props: any) {
        super(props)

        this.initialBaseInfo= {
            status: {
                value: 0
            }
        }

        this.state = {
            currentStep: 0,
            baseInfoFormFields: this.initialBaseInfo,
            voucherFormFields: {},
            selectedGoodIds: [],
            voucherList: [],
            isVoucherDialogVisible: false,
            isLoading: false,
            currentId: NaN
        }
    }

    BaseInfoForm: any
    voucherDialog: any
    initialBaseInfo: any

    handleBaseInfoChange(allFields: any) {
        this.setState({
            baseInfoFormFields: allFields
        })
    }

    handleNextStep() {
        if(this.state.currentStep === 0) {
            return this.BaseInfoForm.validateFields((errors: any, values: any) => {
                if(errors) {
                    return 
                }

                this.setState((preState: any) => {
                    let { currentStep } = preState
        
                    return {
                        currentStep: currentStep < 3 ? currentStep+1 : currentStep
                    }
                })
            })
        }

        if(this.state.currentStep === 2) {
            const { baseInfoFormFields, voucherFormFields, selectedGoodIds, voucherList} = this.state
            console.log(baseInfoFormFields, 'baseInfoFormFields')
            console.log(voucherFormFields, 'voucherFormFields')
            console.log(selectedGoodIds, 'selectedGoodIds')
            
            return this.setState({
                isLoading: true
            }, () => {
                return ActivityApi.add({
                    name: baseInfoFormFields.name.value,
                    status: baseInfoFormFields.status.value,
                    begin_date: baseInfoFormFields.date.value[0].format('YYYY-MM-DD hh:mm:ss'),
                    end_date: baseInfoFormFields.date.value[1].format('YYYY-MM-DD hh:mm:ss')
                }).then(res => {
                    this.setState({
                        currentId: res.data.inserRes.results.insertId
                    })
                    return res.data.inserRes.results.insertId
                }).then((id) => {
                    let allPromises = _.map(voucherList, (voucher) => {
                        return VoucherApi.add({
                            name: voucher.name,
                            threshold: voucher.threshold,
                            value: voucher.value,
                            period_start: voucher.period[0].format('YYYY-MM-DD hh:mm:ss'),
                            period_end: voucher.period[1].format('YYYY-MM-DD hh:mm:ss'),
                            num: voucher.num,
                            status: voucher.status ? 1 : 0,
                            scenes: voucher.scenes,
                            category_id: voucher.category_id,
                            goods: voucher.goods,
                            activity_id: id
                        })
                    })
                    allPromises.push(ActivityApi.addGoodToActivity({
                        good_ids: selectedGoodIds,
                        activity_id: id
                    }))
                    console.log(allPromises)
                    return Promise.all(allPromises)
                }).then(res => {
                    message.success('添加成功')
                    this.setState({
                        currentStep: 3
                    })
                }).catch((err) => {
                    message.error(err.message)
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                })  
            })
        }
        
        this.setState((preState: any) => {
            let { currentStep } = preState

            return {
                currentStep: currentStep < 3 ? currentStep+1 : currentStep
            }
        })
    }

    handlePreStep() {
        this.setState((preState: any) => {
            let { currentStep } = preState

            return {
                currentStep: currentStep > 0 ? currentStep-1 : currentStep
            }
        })
    }

    handleSelect(selectedGoodIds: any) {
        this.setState({
            selectedGoodIds
        })
    }
    
    handleEditPage() {
        this.setState({
            isLoading: true,
            isDialogVisible: false,
            dialogFormField: {}
        }, () => {
            PageApi.add({
                title: '活动页面',
                activity_id: +this.state.currentId
            }).then((res) => {
                // message.success('成功')
                console.log(res)
                window.open(`/editor/pro/${res.data.inserRes.results.insertId}`)
                this.props.history.goBack()
            }).catch((err) => {
                message.error(`添加失败：${err.message}`)
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    handleClickBack() {
        this.props.history.goBack()
    }

    handleVoucnerChange(allFields: any) {
        this.setState({
            voucherFormFields: allFields
        })
    }

    handleAddVoucher() {
        const { voucherList, voucherFormFields } = this.state
        
        voucherList.push({
            ..._.mapValues(voucherFormFields, (item) => item.value)
        })
        this.setState({
            voucherList,
            voucherFormFields: {},
            isVoucherDialogVisible: false
        })
    }

    render() {
        const { currentStep, baseInfoFormFields, selectedGoodIds, voucherFormFields, isVoucherDialogVisible, voucherList, isLoading } = this.state
        console.log(baseInfoFormFields)
        return (
            <div className='mt15 create_activity_wrapper'>
                <Card
                title={<span><Icon type='caret-right' className='title_arrow'></Icon> 创建活动 <Icon style={{float: "right", marginTop: '4px'}} type='close' onClick={this.handleClickBack.bind(this)}></Icon></span>}
                >
                    <Spin spinning={isLoading}>
                        <div className='step_wrapper'>
                            <Steps current={currentStep} progressDot>
                                <Step title="基本信息"/>
                                <Step title="选择商品"/>
                                <Step title="创建代金券"/>
                                <Step title="创建页面"/>
                            </Steps>
                        </div>
                        
                        <div className="content_wrapper">
                            {
                                currentStep === 0 &&
                                <BaseInfo
                                formFields={baseInfoFormFields}
                                onChange={this.handleBaseInfoChange.bind(this)}
                                ref={(BaseInfoForm) => this.BaseInfoForm = BaseInfoForm}
                                ></BaseInfo>
                            }
                            {
                                currentStep === 1 &&
                                <SelectGood 
                                onSelect={this.handleSelect.bind(this)}
                                selectedRowKeys={selectedGoodIds}
                                disableRowKeys={[]}
                                ></SelectGood>
                            }
                            {
                                currentStep === 2 &&
                                <div style={{height: '300px', paddingTop: '100px'}}>
                                    {
                                        voucherList.length > 0 &&
                                        <div
                                            style={{marginBottom: '26px'}}
                                        >
                                            <div style={{color: '#bb9d77', fontSize: '16px', marginBottom: '5px'}}>已添加代金券</div>
                                        {
                                            _.map(voucherList, (voucher, index) => {
                                                return <Tag key={index}>{voucher.name}</Tag>
                                            })
                                        }
                                        </div>
                                    }
                                    <div className='btns_wrapper'>
                                        <Button 
                                        type='primary'
                                        className='base_btn next_btn'
                                        onClick={() => {this.setState({isVoucherDialogVisible: true})}}
                                        >添加代金券</Button>
                                    </div>
                                    <Modal
                                        width='700px'
                                        visible={isVoucherDialogVisible}
                                        onOk={this.handleAddVoucher.bind(this)}
                                        onCancel={() => {this.setState({isVoucherDialogVisible: false, voucherFormFields: {}})}}
                                    >
                                        <AddVoucher
                                        formFields={voucherFormFields}
                                        onChange={this.handleVoucnerChange.bind(this)}
                                        ref={(ref) => this.voucherDialog = ref}
                                        ></AddVoucher>
                                    </Modal>
                                </div>
                                
                            }
                            {
                                currentStep === 3 &&
                                <div style={{height: '300px', paddingTop: '100px'}}>
                                    <div className='btns_wrapper'>
                                        <Button 
                                        type='primary'
                                        className='base_btn next_btn'
                                        onClick={this.handleEditPage.bind(this)}
                                        >开启页面模板化搭建</Button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='btns_wrapper'>
                        {
                            currentStep > 0 && currentStep < 3 && 
                            <Button 
                            type='primary'
                            className='base_btn next_btn mr20'
                            onClick={this.handlePreStep.bind(this)}
                            ><Icon type='left'></Icon>上一步</Button>
                        }
                        {
                            currentStep < 3 && 
                            <Button 
                            type='primary'
                            className='base_btn next_btn'
                            onClick={this.handleNextStep.bind(this)}
                            >下一步<Icon type='right'></Icon></Button>
                        }
                        </div>
                    </Spin>
                </Card>
            </div>

        )
    }
}

export default withRouter(CreateActivity)