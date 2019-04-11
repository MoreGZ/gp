import * as React from 'react'
import { Layout, Menu, Icon, Drawer, message } from 'antd';
import * as _ from 'lodash'
import { withRouter } from 'react-router-dom'
import AddModuleDraw from '../components/AddModuleDraw'
import EditNull from '@common/components/pro/Null'
import ProHeader from '@common/components/ProHeader'
import ProFooter from '@common/components/ProFooter'
import AddComponentsHoc from '@common/components/AddComponentsHoc'
import util from '@common/libs/util'

import * as Voucher1 from '@common/components/pro/Voucher/1'
import * as Good1 from '@common/components/pro/Good/1'
import * as Banner from '@common/components/pro/Banner'
import { PageApi } from '../services/api';

const { Content, Sider} = Layout;

class Engine extends React.Component<any, any> {
    state = {
        current: 'unset',
        selectedKeys: ['unset'],
        isShowDrawer: false,
        isLoading: false,
        voucherList: new Array(),
        goodList: new Array(),
        editHistory: new Array(),
        historyIndex: -1,
        pageConfig: new Array(),
    }

    editMenu = [
        {text: '保存', key: 'save', icon: <Icon type="save" />},
        {text: '撤销', key: 'back', icon: <Icon type="rollback" />},
        {text: '前进', key: 'forward', icon: <Icon type="right" />},
        {text: '清空', key: 'clear', icon: <Icon type="delete" />},
        // {text: '视图', key: 'view', icon: <Icon type="eye" />},
        {text: '预览', key: 'preview', icon: <Icon type="file" />},
        {text: '发布', key: 'public', icon: <Icon type="upload" />},
        {text: '下架', key: 'offline', icon: <Icon type="arrow-down" />}
    ]
    
    t: NodeJS.Timeout;

    componentDidMount() {
        this.getPageConfigEdit()

        this.t = setInterval(() => {
            this.saveEditConfig('自动保存成功')
        }, 20000)
    }

    getPageConfigEdit() {
        this.setState({
            isLoading: true
        }, () => {
            PageApi.getPageEditConfig({
                page_id: this.props.match.params.id
            }).then(res => {
                const { data: {config} } = res;
                this.setState({
                    pageConfig: config,
                    editHistory: [ util.deepClone(config) ],
                    historyIndex: 0
                })
            }).catch((error) => {
                message.error(error.message)
                throw error
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    saveEditConfig(successMsg= '保存成功') {
        return PageApi.save({
            page_id: this.props.match.params.id,
            config_edit: this.state.pageConfig
        }).then(res => {
            message.success(successMsg)
        }).catch((error) => {
            message.error(`保存失败：${error.message}`)
            throw error
        })
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

    handleClickMenu(option: any) {
        const { item, key, keyPath } = option

        switch(key) {
            case 'save':
                this.handleSaveConfig();
                break;
            case 'public':
                this.handelPublicPage();
                break;
            case 'offline':
                this.handelOfflinePage();
                break;
            case 'back':
                this.handleReturnBack();
                break;
            case 'forward':
                this.handleForward();
                break;
            case 'clear':
                this.handleClear();
                break;
            default:
                break;
        }
    }

    handelPublicPage() {
        this.setState({
            isLoading: true
        }, () => {
            PageApi.public({
                page_id: +this.props.match.params.id
            }).then(res => {
                message.success('发布成功')
            }).catch((error) => {
                message.error(error.message)
                throw error
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    handelOfflinePage() {
        this.setState({
            isLoading: true
        }, () => {
            PageApi.offline({
                page_id: +this.props.match.params.id
            }).then(res => {
                message.success('页面下架成功')
            }).catch((error) => {
                message.error(error.message)
                throw error
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    handleSaveConfig() {
        this.setState({
            isLoading: true
        }, () => {
            this.saveEditConfig().finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    handleReturnBack() {
        if( this.state.historyIndex < 0 ) { //没有编辑历史，无法进行撤回操作
            return 
        }

        this.setState((preState: any) => {
            let { historyIndex, editHistory } = preState

            historyIndex = historyIndex > 0 ? historyIndex-1 : 0

            return {
                historyIndex,
                pageConfig: util.deepClone(editHistory[historyIndex])
            }
        }, () => {
            console.log(this.state.editHistory)
            console.log(this.state.pageConfig)
            console.log(this.state.historyIndex)
        })
    }

    handleForward() {
        if( this.state.historyIndex < 0 ) {  //没有编辑历史，无法进行撤回操作
            return 
        }

        this.setState((preState: any) => {
            let { historyIndex, editHistory } = preState

            historyIndex = historyIndex < editHistory.length-1 ? historyIndex+1 : editHistory.length-1

            return {
                historyIndex,
                pageConfig: util.deepClone(editHistory[historyIndex])
            }
        }, () => {
            console.log(this.state.editHistory)
            console.log(this.state.pageConfig)
            console.log(this.state.historyIndex)
        })
    }

    handleClear() {
        this.setState((preState: any) => {
            const { pageConfig } = preState

            
            this.saveHistory([])
            return {
                pageConfig: new Array()
            }
        })
    }

    handleAutoSave() {
        this.saveEditConfig('自动保存成功')
    }

    saveHistory(config: any) {
        const cloneConfig = util.deepClone(config)

        this.setState((preState: any) => {
            let { historyIndex, editHistory } = preState

            if(historyIndex < editHistory.length-1 && historyIndex>=0) { // 进行了后退操作
                editHistory = editHistory.slice(0, historyIndex+1)
            }

            editHistory.push(cloneConfig)
            historyIndex++

            return {
                editHistory,
                historyIndex
            }
        }, () => {
            console.log(this.state.editHistory)
            console.log(this.state.pageConfig)
            console.log(this.state.historyIndex)
        })
    }

    handleModuleInfoChange(moduleIndex: number, keyPath: string, value: any) {
        const { pageConfig } = this.state;

        // console.log(`[${moduleIndex}]${keyPath}`);
        // console.log(value)
        // console.log(pageConfig)

        _.set(pageConfig, `[${moduleIndex}]${keyPath}`, value)
        this.saveHistory(pageConfig)

        this.setState({
            pageConfig
        })
    }

    handleAddModule(moduleConfig: any) {
        this.setState((preState: any) => {
            let { pageConfig } = preState;
            
            if(moduleConfig) {
                pageConfig.push(moduleConfig)
                this.saveHistory(pageConfig)
            }else {
                message.error('组件不存在')
            }
            
            return {pageConfig}
        })
    }

    handleDeleteModule(moduleIndex: number) {
        const { pageConfig } = this.state

        pageConfig.splice(moduleIndex, 1);
        this.saveHistory(pageConfig)

        this.setState({
            pageConfig
        })
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
                onDelete={this.handleDeleteModule.bind(this, index)}
                onInfoChange={this.handleModuleInfoChange.bind(this, index)}
            />
        )
    }

    render() { 
        const { selectedKeys, isShowDrawer, pageConfig, current } = this.state
        const { menu } = this.props

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
    // Banner
])(withRouter(Engine))