import * as React from "react"
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect} from 'react-router-dom'
import Engine from './containers/Pro'
import Buy from './containers/Buy'

@hot(module)
export default class extends React.Component<any, any> {
    render() {
        return (
            <Switch>
                <Route exact path="/act/pro" component={Engine}/>
                <Route exact path="/act/pro/:id" component={Engine}/>
                <Route exact path="/act/buy" component={Buy}/>
                <Route exact path="/act/buy/:good_id" component={Buy}/>
                <Redirect to='/act/pro'></Redirect>
            </Switch>
        );
    }
}