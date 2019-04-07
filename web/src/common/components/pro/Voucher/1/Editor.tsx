import * as React from 'react'
import Module from './index'
import EditDrawer from '../EditDrawer'

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
        const { status, onDelete, onInfoChange, goodList, voucherList, moduleInfo} = this.props;
        const { isShowDrawer } = this.state
        
        return (
            <React.Fragment>
                <div onClick={this.handleCickModule.bind(this)}>
                    <Module moduleInfo={moduleInfo} />
                </div>
                <EditDrawer
                visible={isShowDrawer}
                moduleInfo={moduleInfo}
                onInfoChange={onInfoChange}
                onDelete={onDelete}
                onClose={this.handleCloseDrawer.bind(this)}
                goodList={goodList}
                voucherList={voucherList}
                />
            </React.Fragment>
        )
    }
}