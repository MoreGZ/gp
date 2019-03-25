import * as React from 'react'
import { Layout, Menu, Icon, Drawer, message } from 'antd';
import { withRouter } from 'react-router-dom'
import EditNull from '@common/components/pro/EditNull/index'
import ProHeader from '@common/components/pro/ProHeader/index'
import ProFooter from '@common/components/pro/ProFooter/index'
import EditableBanner1 from '@common/components/pro/EditableBanner/EditableBanner1/Container'
import EditableVoucher1 from '@common/components/pro/EditableVoucher/EditableVoucher1/Container'
import EditableGood1 from '@common/components/pro/EditableGood/EditableGood1/Container'

import EditableBannerDefaultInfo from '@common/components/pro/EditableBanner/defaultValue'
import EditableVoucherDefaultInfo from '@common/components/pro/EditableVoucher/defaultValue'
import EditableGoodDefaultInfo from '@common/components/pro/EditableGood/defaultValue'
import * as _ from 'lodash'
import './style.less'

const { Header, Content, Footer, Sider} = Layout;
const { SubMenu } = Menu;

class PageContainer extends React.Component<any, any> {
    state = {
        current: 'unset',
        selectedKeys: ['unset'],
        isShowDrawer: false,
        voucherList: new Array(),
        goodList: new Array(),
        pageConfig: new Array(),
        moduleInfos: new Array()
    }

    addModuleMenu = [
        {
            title: "Banner",
            key: 'banner',
            subMenu: [
                {
                    contentImgLink: '/public/imgs/png/banner1.png',
                    key: 'banner1'
                }
            ]
        },
        {
            title: "Photo",
            key: 'photo',
            subMenu: [
                {
                    contentImgLink: '/public/imgs/png/photo1.png',
                    key: 'photo1'
                }
            ]
        },
        {
            title: "商品",
            key: 'good',
            subMenu: [
                {
                    contentImgLink: '/public/imgs/png/good1.png',
                    key: 'good1'
                },
                {
                    contentImgLink: '/public/imgs/png/good2.png',
                    key: 'good2'
                },
                {
                    contentImgLink: '/public/imgs/png/good3.png',
                    key: 'good3'
                },
            ]
        },
        {
            title: "代金券",
            key: 'voucher',
            subMenu: [
                {
                    contentImgLink: '/public/imgs/png/voucher1.png',
                    key: 'voucher1'
                },
                {
                    contentImgLink: '/public/imgs/png/voucher2.png',
                    key: 'voucher2'
                },
                {
                    contentImgLink: '/public/imgs/png/voucher3.png',
                    key: 'voucher3'
                },
            ]
        },
    ]

    editMenu = [
        {text: '保存', key: 'save', icon: <Icon type="save" />},
        {text: '撤销', key: 'back', icon: <Icon type="rollback" />},
        {text: '前进', key: 'forward', icon: <Icon type="right" />},
        {text: '清空', key: 'clear', icon: <Icon type="delete" />},
        {text: '视图', key: 'view', icon: <Icon type="eye" />},
        {text: '预览', key: 'preview', icon: <Icon type="file" />},
        {text: '发布', key: 'public', icon: <Icon type="upload" />}
    ]

    moduleDefaultInfoMap = {
        good: EditableGoodDefaultInfo,
        voucher: EditableVoucherDefaultInfo,
        banner: EditableBannerDefaultInfo,
        photo: {},
    }

    componentDidMount() {
        this._getGoodList();
        this._getVoucherList();
        this._getActivityPageConfig();
    }

    _getVoucherList() {
        // const { router: { query } } = this.props

        // return getVoucherListApi({activityId: query.id }).then((res) => {
        //     const { data } = res;
                        
        //     this.setState({
        //         voucherList: data.list
        //     })
        // })
    }

    _getGoodList() {
        // const { router: { query } } = this.props

        // return getGoodListByActivityIdApi({activityId: query.id }).then((res) => {
        //     const { data } = res;
                        
        //     this.setState({
        //         goodList: data
        //     })
        // })
    }

    handleShowEditDrawer() {
        this.setState({
            isShowDrawer: true
        })
    }

    handleCloseDrawer() {
        this.setState({
            isShowDrawer: false
        })
    }

    handleDeleteModule(moduleIndex: number) {
        const { pageConfig, moduleInfos } = this.state
        console.log(moduleIndex);
        pageConfig.splice(moduleIndex, 1);
        moduleInfos.splice(moduleIndex, 1);

        this.setState({
            pageConfig,
            moduleInfos
        }, () => {
            console.log(this.state.pageConfig, this.state.moduleInfos);
        })
    }

    handelPublicPage() {
        const { pageConfig, moduleInfos } = this.state
        // const { router: { query }, router } = this.props

        // const data = {
        //     activityId: query.id,
        //     pageConfig: {
        //         pageConfig,
        //         moduleInfos
        //     }
        // }

        // saveActivityPageConfigApi(data).then((res) => {
        //     message.success('操作成功')
        // })
    }

