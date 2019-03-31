import React, { Component } from "react";
import {
  Row,
  Col,
  Input,
  DatePicker,
  TimePicker,
  Button,
  message
} from "antd";
import moment from "moment";
import { postDate } from "../utlis/fetch";
import { firereg } from "../utlis/reg";
import "./input.css";
const { TextArea } = Input;
class InputTable extends Component {
  state = this.getInit()
  Creat = ()=>{
    
    if(firereg(this.state)){
      let params=Object.assign({},this.state)
      let startdata = `${params.begindata}  ${params.beginTime}`.replace(new RegExp("-","gm"),"/");
      let startdataM=(new Date(startdata)).getTime();
      params.beginTime= startdataM/1000;
      let enddata = `${params.enddata}  ${params.endTime}`.replace(new RegExp("-","gm"),"/");
      let enddataM=(new Date(enddata)).getTime()
      params.endTime= enddataM/1000
      postDate("/addapproval", params).then(data => {
        if(data&&data.code===200){
          message.info("添加成功！")
          this.setState(this.getInit()) 
        }else{
          message.info("添加失败！")
        }
      });
    }else{
    
      message.info("信息填写不正确！");
    }
  };
  from = (type, e) => {
    
    this.setState({ [type]: e.target.value });
  };

  getInit(){
    return {
      // 申请动火单位
      applicant: "",
      // 动火班组
      teams: "",
      // 动火部位
      part: "",
      // 动火种类
      type: "",
      // 级动火
      level: "",
      begindata:"",
      // 动火开始时间
      beginTime: "",
      // 动火结束时间
      enddata:"",
      endTime: "",
      // 动火原因
      remark: "",
      // 监护人
      guardian: "",
      // 申请人
      proposer: ""
    };
  }

  changetime(type, e) {
    this.setState({ [type]: e });
  }
  chnum = (e) => {
    this.setState({ level:e });
  };
  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6} className="textcenter tableheard">
            动火作业审批表
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className=" textRight lin30">工程名称：</span>
            <Input value={"深圳市医疗器械项目"} disabled className="flex1" />
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
            <Input
              value={this.state.applicant}
              onChange={e => {
                this.from("applicant", e);
              }}
              className="flex1"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className="textRight lin30">动火班组：</span>
            <Input
              value={this.state.teams}
              onChange={e => {
                this.from("teams", e);
              }}
              className="flex1"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className=" textRight lin30">动火部位：</span>
            <Input
              value={this.state.part}
              onChange={e => {
                this.from("part", e);
              }}
              className="flex1"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className=" textRight lin30">动火作业类型：</span>
            <Input
              value={this.state.type}
              onChange={e => {
                this.from("type", e);
              }}
              className="flex1"
            />
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
              value={this.state.level}
              onChange={e => {
                this.from("level", e);
              }}
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
                onChange={(e, string) => {
                  this.changetime("begindata", string);
                }}
                className="mr10 flex1 r8"
              />
              <TimePicker
                className="r8"
                onChange={(e, string) => {
                  this.changetime("beginTime", string);
                }}
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
                onChange={(e, string) => {
                  this.changetime("enddata", string);
                }}
                className="mr10 r8"
              />
              <TimePicker
                className="r8"
                onChange={(e, string) => {
                  this.changetime("endTime", string);
                }}
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
            <TextArea
              value={this.state.remark}
              onChange={e => {
                this.from("remark", e);
              }}
              className="flex4"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className=" textRight lin30">监护人：</span>
            <Input
              value={this.state.guardian}
              onChange={e => {
                this.from("guardian", e);
              }}
              className="flex4"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className=" textRight lin30">申请人：</span>
            <Input
              value={this.state.proposer}
              onChange={e => {
                this.from("proposer", e);
              }}
              className="flex4"
            />
          </Col>
        </Row>

        <Row className="mt35 mb60">
          <Col span={16} offset={4}>
            <Button type="primary" block onClick={this.Creat}>
              提交
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default InputTable;
