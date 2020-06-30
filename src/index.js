import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Home from "./components/Home/Home";
import Nav from "./components/Common/Nav";
import About from "./components/About/About";

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain="richardpjames.eu.auth0.com"
            clientId="GZsJrMA1MuvKDi9lWx0XxmhdrSAh9YwW"
            redirectUri={window.location.origin}
            audience="https://richardpjames.eu.auth0.com/api/v2/"
            scope="read:current_user update:current_user_metadata"
        >
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="/about" >
                        <About />
                    </Route>
                </Switch>
            </Router>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
