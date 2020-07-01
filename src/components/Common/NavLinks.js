import React from 'react';
import {Link} from "react-router-dom";
import ProtectedNavLinks from "./ProtectedNavLinks";

const NavLinks = (props) => {

    return (<div>
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/"><i className="fas fa-home mr-1"></i> Home</Link>
            </li>
            <ProtectedNavLinks />
            <li className="nav-item">
                <Link className="nav-link" to="/about"><i className="fas fa-question mr-1"></i> About</Link>
            </li>
        </ul>
    </div>
    );

}

export default NavLinks;