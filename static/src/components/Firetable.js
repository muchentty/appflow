import React, { Component } from "react";
import { Row, Col, Input, DatePicker, TimePicker, Button, message,Icon} from "antd";
import moment from "moment";
import $ from "jquery"
import { postDate } from "../utlis/fetch";
import { firereg } from "../utlis/reg";
import "./input.css";
import "./cropper.min.css";
import "./ImgCropping.css";
const { TextArea } = Input;
class InputTable extends Component {
  state = this.getInit();
  Creat = () => {
    if (firereg(this.state)) {
      let params = Object.assign({}, this.state);
      let startdata = `${params.begindata}  ${params.beginTime}`.replace(
        new RegExp("-", "gm"),
        "/"
      );
      let startdataM = new Date(startdata).getTime();
      params.beginTime = startdataM / 1000;
      let enddata = `${params.enddata}  ${params.endTime}`.replace(
        new RegExp("-", "gm"),
        "/"
      );
      let enddataM = new Date(enddata).getTime();
      params.endTime = enddataM / 1000;
      postDate("/addapproval", params).then(data => {
        if (data && data.code === 200) {
          message.info("添加成功！");
          this.setState(this.getInit());
        } else {
          message.info("添加失败！");
        }
      });
    } else {
      message.info("信息填写不正确！");
    }
  };
  from = (type, e) => {
    this.setState({ [type]: e.target.value });
  };

  getInit() {
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
      begindata: "",
      // 动火开始时间
      beginTime: "",
      // 动火结束时间
      enddata: "",
      endTime: "",
      // 动火原因
      remark: "",
      picUrl:"",
      // 监护人
      guardian: "",
      // 申请人
      proposer: ""
    };
  }

  handleChange = (e, value) => {
    //弹出框水平垂直居中
    this.toggle();
    (window.onresize = function() {
      var win_height = $(window).height();
      var win_width = $(window).width();
      if (win_width <= 768) {
        $(".tailoring-content").css({
          top: (win_height - $(".tailoring-content").outerHeight()) / 2,
          left: 0
        });
      } else {
        $(".tailoring-content").css({
          top: (win_height - $(".tailoring-content").outerHeight()) / 2,
          left: (win_width - $(".tailoring-content").outerWidth()) / 2
        });
      }
    })();
  };

  toggle = () => {
    $(".tailoring-container").toggle();
  };
  selectImg = file => {
    if (!file.currentTarget.files || !file.currentTarget.files[0]) {
      return;
    }
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      let re = reader.result;
      window.jQuery("#tailoringImg1").cropper("replace", re, false); //默认false，适应高度，不失真
    });
    reader.readAsDataURL(file.currentTarget.files[0]);
  };

  sureCut = () => {
    if ($("#tailoringImg1").attr("src") == null) {
      return false;
    } else {
      let cas = window.jQuery("#tailoringImg1").cropper("getCroppedCanvas"); //获取被裁剪后的canvas
      let base64url = cas.toDataURL("image/png"); //转换为base64地址形式
      this.photoCompress(base64url, url => {
        this.setState({ picUrl: url });
      });
      //关闭裁剪框
      this.toggle();
    }
  };

  canvasDataURL = (path, obj, callback) => {
    // 默认按比例压缩
    let img = new Image();
    img.src = path;
    img.onload = function() {
      let that = this;

      let scale = obj.width / obj.height;
      let w = obj.width;
      let h = obj.height || w / scale;
      let quality = 0.7; // 默认图片质量为0.7
      //生成canvas
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      // 创建属性节点
      let anw = document.createAttribute("width");
      anw.nodeValue = w;
      let anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL("image/jpeg", quality);
      // 回调函数返回base64的值
      callback(base64);
    };
  };

  photoCompress = (re, objDiv) => {
    let img = new Image();
    img.src = re;
    let w = { quality: 0.5 };
    img.onload = () => {
      w.width = img.width;
      w.height = img.height;
      this.canvasDataURL(re, w, objDiv);
    };
  };

  changetime(type, e) {
    this.setState({ [type]: e });
  }
  chnum = e => {
    this.setState({ level: e });
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
            <span className="textRight lin30">图片：</span>
            <div>
              <button
                id="replaceImg"
                onClick={this.handleChange}
                className="l-btn"
                style={{ marginRight: "0.625rem" }}
              >
                {!!this.state.picUrl ? "更换图片" : "上传图片"}
              </button>
              <span>温馨提示：图片截取尽可能的小！！</span>
              <div
                style={{
                  width: "12rem",
                  height: "12rem",
                  border: "1px solid  #ccc",
                  padding: "2px",
                  marginTop: "10px",
                  display: this.state.picUrl ? "block" : "none"
                }}
              >
                <img
                  id="finalImg"
                  src={this.state.picUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                />
              </div>
              <div style={{ display: "none" }} className="tailoring-container">
                <div className="black-cloth" onClick={this.closeTailor} />
                <div
                  className="tailoring-content"
                  style={{ top: "146.5px", left: "0px" }}
                >
                  <div className="tailoring-content-one">
                    <label
                      title="上传图片"
                      for="chooseImg"
                      className="l-btn choose-btn"
                    >
                      <input
                        type="file"
                        accept="image/jpg,image/jpeg,image/png"
                        name="file"
                        id="chooseImg"
                        className="hidden"
                        onChange={this.selectImg}
                      />
                      选择图片
                    </label>

                    <Icon
                      type="close-circle"
                      style={{
                        float: "right",
                        fontSize: "1.45rem",
                        color: "#1890ff"
                      }}
                      onClick={this.toggle}
                    />
                  </div>
                  <div className="tailoring-content-two">
                    <div className="tailoring-box-parcel">
                      <img id="tailoringImg1" />
                    </div>
                  </div>
                  <div className="tailoring-content-three">
                    <button className="l-btn sureCut" onClick={this.sureCut}>
                      确定
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
