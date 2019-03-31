import React, { Component } from "react";
import CheckTable from "../components/CheckTable";
import Signout from "../components/Signout";
import {loginfailed} from "../utlis/loginfailed";
class Anquan extends Component {
  state = {
    type:  sessionStorage.getItem("userType"),
  };
  changetype = value => {
    this.setState({ type: value });
  };
  componentDidMount(){
    loginfailed()
  }
  render() {
    return (
      <div>
        <Signout />
        <div style={{ margin: "0 12px" }}>
          <CheckTable type={this.state.type} />
        </div>
      </div>
    );
  }
}

export default Anquan;
