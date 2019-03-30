import React, { Component } from 'react';
import  Muen from "../components/loginmune"
import Muenbutton from "../components/Muenbutton"
import Inputable from "../components/Inputable"
import Firetable from "../components/Firetable"

class Home extends Component {
  state={
    type:"inout",
    typelist:[{name:"进出场条",value:"inout"},{name:"动火审批",value:"fire"}]
  }
  changetype=(value)=>{
    this.setState({type:value})
  }

  render() {
    return (
      <div>
          <Muen/>  
            <div style={{margin:"0 12px"}}>
               {this.state.type==="inout" && <Inputable/> } 
               {this.state.type==="fire" && <Firetable/>} 
               {/* <Firetable/>  */}
            </div>
          <Muenbutton type={this.state.type} typelist={this.state.typelist} change={this.changetype} />  
      </div>
    );
  }
}

export default Home;
