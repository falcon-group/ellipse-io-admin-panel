import React from "react";
import { PrivateRoute } from "react-auth-kit";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import UsersList from "./components/dashboard/UsersList";
import AddUser from "./components/dashboard/AddUser";
import NotesUser from "./components/dashboard/NotesUser";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route path={"/login"} component={Login} exact />
        <PrivateRoute
          path={"/users"}
          component={UsersList}
          loginPath={"/login"}
          exact
        />
        <PrivateRoute
          path={"/add-user"}
          component={AddUser}
          loginPath={"/login"}
          exact
        />
        <PrivateRoute
          path={"/notes-user/:id"}
          component={NotesUser}
          loginPath={"/login"}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
