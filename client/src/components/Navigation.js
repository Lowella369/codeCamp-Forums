import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  const isLoggedIn = localStorage.getItem('USER_ID');
  const userName = localStorage.getItem('NAME');

  return (
    <Fragment>
      <div className="navigation">
        <nav className="navbar navbar-dark navbar-expand-lg">
          {Boolean(isLoggedIn) && (
            <Link className="navbar-brand logo" to="/home">
              CodeCamp Community
            </Link>
          )}
          {!Boolean(isLoggedIn) && (
            <Link className="navbar-brand logo" to="/login">
              CodeCamp Community
            </Link>
          )}
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div  className="navbar-nav ml-auto nav">
              {Boolean(isLoggedIn) && (
                <Fragment>
                  <Link to={"/home"} className="nav-link text-white navi"> Home</Link>
                  <Link to={"/forum"} className="nav-link text-white navi">My Post</Link>
                  <Link to={"/create"} className="nav-link text-white navi">Create Post</Link>
                  <Link className="nav-link text-white navi" to="/login" onClick={() => {
                    localStorage.setItem('USER_ID', ''); }}>
                    Log Out
                  </Link>
                </Fragment>
              )} {!Boolean(isLoggedIn) && (
                <Fragment>
                  <li className={`nav-item ${props.location.pathname === "/login" ? "active" : ""}`}>
                    <Link class="nav-link text-white navi" to="/login">
                      Log in
                    </Link>
                  </li>
                  <li class={`nav-item ${props.location.pathname === "/signup" ? "active" : "" }`}>
                    <Link class="nav-link text-white navi" to="/signup">
                      Sign up
                    </Link>
                  </li>
                </Fragment>
              )}
            </div>
          </div>
        </nav>
      </div>
  </Fragment>
  );
}

export default withRouter(Navigation);