import React, { Component } from "react";
// import { Router, hashHistory  ,Route } from 'react-router';
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Anquan from "./Pages/Anquan";
import Audited from "./Pages/Audited";
import Inputabledetail from "./components/Inputabledetail";
import Firetabledetails from "./components/Firetabledetails";

import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/see" component={Anquan} />
          <Route path="/Audited" component={Audited} />
          <Route path="/inout/:id" component={Inputabledetail} />
          <Route path="/fire/:id" component={Firetabledetails} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
