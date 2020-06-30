import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout";
import Login from "./Login";

const AuthPanel = () => {
    const { isAuthenticated } = useAuth0();

    if(isAuthenticated) {
        return <Logout />
    } else {
        return <Login />
    }
};

export default AuthPanel;