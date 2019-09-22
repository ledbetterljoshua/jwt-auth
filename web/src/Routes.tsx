import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Home } from "./scenes/Home";
import { Login } from "./scenes/Login";
import { Register } from "./scenes/Register";
import { Bye } from "./scenes/Bye";
import { Header } from "./containers/Header";

export const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/bye" render={props => <Bye {...props} />} />
          <Route
            exact
            path="/register"
            render={props => <Register {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
