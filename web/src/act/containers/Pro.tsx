import * as React from 'react'
import { message } from 'antd';
import * as _ from 'lodash'
import PreEngine from '@common/components/Engine/Engine'
import { withRouter } from 'react-router-dom'
import { PageApi } from '../services/api'

class Engine extends React.Component<any, any> {
    state = {
        pageConfig: new Array()
    }

    getPageConfig() {
        this.setState({
            isLoading: true
        }, () => {
            PageApi.getPageConfig({
                page_id: this.props.match.params.id
            }).then(res => {
                const { data: {config} } = res;
                this.setState({
                    pageConfig: config
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

    componentDidMount() {
        this.getPageConfig()
    }

    render() { 
        const { pageConfig } = this.state

        return (
            <PreEngine pageConfig={pageConfig}></PreEngine>
        )
    }
}

export default withRouter(Engine)