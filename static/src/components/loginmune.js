import React, { Component } from "react";
import { createHashHistory } from 'history'
import "./login.css";

class Muen extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  login = () => {
    createHashHistory().push('/login')
  };
  render() {
    return (
      <div className="loginmuen">
        <span className="login" onClick={this.login}>
          <img src={require("../Static/login.png")} />
        </span>
      </div>
    );
  }
}

export default Muen;
