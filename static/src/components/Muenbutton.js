import React, { Component } from 'react';
import "./login.css"
import 'antd/dist/antd.css';
import { Radio } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Muenbutton extends Component {
  
  handleModeChange=(e)=>{
    this.props.change(e.target.value)
  }
  render() {
    return (
      <div className="bottom">
        <RadioGroup onChange={this.handleModeChange} value={this.props.type}  size="lg" buttonStyle="solid" style={{width:"100%",height:'100%',}}>
        {this.props.typelist&&this.props.typelist.map((item)=>(
           <RadioButton style={{width:'50%',height:'100%',lineHeight: "2.5rem"}} value={item.value}>{item.name}</RadioButton>
        ))}
        </RadioGroup>
      </div>
    );
  }
}

export default Muenbutton;