    _getActivityPageConfig() {
        const { pageConfig, moduleInfos } = this.state
        // const { router: { query }, router } = this.props

        // const data = {
        //     activityId: query.id,
        // }

        // getActivityPageConfigApi(data).then((res) => {
        //     const { pageConfig, moduleInfos } = res.data
        //     this.setState({
        //         pageConfig,
        //         moduleInfos
        //     })
        // })
    }

    handleClickMenu(option: any) {
        const { item, key, keyPath } = option
        console.log(key)
        switch(key) {
            case 'save':
                this.handelPublicPage();
                break;
            case 'public':
                this.handelPublicPage();
                break;
            default:
                break;
        }
    }

    handleModuleInfoChange(moduleIndex: number, key: string, value: any) {
        const { moduleInfos } = this.state;
        console.log(moduleInfos)
        console.log(`[${moduleIndex}]${key}`);
        console.log(value);
        key !== undefined 
        ? _.set(moduleInfos, `[${moduleIndex}]${key}`, value) 
        : _.set(moduleInfos, `[${moduleIndex}]`, value);
        console.log(moduleInfos)
        this.setState({
            moduleInfos
        }, () => {
            console.log(this.state.moduleInfos)
        })
    }

    handleModuleInfoAdd(moduleIndex: any, moduleType: any) {
        console.log(moduleIndex, moduleType);
    }

    hendleModuleInfoDelete(moduleIndex: number, infoIndex: number) {
        console.log(moduleIndex, infoIndex);
    }

    handleAddModule(option: any) {
        const { item, key, keyPath } = option
        this.setState((preState: any) => {
            let { pageConfig, moduleInfos } = preState;

            pageConfig.push({
                type: keyPath[1],
                version: keyPath[0]
            })
            
            let defaultInfo = this.moduleDefaultInfoMap[keyPath[1]]
            defaultInfo = _.isArray(defaultInfo) ? defaultInfo.slice(0) : _.extend({}, defaultInfo);
            moduleInfos.push(defaultInfo);

            return {pageConfig, moduleInfos}
        }, () => {
            console.log(this.state.pageConfig, this.state.moduleInfos);
        })
    }

    _renderModule(moduleConfig: any, index: number) {
        const { moduleInfos, goodList, voucherList } = this.state
        
        const moduleInfo = _.get(moduleInfos, `[${index}]`, {});
        let Module: any
        let extralConfig = {
            type: NaN
        }

        switch(moduleConfig.version) {
            case 'banner1': 
                Module = EditableBanner1
                break;
            case 'voucher1': 
                Module = EditableVoucher1
                break;
            case 'good1': 
                Module = EditableGood1
                break;
            case 'good2': 
                Module = EditableGood1
                extralConfig.type = 1
                break;
            default: 
                Module = () => { return  };
        }

        return (
            <Module 
                {...extralConfig}
                goodList={goodList}
                voucherList={voucherList}
                kye={index}
                status='edit' 
                moduleInfo={moduleInfo} 
                onDelete={this.handleDeleteModule.bind(this, index)}
                onInfoChange={this.handleModuleInfoChange.bind(this, index)}
                onInfoDelete={this.hendleModuleInfoDelete.bind(this, index)}
                onInfoAdd={this.handleModuleInfoAdd.bind(this, index, moduleConfig.type)}
            />
        )
    }

    render() { 
        const { selectedKeys, isShowDrawer, pageConfig } = this.state

        return (
            <React.Fragment>
                <Drawer
                    title="添加区块"
                    placement='left'
                    style={{padding: '0px'}}
                    closable={true}
                    visible={isShowDrawer}
                    onClose={this.handleCloseDrawer.bind(this)}
                >
                    <Menu
                        onClick={this.handleAddModule.bind(this)}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                    >
                    {
                        _.map(this.addModuleMenu, (subMenu) => (
                            <SubMenu key={subMenu.key} title={subMenu.title}>
                            {
                                _.map(subMenu.subMenu, (menuItem) => (
                                    <Menu.Item key={menuItem.key} style={{height: 'auto', marginBottom: '15px'}} className='img-menu-item'>
                                        <img src={menuItem.contentImgLink} width='180'/>
                                    </Menu.Item>
                                ))
                            }
                            </SubMenu>
                        ))
                    }
                    </Menu>
                </Drawer>
                <Layout>
                    <Sider 
                        style={{  overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}
                        width={100}
                    >
                        <div style={{height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}} />
                        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onClick={this.handleClickMenu.bind(this)}>
                        {
                            _.map(this.editMenu, (item) => {
                                return (
                                    <Menu.Item key={item.key}>
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </Menu.Item>
                                )
                            })
                        }
                        </Menu>
                    </Sider>
                    <Layout style={{ marginLeft: 100, background: '#fff' }}>
                        <ProHeader/>
                        {
                            _.map(pageConfig, (moduleConfig, index) => this._renderModule(moduleConfig, index))
                        }
                        <Content style={{ margin: '24px 20px', overflow: 'initial' }}>
                            <EditNull onClick={this.handleShowEditDrawer.bind(this)}/>
                        </Content>
                        <ProFooter/>
                    </Layout>
                </Layout>
            </React.Fragment>
        )
    }
}

export default PageContainer;