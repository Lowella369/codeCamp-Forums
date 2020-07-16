import React from "react";
import { HashRouter, BrowserRouter as Router, Route, Switch, Redirect  } from "react-router-dom";
import Navigation from "./components/Navigation.js";
import Footer from "./components/Footer.js";
import "./App.css";

import Login from "./components/Auth/login";
import SignUp from "./components/Auth/signup";

import CreateForum from "./components/Forum/createForum";
import Home from "./components/Home/home";
import Forum from "./components/Forum/forum";
import UpdateForum from "./components/Forum/updateForum";

function App() {

  return (
    <HashRouter>
      <Navigation />
      <div className="d-flex">
        <Switch>
          <Redirect exact path="/" to ="/login" />
          <Route path="/login" component ={Login} />
          <Route path="/signup" component ={SignUp} />
          <Route path="/home" component ={Home} />
          <Route path="/forum" component ={Forum} />
          <Route path="/create" component ={CreateForum} />
          <Route path="/forumupdate/:id" component ={UpdateForum} />
        </Switch>
      </div>
      <Footer/>
    </HashRouter>
  );
}

export default App;
