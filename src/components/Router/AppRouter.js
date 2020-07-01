import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "../Common/Nav";
import Home from "../Home/Home";
import About from "../About/About";
import {useAuth0} from "@auth0/auth0-react";
import Boards from "../BoardList/Boards";

const AppRouter = () => {

  const {isAuthenticated, loginWithRedirect} = useAuth0();

  return (<Router>
    <Nav/>
    <Switch>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/about">
        <About/>
      </Route>
      <Route path="/boards" render={() => {
        if (isAuthenticated) {
          return <Boards />
        } else {
          return loginWithRedirect();
        }
      }}>
      </Route>
    </Switch>
  </Router>);

};

export default AppRouter;
