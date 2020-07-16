import { Link  } from "react-router-dom";
import React from 'react';

const SideMenu = () => {
  return (
    <nav 
      className="navbar container-fluid position-fixed" 
      style={{
        alignItems: 'baseline',
        maxWidth: 300
      }}
    >
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/forum"} className="nav-link">My Post</Link>
        </li>
        <li className="nav-item">
          <Link to={"/create"} className="nav-link">Create Post</Link>
        </li>
      </div>
    </nav>
  );
};

export default SideMenu;