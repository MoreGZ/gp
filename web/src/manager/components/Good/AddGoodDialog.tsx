import * as React from "react"
import { hot } from 'react-hot-loader'
import { Input, Button, Form, Select, Icon, Modal, Upload, Row, Col, Tag } from 'antd'
import './style.less'
import * as _ from 'lodash'
import BaseInfoForm from './BaseInfoForm'
import ConfigInfoForm from './ConfigInfoForm'

@hot(module)
class AddGoodDialog extends React.Component<any, any> {
    render() {
        const { 
            visible, 
            category,
            onCancel, 
            baseFields, 
            config, 
            onBaseFieldChange, 
            onUpload, 
            onChangeConfigName,
            onItemInputChange,
            onAddConfig, 
            onDeleteConfig, 
            onAddConfigItem, 
            onDeleteConfigItem, 
            onSubmit 
        } = this.props;
        
        return (
            <Modal 
            visible={visible} 
            onCancel={onCancel}
            footer={null}
            className='add_good_dialog'
            width={'833px'}
            bodyStyle={{padding: '50px 56px 30px 56px'}}
            >
                <BaseInfoForm
                formFields={baseFields}
                category={category}
                onChange={onBaseFieldChange}
                // onUpload={onUpload}
                />
                <ConfigInfoForm
                config={config}
                onChangeName={onChangeConfigName}
                onItemInputChange={onItemInputChange}
                onAdd={onAddConfig}
                onDelete={onDeleteConfig}
                onAddItem={onAddConfigItem}
                onDeleteItem={onDeleteConfigItem}
                />
                <div className='sure_btn_box'>
                    <Button 
                    type='primary'
                    className='base_btn sure_btn'
                    onClick={onSubmit}
                    >完成<Icon type='check'></Icon></Button>
                </div>
            </Modal>
        );
    }
}

export default AddGoodDialog;