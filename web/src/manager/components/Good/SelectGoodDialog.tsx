import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Table, Card, Form, Select, Icon, Popconfirm, Upload, Row, Col, Tag, message, Tooltip, Spin, Modal } from 'antd'
import SelectGood from './SelectGood'
import * as _ from 'lodash'
import { withRouter } from "react-router";

const FormItem = Form.Item

@hot(module)
class GoodTabPane extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            selectedRowKeys: [],
        }
    }

    handleSelect(selectedRowKeys: any) {
        this.setState({
            selectedRowKeys
        })
    }

    render() {
        const { selectedRowKeys } = this.state;
        const { onOk, onCancel, visible, disableRowKeys } = this.props
        
        return (
            <Modal 
            title='添加商品'
            visible={visible} 
            onCancel={onCancel}
            width={'900px'}
            onOk={() => {onOk(selectedRowKeys)}}
            bodyStyle={{padding: '20px 20px 20px 20px'}}
            >
                <SelectGood 
                onSelect={this.handleSelect.bind(this)}
                selectedRowKeys={selectedRowKeys}
                disableRowKeys={disableRowKeys}
                ></SelectGood>
            </Modal>
        );
    }
}

export default withRouter(GoodTabPane)