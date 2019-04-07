import * as React from 'react'
import Module from '.'
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
        const { onDelete, onInfoChange, moduleInfo, goodList, voucherList} = this.props;
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