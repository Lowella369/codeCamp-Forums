import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  const isLoggedIn = localStorage.getItem('USER_ID');
  const userName = localStorage.getItem('NAME');

  return (
    <Fragment>
      <div className="navigation sticky-top">
      <nav class="navbar navbar-dark navbar-expand-lg ">
          {Boolean(isLoggedIn) && (
            <Link className="navbar-brand text-white" to="/home">
              CodeCamp Community
            </Link>
          )}
          {!Boolean(isLoggedIn) && (
            <Link className="navbar-brand text-white" to="/login">
              CodeCamp Community
            </Link>
          )}
          <button className="navbar-toggler hamburger-menu" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul class="navbar-nav">
          {Boolean(isLoggedIn) && (
            <Fragment>
              <li className="nav-item dropdown navItemCustom  active">
              <Link className={`d-flex align-items-center nav-item ${props.location.pathname === "/login" ? "active" : ""}`}  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     {userName}<span class="sr-only">(current)</span>
              </Link>
               <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
               <Link to={"/home"} className="nav-link"> Home</Link>
                <Link to={"/forum"} className="nav-link">My Post</Link>
                  <Link to={"/create"} className="nav-link">Create Post</Link>
                </div>
                    
                  </li>
                  <li class="nav-item"><Link class="nav-link text-white" to="/login" onClick={() => {
                    localStorage.setItem('USER_ID', '');
                  }}>
                    Log Out
                  </Link></li>
            </Fragment>
                  
                  
                  
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