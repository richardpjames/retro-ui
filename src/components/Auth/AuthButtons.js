import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const AuthButtons = () => {
  const {isAuthenticated} = useAuth0();

  if (isAuthenticated) {
    return <LogoutButton/>
  } else {
    return <LoginButton/>
  }
};

export default AuthButtons;
