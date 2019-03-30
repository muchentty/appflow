import React, { Component } from "react";
import { createHashHistory } from 'history'
import { Row, Col, Input, Icon, Button, message, } from "antd";
import "./logined.css";
import { postDate } from "../utlis/fetch";

class Login extends Component {
 
  state = {
    name: "",
    password: ""
  };

  login = () => {
    let params = {
      userName: this.state.name,
      passwd: this.state.password
    };
    if (
      this.state.name.replace(/\s+/, "").length == 0 ||
      this.state.password.length == 0
    ) {
      message.info("请输入用户名跟密码");
    } else {
      postDate("/login", params).then(data => {
        if (data&&data.code === 200) {
          sessionStorage.setItem("userType", data.data.role);
          switch (data.data.role) {
            case 0: // 管理员
              createHashHistory().push("/admin");
              break;
            case 1:
              createHashHistory().push("/Audited");
              break;
            case 2:
              createHashHistory().push("/Audited");
              break;
            case 3:
              createHashHistory().push("/Audited");
              break;
            case 4:
              createHashHistory().push("/see");
              break;
          }
       
        }
      });
      

    }
  };
  from = (type, e) => {
    this.setState({ [type]: e.target.value });
  };
  render() {
    return (
      <div className="banner" style={{ height: document.body.clientHeight }}>
        <div className="logincent">
          <Row>
            <Col span={12} offset={6} className="textcenter title">
              登 录
            </Col>
          </Row>

          <Row>
            <Col span={18} offset={3} className="m18">
              <Icon type="user" className="mr8" />
              用户名
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={3} className="textcenter mt4 ">
              <Input
                onChange={e => {
                  this.from("name", e);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={3} className="mt15">
              <Icon type="lock" className="mr8" />
              密码
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={3} className="textcenter mt4">
              <Input
                onChange={e => {
                  this.from("password", e);
                }}
                type="password"
              />
            </Col>
          </Row>
          <Row className="m18 ">
            <Col span={18} offset={3}>
              <Button type="primary" block onClick={this.login}>
                登录
              </Button>
            </Col>
          </Row>
          <Row className="mt15">
            <Col span={18} offset={3}>
              <Button
                block
                onClick={() => {
                  
                  createHashHistory().goBack();
                }}
              >
                返回
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Login;
