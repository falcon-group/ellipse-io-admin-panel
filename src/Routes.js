import React from 'react'
import { PrivateRoute } from 'react-auth-kit'
import { BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SecureComponent from './components/SecureComponent'
import Dashboard from './components/dashboard/Dashboard'
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>

                {/* <Route path={'/'} component={Home} exact/> */}
                <Route path={'/login' } component={Login} exact/>
                {/* <Route path={'/dashboard' } component={Dashboard} exact/> */}
                {/* <PrivateRoute path={'/secure'} component={SecureComponent} loginPath={'/login'} exact/> */}
                <PrivateRoute path={'/dashboard'} component={Dashboard} loginPath={'/login'} exact/>

            </Switch>
        </BrowserRouter>
    )
}

export default Routes