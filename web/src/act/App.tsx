import * as React from "react"
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect} from 'react-router-dom'
import Engine from './containers/Pro'

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