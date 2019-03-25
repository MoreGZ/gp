import * as React from 'react'
import Module from './Module'
import EditDrawer from './EditDrawer'

export default class Container extends React.Component<any, any> {
    state = {
        isShowDrawer: false
    }

    defaultmoduleInfo = [
        {
            img: '/public/imgs/banner.jpeg',
            link: 'http://www.baidu.com'
        }
    ]
    
    handleCickModule() {
        this.setState({
            isShowDrawer: true
        })
    }

    handleCloseDrawer() {
        this.setState({
            isShowDrawer: false
        })
    }
    
    render() {
        const { status, onDelete, onInfoAdd, onInfoChange, onInfoDelete, moduleInfo=this.defaultmoduleInfo} = this.props;
        const { isShowDrawer } = this.state
        
        return (
            <React.Fragment>
                <Module
                    status={status}
                    moduleInfo={moduleInfo}
                    onClick={this.handleCickModule.bind(this)}
                />
            {
                status == 'edit' 
                ? <EditDrawer
                    visible={isShowDrawer}
                    moduleInfo={moduleInfo}
                    onInfoChange={onInfoChange}
                    onInfoAdd={onInfoAdd}
                    onInfoDelete={onInfoDelete}
                    onDelete={onDelete}
                    onClose={this.handleCloseDrawer.bind(this)}
                />
                : null
            }
            </React.Fragment>
        )
    }
}