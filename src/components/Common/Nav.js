import React from 'react';
import AuthPanel from "../Auth/AuthPanel";
import {Link} from "react-router-dom";

const Nav = (props) => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
            <span className="navbar-brand">RetroSpectacle</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><i className="fas fa-home mr-1"></i> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about"><i className="fas fa-question mr-1"></i> About</Link>
                        </li>
                    </ul>
                </div>
                <div className="ml-auto">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <AuthPanel/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;