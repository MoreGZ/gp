import * as React from 'react'
import { Layout, Menu, Icon, Drawer, message } from 'antd';
import * as _ from 'lodash'
import { withRouter } from 'react-router-dom'
import ProHeader from '@common/components/ProHeader'
import ProFooter from '@common/components/ProFooter'
import AddComponentsHoc from '@common/components/AddComponentsHoc'
import * as Voucher1 from '@common/components/pro/Voucher/1'
import * as Good1 from '@common/components/pro/Good/1'

const { Content, Sider} = Layout;

class Engine extends React.Component<any, any> {
    state = {
        voucherList: new Array(),
        goodList: new Array(),
        pageConfig: [
            {
                type: 'good',
                version: 'good_1',
                info: {
                    float: 'left',
                    values: {
                        name: '商品名称',
                        coverImg: '',
                        desc: '商品描述balabalabala',
                        price: 8888,
                        activityPrice: 6888,
                        buttonColor: 'bisque',
                        buttonTextColor: 'rgb(83,83,83)',
                        nameColor: 'rgb(83,83,83)',
                        descColor: 'rgb(83,83,83)',
                        priceColor: 'rgb(83,83,83)',
                        bcColor: '#fff',
                        bindGood: {},
                    }
                }
            },
            {
                type: 'voucher',
                version: 'voucher_1',
                info: {
                    values: [
                        {
                            value: 10,
                            contition: '满200元使用',
                            buttonColor: 'rgb(255,255,255)',
                            infoBgColor: '#bb9d77',
                            valueTextColor: 'rgb(83,83,83)',
                            conditionTextColor: 'rgb(83,83,83)',
                            buttonTextColor: 'rgb(83,83,83)',
                            bindVoucher: {},
                        },
                        {
                            value: 10,
                            contition: '满200元使用',
                            buttonColor: 'rgb(255,255,255)',
                            infoBgColor: '#bb9d77',
                            valueTextColor: 'rgb(83,83,83)',
                            conditionTextColor: 'rgb(83,83,83)',
                            buttonTextColor: 'rgb(83,83,83)',
                            bindVoucher: {},
                        },
                        {
                            value: 10,
                            contition: '满200元使用',
                            buttonColor: 'rgb(255,255,255)',
                            buttonTextColor: 'rgb(83,83,83)',
                            infoBgColor: '#bb9d77',
                            valueTextColor: 'rgb(83,83,83)',
                            conditionTextColor: 'rgb(83,83,83)',
                            bindVoucher: {},
                        },
                        {
                            value: 10,
                            contition: '满200元使用',
                            buttonColor: 'rgb(255,255,255)',
                            infoBgColor: '#bb9d77',
                            valueTextColor: 'rgb(83,83,83)',
                            conditionTextColor: 'rgb(83,83,83)',
                            buttonTextColor: 'rgb(83,83,83)',
                            bindVoucher: {},
                        }
                    ]
                }
            }
        ]
    }

    _renderModule(moduleConfig: any, index: number) {
        const { goodList, voucherList } = this.state
        const { Components } = this.props
        
        const moduleInfo = _.get(moduleConfig, `info`, {});
        let Module: any = Components[moduleConfig.version] 
        if(!Module) {
            return (): any => {return null}
        }

        return (
            <Module 
                goodList={goodList}
                voucherList={voucherList}
                key={index}
                moduleInfo={moduleInfo} 
            />
        )
    }

    render() { 
        const { pageConfig } = this.state

        console.log(pageConfig, 'pageConfig')

        return (
            <Layout style={{background: '#fff' }}>
                <ProHeader/>
                {
                    _.map(pageConfig, (moduleConfig, index) => this._renderModule(moduleConfig, index))
                }
                <ProFooter/>
            </Layout>
        )
    }
}

export default AddComponentsHoc([
    Voucher1,
    Good1,
], 'act')(Engine)