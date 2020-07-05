import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "../Common/Nav";
import Home from "../Home/Home";
import About from "../About/About";
import Dashboard from "../Dashboard/Dashboard";
import BoardPage from "../Board/BoardPage";

const AppRouter = () => {

  return (<Router>
    <Nav/>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/board/:boardId" component={BoardPage} />
    </Switch>
  </Router>);

};

export default AppRouter;
