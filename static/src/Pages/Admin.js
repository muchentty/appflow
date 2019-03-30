import React, { Component } from "react";
import Signout from "../components/Signout";
import Muenbutton from "../components/Muenbutton";
import PowerTable from "../components/PowerTable";
import CheckTable from "../components/CheckTable";
import {loginfailed} from "../utlis/loginfailed";

class Admin extends Component {
  state = {
    type: sessionStorage.getItem("userType"),
    typelist: [
      { name: "权限表", value: "power" },
      { name: "审核明细表", value: "check" }
    ]
  };
  componentDidMount(){
    loginfailed()
  }
  changetype = value => {
    this.setState({ type: value });
  };

  render() {
    return (
      <div>
        <Signout/>
        <div style={{ margin: "0 12px" }}>
          {this.state.type === "power" && <PowerTable />}
        </div>  
          {this.state.type === "check" && <CheckTable  type={this.state.type}/>}
       
        <Muenbutton
          type={this.state.type}
          typelist={this.state.typelist}
          change={this.changetype}
        />
      </div>
    );
  }
}

export default Admin;
