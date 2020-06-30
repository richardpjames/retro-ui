import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";

const Logout = () => {
    const {logout} = useAuth0();

    return (<Link className="nav-link" onClick={() => logout()}>
        <i className="fas fa-sign-out-alt mr-1"></i> Log Out
    </Link>);
};

export default Logout;