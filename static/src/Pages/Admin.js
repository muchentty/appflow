import React, { Component } from "react";
import Signout from "../components/Signout";
import Muenbutton from "../components/Muenbutton";
import PowerTable from "../components/PowerTable";
import CheckTable from "../components/CheckTable";
import {loginfailed} from "../utlis/loginfailed";

class Admin extends Component {
  state = {
    type: sessionStorage.getItem("userType"),
    typebutton:"power",
    typelist: [
      { name: "权限表", value: "power" },
      { name: "审核明细表", value: "check" }
    ]
  };
  componentDidMount(){
    loginfailed()
  }
  changetype = value => {
    this.setState({ typebutton: value });
  };

  render() {
    return (
      <div>
        <Signout/>
        <div style={{ margin: "0 12px" }}>
          {this.state.typebutton === "power" && <PowerTable />}
          {this.state.typebutton === "check" && <CheckTable  type={this.state.type}/>}
        </div>  
        <Muenbutton
          type={this.state.typebutton}
          typelist={this.state.typelist}
          change={this.changetype}
        />
      </div>
    );
  }
}

export default Admin;
