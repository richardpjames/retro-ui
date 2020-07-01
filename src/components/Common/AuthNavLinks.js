import React from 'react';
import AuthButtons from "../Auth/AuthButtons";

const AuthNavLinks = (props) => {
    return (<ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <AuthButtons/>
        </li>
    </ul>);
};

export default AuthNavLinks;