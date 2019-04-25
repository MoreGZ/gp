import * as React from 'react'
import { Layout, Menu, Icon, Drawer, message } from 'antd';
import * as _ from 'lodash'
import { withRouter } from 'react-router-dom'
import ProHeader from '@common/components/ProHeader'
import ProFooter from '@common/components/ProFooter'
import AddComponentsHoc from '@common/components/AddComponentsHoc'

import * as Voucher1 from '@common/components/pro/Voucher/1'
import * as Voucher2 from '@common/components/pro/Voucher/2'
import * as Voucher3 from '@common/components/pro/Voucher/3'
import * as Good1 from '@common/components/pro/Good/1'
import * as Good2 from '@common/components/pro/Good/2'
import * as Banner from '@common/components/pro/Banner'
import * as Photo from '@common/components/pro/Photo'

class Engine extends React.Component<any, any> {

    _renderModule(moduleConfig: any, index: number | string) {
        const { Components } = this.props
        
        const moduleInfo = _.get(moduleConfig, `info`, {});
        let Module: any = Components[moduleConfig.version] 
        if(!Module) {
            return (): any => {return null}
        }

        return (
            <div className="module_wrapper">
                <Module 
                    key={index}
                    moduleInfo={moduleInfo} 
                />
            </div>
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
    Voucher2,
    Voucher3,
    Good1,
    Good2,
    Banner,
    Photo
], 'act')(Engine)