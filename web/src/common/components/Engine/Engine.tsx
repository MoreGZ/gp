import * as React from 'react'
import { Layout, Menu, Icon, Drawer, message } from 'antd';
import * as _ from 'lodash'
import { withRouter } from 'react-router-dom'
import ProHeader from '@common/components/ProHeader'
import ProFooter from '@common/components/ProFooter'
import AddComponentsHoc from '@common/components/AddComponentsHoc'
import * as Voucher1 from '@common/components/pro/Voucher/1'
import * as Good1 from '@common/components/pro/Good/1'
import { PageApi } from '../../services/api'

class Engine extends React.Component<any, any> {
    state = {
        voucherList: new Array(),
        goodList: new Array(),
    }

    _renderModule(moduleConfig: any, index: number | string) {
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
        const { pageConfig } = this.props

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