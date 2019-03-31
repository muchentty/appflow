import React, { Component } from "react";
import { createHashHistory } from 'history'
import {
  Row,
  Col,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  InputNumber,
  Button
} from "antd";
import moment from "moment";
import Signout from "./Signout";
import { postDate, getData ,deleteDate} from "../utlis/fetch";

import "./input.css";
const RadioGroup = Radio.Group;
class Inputabledetail extends Component {
  
  state = {
    loading: false,
    previewVisible: false,
    previewImage: "",
    fileList: [],
    items: [{ name: "", spec: "", count: 1 }],
    role: sessionStorage.getItem("userType"),
    buttontype:0
  };
  handleCancel = () => this.setState({ previewVisible: false });

  addgooodslist = index => {
    let numlist = this.state.numlist.concat([]);
    if (index === 0) {
      numlist.push({ wupin: "", guige: "", num: 1 });
    } else {
      numlist.splice(index, 1);
    }
    this.setState({ numlist });
  };
  componentDidMount = () => {
    this.getdata();
  };
  getdata = () => {
    getData(`/doc?id=${this.props.match.params.id}&hasPic=0`).then(data => {
      if (data && data.code === 200) {
        this.setState({
          carNumber: data.data.carNumber,
          contact: data.data.contact,
          createTime: data.data.date,
          direction: data.data.direction,
          items: data.data.items,
          name: data.data.name,
          organization: data.data.organization,
        });
      }
    });
    getData(`/doc?id=${this.props.match.params.id}&hasPic=1`).then(data => {
      if (data && data.code === 200) {
        this.setState({
          picUrl: data.data.picUrl?data.data.picUrl:""
        });
      }
    });
  };

  goodssize = () => {
    let list = this.state.items;
    let html = list.map((item, index) => {
      return (
        <div
          className="m18"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "0.5rem",
            position: "relative"
          }}
        >
          <Row>
            <Col span={24} className="showtype">
              <span className="textRight lin30">物品名称：</span>
              <Input value={item.name} disabled className="flex1" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className="textRight lin30">规格型号：</span>
              <Input value={item.spec} disabled className="flex1" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className="textRight lin30">数量：</span>
              <InputNumber value={item.count} disabled className="flex1" />
            </Col>
          </Row>
        </div>
      );
    });
    return html;
  };
  agree = type => {
    //type=0|1 同意|不同意
    postDate(`/doc/process/${this.props.match.params.id}/${type}`).then(data => {
      if (data && data.code === 200) {
        createHashHistory().goBack();
      }
    });
  };

  render() {
    const goodsHtml = this.goodssize();
    return (
      <div>
        <Signout />
        <div style={{ margin: "0 12px" }}>
          <Row>
            <Col span={16} offset={4} className="textcenter tableheard">
              深圳市医疗器械项目进/出场条
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">姓名：</span>
              <Input value={this.state.name} disabled className="flex1" />
            </Col>
          </Row>

          <Row className="m18">
            <Col span={24} className="showtype mr10">
              <span className="textRight lin30">单位：</span>
              <Input
                disabled
                value={this.state.organization}
                className="flex1"
              />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className="textRight lin30">车牌：</span>
              <Input disabled value={this.state.carNumber} className="flex1" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className="textRight lin30">联系方式：</span>
              <Input disabled value={this.state.contact} className="flex1" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className="textRight lin30">方向：</span>
              <RadioGroup
                defaultValue={1}
                value={this.state.direction}
                className="flex4 lin30"
                disabled
              >
                <Radio value={0}>进场</Radio>
                <Radio value={1}>出场</Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">时间：</span>
              <div className="flex1">
                <DatePicker
                  disabled
                  className="mr10 r6"
                  value={moment(this.state.createTime * 1000)}
                />
                <TimePicker
                  disabled
                  className="r6"
                  value={moment(this.state.createTime * 1000)}
                />
              </div>
            </Col>
          </Row>
          {goodsHtml}
         { this.state.picUrl && <Row className="m18">
            <Col span={24} className="showtype">
              <span className="textRight lin30">图片：</span>
              <div
                style={{ width: "12rem", height: "12rem" }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                  src={this.state.picUrl}
                />
              </div>
            </Col>
          </Row>}
          {(this.state.role === "4" || this.state.role === "0") && (
            <Row className="mt35 mb60">
              <Col span={16} offset={4}>
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
          )}
          {(this.state.role === "1" || this.state.role === "2" || this.state.role === "3") && (
            <Row className="mt35 mb60">
              <Col span={6} offset={1}>
                <Button
                  type={this.state.buttontype===0?"primary":""}
                  block
                  onClick={() => {
                    this.setState({ buttontype: 0 }, () => {
                      this.agree(0);
                    });
                  }}
                >
                  同意
                </Button>
              </Col>
              <Col span={6} offset={2}>
                <Button
                   block
                   type={this.state.buttontype===1?"primary":""}
                   onClick={() => {
                     this.setState({ buttontype: 1 }, () => {
                       this.agree(1);
                     });
                   }}
                >
                  不同意
                </Button>
              </Col>
              <Col span={6} offset={2}>
                <Button
                  block
                  type={this.state.buttontype===2?"primary":""}
                  onClick={() => {
                    this.setState({ buttontype: 2 }, () => {
                      deleteDate(
                        `/resource/${this.props.match.params.id}/1`
                      ).then(data => {
                        if (data && data.code === 200) {
                          createHashHistory().goBack();
                        }
                      });
                    });
                  }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          )} 
        </div>
      </div>
    );
  }
}
export default Inputabledetail;
