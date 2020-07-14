import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  const isLoggedIn = localStorage.getItem('USER_ID');
  const userName = localStorage.getItem('NAME');

  return (
    <Fragment>
      <div className="navigation">
        <nav class="navbar navbar-expand-lg navbar-success bg-success">
          <div class="container">
            <Link class="navbar-brand text-white" to="/">
              CodeCamp Community
            </Link>
              <ul class="navbar-nav ml-auto">
                {Boolean(isLoggedIn) && (
                  <li class={`d-flex align-items-center nav-item ${props.location.pathname === "/login" ? "active" : ""}`}>
                    Welcome {userName}{'! '}
                    <Link class="nav-link text-white" to="/login" onClick={() => {
                      localStorage.setItem('USER_ID', '');
                    }}>
                      Log Out
                    </Link>
                  </li>
                )}
                {!Boolean(isLoggedIn) && (
                  <Fragment>
                    <li class={`nav-item ${props.location.pathname === "/login" ? "active" : ""}`}>
                      <Link class="nav-link text-white" to="/login">Log in</Link>
                    </li>
                    <li class={`nav-item ${props.location.pathname === "/signup" ? "active" : "" }`}>
                      <Link class="nav-link text-white" to="/signup">
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