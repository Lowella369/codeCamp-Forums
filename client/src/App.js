import React from "react";
import { BrowserRouter as Router, Route, Switch, Link  } from "react-router-dom";
import Navigation from "./components/Navigation.js";
import Footer from "./components/Footer.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Auth/login";
import SignUp from "./components/Auth/signup";

import CreateForum from "./components/Forum/createForum";
import Home from "./components/Home/home";
import Forum from "./components/Forum/forum";
import UpdateForum from "./components/Forum/updateForum";

function App() {

  return (
    <Router>
      <Navigation />
      <div className="d-flex">
        <Switch>
          <Route path="/login" exact component ={Login} />
          <Route path="/signup" component ={SignUp} />
          <Route path="/home" component ={Home} />
          <Route path="/forum" component ={Forum} />
          <Route path="/create" component ={CreateForum} />
          <Route path="/forumupdate/:id" component ={UpdateForum} />
        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
