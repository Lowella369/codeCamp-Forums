import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  const isLoggedIn = localStorage.getItem('USER_ID');
  const userName = localStorage.getItem('NAME');

  return (
    <Fragment>
      <div className="navigation">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">
              CodeCamp Community
            </Link>
              <ul className="navbar-nav ml-auto">
                {Boolean(isLoggedIn) && (
                  <li className={`d-flex align-items-center nav-item ${props.location.pathname === "/login" ? "active" : ""}`}>
                    Welcome {userName}{'! '}
                    <Link className="nav-link text-white" to="/login" onClick={() => {
                      localStorage.setItem('USER_ID', '');
                    }}>
                      Log Out
                    </Link>
                  </li>
                )}
                {!Boolean(isLoggedIn) && (
                  <Fragment>
                    <li className={`nav-item ${props.location.pathname === "/login" ? "active" : ""}`}>
                      <Link className="nav-link text-white" to="/login">Log in</Link>
                    </li>
                    <li className={`nav-item ${props.location.pathname === "/signup" ? "active" : "" }`}>
                      <Link className="nav-link text-white" to="/signup">
                        Sign up
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}

export default withRouter(Navigation);