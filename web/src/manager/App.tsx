import * as React from "react"
import { hot } from 'react-hot-loader'
import { Route, Redirect, Switch } from 'react-router-dom'
import PageLayout from './components/PageLayout'
import ActivityContainer from './containers/Activity'
import ActivityDetailContainer from './containers/ActivityDetail'
import GoodContainer from './containers/Good'
import GoodDetailContainer from './containers/GoodDetail'


@hot(module)
export default class extends React.Component<any, any> {
    render() {
        return (
            <PageLayout>
                <Switch>
                    <Route exact path="/activity" component={ActivityContainer}/>
                    <Route exact path="/activity/detail/:activity_id" component={ActivityDetailContainer}/>
                    <Route exact path="/good" component={GoodContainer}/>
                    <Route exact path="/good/detail/:good_id" component={GoodDetailContainer}/>
                    <Redirect to='/activity'></Redirect>
                </Switch>
            </PageLayout>
        );
    }
}