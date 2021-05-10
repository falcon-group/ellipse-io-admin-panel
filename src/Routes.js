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
import ExportHealthParams from "./components/dashboard/ExportHealthParams";
import DateBetweenChart from "./components/dashboard/DateBetweenChart";
import DownLoadAPK from "./components/interface/DownLoadAPK";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path={"/download"} component={DownLoadAPK} exact />
        <Route path={"/login"} component={Login} exact />
        <PrivateRoute
          path={"/users"}
          component={UsersList}
          loginPath={"/login"}
          exact
        />
        <PrivateRoute
          path={"/user/add"}
          component={AddUser}
          loginPath={"/login"}
          exact
        />
        <PrivateRoute
          path={"/user/:customId/notes"}
          component={NotesUser}
          loginPath={"/login"}
          exact
        />
        <PrivateRoute
          path={"/user/:id/delete"}
          component={DeleteUser}
          loginPath={"/login"}
          exact
        />
        <PrivateRoute
          path={"/user/:customId"}
          component={UserHealthDashboard}
          loginPath={"/login"}
          exact
        />

        <PrivateRoute
          path={"/user/:customId/export"}
          component={ExportHealthParams}
          loginPath={"/login"}
          exact
        />

        <PrivateRoute
          path={"/user/:customId/chart"}
          component={DateBetweenChart}
          loginPath={"/login"}
          exact
        />
        <PrivateRoute
          path={"/user/:id/edit"}
          component={EditCurrentUser}
          loginPath={"/login"}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
