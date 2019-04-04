import * as React from "react"
import { hot } from 'react-hot-loader'
import Engine from './components/Engine'
import './style.less'


@hot(module)
export default class extends React.Component<any, any> {
    render() {
        return (
            <Engine></Engine>
        );
    }
}