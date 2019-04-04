import * as React from 'react'
import { Layout, Menu, Icon, Drawer, message } from 'antd';
import * as _ from 'lodash'
import { withRouter } from 'react-router-dom'
import AddModuleDraw from './AddModuleDraw'
import EditNull from '@common/components/pro/Null'
import ProHeader from '@common/components/ProHeader'
import ProFooter from '@common/components/ProFooter'
import AddComponentsHoc from './AddComponentsHoc'
import * as Voucher1 from '@common/components/pro/Voucher/1'
import * as Good1 from '@common/components/pro/Good/1'
import * as Banner from '@common/components/pro/Banner'

const { Content, Sider} = Layout;

class Engine extends React.Component<any, any> {
    state = {
        current: 'unset',
        selectedKeys: ['unset'],
        isShowDrawer: false,
        voucherList: new Array(),
        goodList: new Array(),
        pageConfig: new Array()
    }

    addModuleMenu = [
        {
            title: "Banner",
            key: 'banner',
            subMenu: [
                // {
                //     contentImgLink: 'http://localhost:7003/img/pro/banner1.png',
                //     key: 'banner_1'
                // }
            ]
        },
        {
            title: "Photo",
            key: 'photo',
            subMenu: [
                {
                    contentImgLink: 'http://localhost:7003/img/pro/photo1.png',
                    key: 'photo_1'
                }
            ]
        },
        {
            title: "商品",
            key: 'good',
            subMenu: [
                {
                    contentImgLink: 'http://localhost:7003/img/pro/good1.png',
                    key: 'good_1'
                },
                {
                    contentImgLink: 'http://localhost:7003/img/pro/good2.png',
                    key: 'good_2'
                },
                {
                    contentImgLink: 'http://localhost:7003/img/pro/good3.png',
                    key: 'good_3'
                },
            ]
        },
        {
            title: "代金券",
            key: 'voucher',
            subMenu: [
                {
                    contentImgLink: 'http://localhost:7003/img/pro/voucher1.png',
                    key: 'voucher_1'
                },
                {
                    contentImgLink: 'http://localhost:7003/img/pro/voucher2.png',
                    key: 'voucher_2'
                },
                {
                    contentImgLink: 'http://localhost:7003/img/pro/voucher3.png',
                    key: 'voucher_3'
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

    componentDidMount() {
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
        const { pageConfig } = this.state

        pageConfig.splice(moduleIndex, 1);

        this.setState({
            pageConfig
        })
    }

    handleClickMenu(option: any) {
        const { item, key, keyPath } = option
        console.log(key)
        switch(key) {
            // case 'save':
            //     this.handelPublicPage();
            //     break;
            // case 'public':
            //     this.handelPublicPage();
            //     break;
            default:
                break;
        }
    }

    handleModuleInfoChange(moduleIndex: number, keyPath: string, value: any) {
        const { pageConfig } = this.state;

        console.log(`[${moduleIndex}]${keyPath}`);
        console.log(value)
        console.log(pageConfig)

        _.set(pageConfig, `[${moduleIndex}]${keyPath}`, value)

        this.setState({
            pageConfig
        })
    }

    handleModuleInfoAdd(moduleIndex: any, moduleType: any) {
        console.log(moduleIndex, moduleType);
    }

    hendleModuleInfoDelete(moduleIndex: number, infoIndex: number) {
        console.log(moduleIndex, infoIndex);
    }

    handleAddModule(moduleConfig: any) {
        console.log(moduleConfig)
        this.setState((preState: any) => {
            let { pageConfig } = preState;
            
            if(moduleConfig) {
                pageConfig.push(moduleConfig)
            }else {
                message.error('组件不存在')
            }
            
            return {pageConfig}
        }, () => {
            console.log(this.state.pageConfig);
        })
    }

    _renderModule(moduleConfig: any, index: number) {
        const { goodList, voucherList } = this.state
        const { Components } = this.props
        
        const moduleInfo = _.get(moduleConfig, `info`, {});
        let Module: any = Components[moduleConfig.version] 
        // console.log(moduleInfo, 'moduleInfo')
        // console.log(moduleConfig, 'moduleConfig')
        // console.log(Module, 'Module')
        if(!Module) {
            return (): any => {return null}
        }

        return (
            <Module 
                goodList={goodList}
                voucherList={voucherList}
                key={index}
                moduleInfo={moduleInfo} 
                onDelete={this.handleDeleteModule.bind(this, index)}
                onInfoChange={this.handleModuleInfoChange.bind(this, index)}
                onInfoDelete={this.hendleModuleInfoDelete.bind(this, index)}
                onInfoAdd={this.handleModuleInfoAdd.bind(this, index, moduleConfig.type)}
            />
        )
    }

    render() { 
        const { selectedKeys, isShowDrawer, pageConfig, current } = this.state
        const { menu } = this.props

        console.log(pageConfig, 'pageConfig')

        return (
            <React.Fragment>
                <AddModuleDraw
                    onAddModule={this.handleAddModule.bind(this)}
                    onClose={this.handleCloseDrawer.bind(this)}
                    visible={isShowDrawer}
                    current={current}
                    menu={menu}
                />
                <Layout>
                    <Sider 
                        style={{  overflow: 'auto', height: '100vh', position: 'fixed', left: 0, background: '#fff'}}
                        width={100}
                    >
                        <div style={{height: '64px', background: '#bb9d77', lineHeight: '64px', textAlign: 'center'}}>
                            <img src="http://localhost:7003/img/logo.png" alt="" height="42" width="44"></img>
                        </div>
                        <Menu mode="inline" selectedKeys={selectedKeys} onClick={this.handleClickMenu.bind(this)}>
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

export default AddComponentsHoc([
    Voucher1,
    Good1,
    Banner
])(Engine)