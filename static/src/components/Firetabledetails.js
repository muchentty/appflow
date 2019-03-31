import React, { Component } from "react";
import { createHashHistory } from 'history'
import {
  Row,
  Col,
  Input,
  DatePicker,
  TimePicker,
  Button
} from "antd";
import moment from "moment";
import Signout from "./Signout";
import { postDate,getData,deleteDate } from "../utlis/fetch";

import "./input.css";
const { TextArea } = Input;
class InputTable extends Component {
  state = {
    role:sessionStorage.getItem("userType")
  };
  componentDidMount = () => {
    this.getdata();
  };
  getdata = () => {
    getData(`/approval?id=${this.props.match.params.id}`).then(data => {
      if(data&&data.code===200){
        this.setState({ ...data.data });
      }
    });
  };
  agree=(type,)=>{
    //type=0|1 同意|不同意
  
    postDate(`/approval/process/${this.props.match.params.id}/${type}`).then((data)=>{
      if(data&&data.code===200){
        createHashHistory().goBack();
      }
    })  
  }
  render() {
    return (
      <div>
        <Signout />
        <div style={{ margin: "0 12px" }}>
          <Row>
            <Col span={12} offset={6} className="textcenter tableheard">
              动火作业审批表
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">工程名称：</span>
              <Input value={"深圳市医疗项目"} disabled className="flex1" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">施工单位：</span>
              <Input
                value={"中建三局第二建设工程有限公司"}
                disabled
                className="flex1"
              />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">申请单位：</span>
              <Input value={this.state.applicant} disabled className="flex1" />
            </Col>
          </Row>

          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">动火班组：</span>
              <Input value={this.state.teams} disabled className="flex1" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">动火部位：</span>
              <Input value={this.state.part} disabled className="flex1" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">动火作业类型：</span>
              <Input value={this.state.type} disabled className="flex1" />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="showtype">
              <span className="w90 textRight lin30" />
              <span className="flex1">(用气、气焊、电焊等) </span>
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">动火作业级别：</span>
              <Input
                disabled
                value={this.state.level}
                className="flex2 mr10"
              />
              <span className="flex15 lin30">级动火</span>
            </Col>
          </Row>

          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">动火开始时间：</span>
              <div className="flex1">
                <DatePicker
                  value={moment(this.state.beginTime*1000)}
                  disabled
                  className="mr10 r8"
                />
                <TimePicker
                  value={moment(this.state.beginTime*1000)}
                  disabled
                  className="r6"
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
              </div>
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">动火结束时间：</span>
              <div className="flex1">
                <DatePicker
                  className="mr10 r8"
                  value={moment(this.state.endTime*1000)}
                  disabled
                />
                <TimePicker
                  disabled
                  className="r6"
                  value={moment(this.state.endTime*1000)}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
              </div>
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30" />
              <span className="flex4">
                动火原因。防火的主要安全措施个配备的消防器材：{" "}
              </span>
            </Col>
          </Row>
          <Row className="mt4">
            <Col span={24} className="showtype">
              <span className=" textRight lin30" />
              <TextArea disabled value={this.state.remark} className="flex4" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span disabled className=" textRight lin30">
                监护人：
              </span>
              <Input disabled value={this.state.guardian} className="flex4" />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className=" textRight lin30">申请人：</span>
              <Input disabled value={this.state.proposer} className="flex4" />
            </Col>
          </Row>

         {(this.state.role === "4" || this.state.role === "0") && <Row className="mt35 mb60">
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
         }
          {(this.state.role === "1" || this.state.role === "2" || this.state.role === "3") && (
            <Row className="mt35 mb60">
              <Col span={6} offset={1}>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    this.agree(0)
                  }}
                >
                  同意
                </Button>
              </Col>
              <Col span={6} offset={2}>
                <Button
                  block
                  onClick={() => {
                    this.agree(1)
                  }}
                >
                  不同意
                </Button>
              </Col>
              <Col span={6} offset={2}>
                <Button
                  block
                  onClick={() => {
                    deleteDate(`/resource/${this.props.match.params.id}/2`).then(()=>{
                      this.getuserlist();
                    })
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
export default InputTable;
