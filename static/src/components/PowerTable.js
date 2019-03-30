import React, { Component } from "react";
import { Row, Col, Input, Table, Button, Select, message } from "antd";
import { postDate, getData } from "../utlis/fetch";
import { addPersion } from "../utlis/reg";

import "./input.css";
const Option = Select.Option;
class PowerTable extends Component {
  state = this.getInit();
  getInit() {
    return {
      name: "",
      tel: "",
      role: 0,
      passwr: "",
      conpasswr: "",
      page: 1,
      limit: 10,
      dataSource: [],
      columns: [
        {
          title: "姓名",
          dataIndex: "userName",
          key: "name"
        },
        {
          title: "电话",
          dataIndex: "phoneNumber",
          key: "tel"
        },
        {
          title: "角色",
          dataIndex: "role",
          key: "role"
        },
        {
          title: "密码",
          dataIndex: "passwd",
          key: "password"
        }
      ]
    };
  }
  from = (type, e) => {
    this.setState({ [type]: e.target.value });
  };
  componentDidMount() {
    this.getuserlist();
  }
  getuserlist = () => {
    getData(
      `/user/list?page=${this.state.page}&limit=${this.state.limit}`
    ).then(data => {
      if (data && data.code == 200) {
        data.data.map((item,index)=>{
          data.data[index].role = this.roeltrans(item.role)
        })
        
        
        this.setState({ dataSource: data.data });
      }
    });
  };
  
  roeltrans=(str)=>{
    
    let st = ""
    switch(str){
        case 0:
        st=  "管理员";
        break
        case 1:
        st=  "进出审核1";
        break
        case 2:
        st=  "进出审核2";
        break
        case 3:
        st=  "动火申请审核";
        break
        case 4:
        st=  "查看";
        break
    }
    return st
  }
  addpersion = () => {
    let { passwr, conpasswr } = this.state;
    let params = {
      userName: this.state.name,
      phoneNumber: this.state.tel,
      role: this.state.role,
      passwd: this.state.passwr
    };
    if (addPersion(params)) {
      if (passwr === conpasswr) {
        postDate("/user", params).then(data => {
          
          if (data&&data.code === 200) {
            message.info("添加成功！");
            this.setState(this.getInit()) 
          }
        });
      } else {
        message.info("两次密码不一致，请重新输入");
      }
    }else{
      message.info("信息填写不正确！");
    }
  };
  handleChange = value => {
    this.setState({ role: value });
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6} className="textcenter tableheard">
            角色权限
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className=" textRight lin30">姓名：</span>
            <Input
              value={this.state.name}
              onChange={e => {
                this.from("name", e);
              }}
              className="flex1"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className=" textRight lin30">电话：</span>
            <Input
              value={this.state.tel}
              onChange={e => {
                this.from("tel", e);
              }}
              className="flex1"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col className="showtype">
            <span className=" textRight lin30">角色：</span>
            <Select
              defaultValue={0}
              onChange={this.handleChange}
              className="flex1"
            >
              <Option value={0}>管理员</Option>
              <Option value={1}>进出审核1</Option>
              <Option value={2}>进出审核2</Option>
              <Option value={3}>动火申请审核</Option>
              <Option value={4}>查看</Option>
            </Select>
          </Col>
        </Row>
        <Row className="m18">
          <Col className="showtype">
            <span className="textRight lin30">密码：</span>
            <Input
              value={this.state.passwr}
              onChange={e => {
                this.from("passwr", e);
              }}
              className="flex1"
              type="password"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className="textRight lin30">确认密码：</span>
            <Input
              value={this.state.conpasswr}
              onChange={e => {
                this.from("conpasswr", e);
              }}
              className="flex1"
              type="password"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={16} offset={4}>
            <Button type="primary" block onClick={this.addpersion}>
              添加
            </Button>
          </Col>
        </Row>
        <Row className="m18 mb60">
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            bordered
          />
        </Row>
      </div>
    );
  }
}
export default PowerTable;
