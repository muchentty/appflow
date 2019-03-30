import React, { Component } from 'react';
import { createHashHistory } from 'history'
import {Icon} from "antd"
import "./login.css"

class Signout extends Component {
   
    login=()=>{
        createHashHistory().push("/")
    }
    render() {
        return (
        <div className="loginmuen">   
            <span  style={{paddingRight: "1rem"}} onClick={this.login} >
                <Icon type="export" style={{fontSize:"1.5rem",color:"#fff", marginTop:"10px"}} />
            </span>      
        </div>
        );
    }
}



export default Signout;
