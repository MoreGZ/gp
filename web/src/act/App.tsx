import * as React from "react"
import { hot } from 'react-hot-loader'
import { Route, Redirect, Switch } from 'react-router-dom'
import Engine from './components/Engine'
import './style.less'

@hot(module)
export default class extends React.Component<any, any> {
    render() {
        return (
            <Switch>
                <Route exact path="/pro" component={Engine}/>
                <Route exact path="/pro/:id" component={Engine}/>
                <Redirect to='/pro'></Redirect>
            </Switch>
        );
    }
}