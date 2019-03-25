import * as React from 'react'
import Module from './Module'
import EditDrawer from './EditDrawer'
import defaultmoduleInfo from '../defaultValue'

export default class Container extends React.Component<any, any>{
    state = {
        isShowDrawer: false
    }
    
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
        const { status, onDelete, onInfoChange, moduleInfo=defaultmoduleInfo, goodList, voucherList, type} = this.props;
        const { isShowDrawer } = this.state
        
        return (
            <React.Fragment>
                <Module
                    status={status}
                    moduleInfo={moduleInfo}
                    onClick={this.handleCickModule.bind(this)}
                    type={type}
                />
            {
                status == 'edit' 
                ? <EditDrawer
                    visible={isShowDrawer}
                    moduleInfo={moduleInfo}
                    onInfoChange={onInfoChange}
                    onDelete={onDelete}
                    onClose={this.handleCloseDrawer.bind(this)}
                    goodList={goodList}
                    voucherList={voucherList}
                />
                : null
            }
            </React.Fragment>
        )
    }
}