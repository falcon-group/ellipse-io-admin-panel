import React from 'react'
import { PrivateRoute } from 'react-auth-kit'
import { BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/dashboard/Dashboard'
import UsersList from './components/dashboard/UsersList'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>

                <Route path={'/login' } component={Login} exact/>
                <PrivateRoute path={'/dashboard'} component={Dashboard} loginPath={'/login'} exact/>
                <PrivateRoute path={'/users'} component={UsersList} loginPath={'/login'} exact/>

            </Switch>
        </BrowserRouter>
    )
}

export default Routes