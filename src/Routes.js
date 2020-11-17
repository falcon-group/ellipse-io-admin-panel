import React from "react";
import { PrivateRoute } from "react-auth-kit";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login/Login";
import UsersList from "./components/dashboard/UsersList";
import AddUser from "./components/profile/AddUser";
import NotesUser from "./components/dashboard/NotesUser";
import DeleteUser from "./components/profile/DeleteUser";
import UserHealthDashboard from "./components/dashboard/UserHealthDashbord";
import SettingDashboard from "./components/dashboard/SettingDashboard";
import EditCurrentUser from "./components/profile/EditCurrentUser";
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
        <PrivateRoute
          path={"/delete-user/:id"}
          component={DeleteUser}
          loginPath={"/login"}
          exact
        />
        <PrivateRoute
          path={"/user-info/:id"}
          component={UserHealthDashboard}
          loginPath={"/login"}
          exact
        />

        <PrivateRoute
          path={"/setting"}
          component={SettingDashboard}
          loginPath={"/login"}
          exact
        />

        <PrivateRoute
          path={"/edit-user/:id"}
          component={EditCurrentUser}
          loginPath={"/login"}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
