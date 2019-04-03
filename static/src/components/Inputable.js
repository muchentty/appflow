import React, { Component } from "react";
import {
  Row,
  Col,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
  message,
  Icon
} from "antd";
import moment from "moment";
import locale from "antd/lib/date-picker/locale/zh_CN";
import $ from "jquery";
import { postDate } from "../utlis/fetch";
import { inoutreg } from "../utlis/reg";
import "./input.css";
import "./cropper.min.css";
import "./ImgCropping.css";
const RadioGroup = Radio.Group;

class InputTable extends Component {
  state = this.getInit();
  getInit() {
    return {
      loading: false,
      name: "",
      tel: "",
      dec: 0,
      carnum: "",
      data: "",
      time: "",
      organization: "",
      numlist: [{ name: "", spec: "", count: 1 }],
      picUrl: "",
      imageUrl: ""
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

  toggle=()=>{
    $(".tailoring-container").toggle();
  }
  selectImg=(file)=> {
    if (!file.currentTarget.files|| !file.currentTarget.files[0]){
        return;
    }
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      let re = reader.result;
      window.jQuery('#tailoringImg').cropper('replace', re,false);//默认false，适应高度，不失真
    })
    reader.readAsDataURL(file.currentTarget.files[0]);
  }

  sureCut=()=>{
    if ($("#tailoringImg").attr("src") == null) {
      return false;
    } else {
      let cas = window.jQuery("#tailoringImg").cropper("getCroppedCanvas"); //获取被裁剪后的canvas
      let base64url = cas.toDataURL("image/png"); //转换为base64地址形式
      this.photoCompress(base64url,(url)=>{
        this.setState({imageUrl:url})
      })
      //关闭裁剪框
      this.toggle();
    }
  }

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

  addgooodslist = index => {
    
    let numlist = this.state.numlist.concat([]);
    if (index === 0) {
      numlist.push({ name: "", spec: "", count: 1 });
    } else {
      numlist.splice(index, 1);
    }
    this.setState({ numlist });
  };

  chgoods = (e, index) => {
    let numlist = this.state.numlist.concat([]);
    numlist[index].name = e.currentTarget.value;
    this.setState({ numlist });
  };
  chsize = (e, index) => {
    let numlist = this.state.numlist.concat([]);
    numlist[index].spec = e.currentTarget.value;
    this.setState({ numlist });
  };
  chnum = (e, index) => {
    let numlist = this.state.numlist.concat([]);
    numlist[index].count = e;
    this.setState({ numlist });
  };

  goodssize = () => {
    let list = this.state.numlist;
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
              <Input
                value={item.name}
                className="flex1"
                onChange={e => {
                  this.chgoods(e, index);
                }}
              />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className="textRight lin30">规格型号：</span>
              <Input
                value={item.spec}
                className="flex1"
                onChange={e => {
                  this.chsize(e, index);
                }}
              />
            </Col>
          </Row>
          <Row className="m18">
            <Col span={24} className="showtype">
              <span className="textRight lin30">数量：</span>
              <InputNumber
                value={item.count}
                min={1}
                className="flex1"
                onChange={e => {
                  this.chnum(e, index);
                }}
              />
            </Col>
          </Row>

          {index === 0 && (
            <div
              className="addIcon"
              onClick={() => {
                this.addgooodslist(index);
              }}
            >
              <img
                src={require("../Static/add.png")}
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
            </div>
          )}
          {index !== 0 && (
            <div
              className="addIcon"
              onClick={() => {
                this.addgooodslist(index);
              }}
            >
              <div>
                <img
                  src={require("../Static/delete.png")}
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
              </div>
            </div>
          )}
        </div>
      );
    });
    return html;
  };
  from = (type, e) => {
    this.setState({ [type]: e.target.value });
  };
  changetime(type, e) {
    this.setState({ [type]: e });
  }
  creat = () => {
    if (inoutreg(this.state)) {
      let startdata = `${this.state.data + " " + this.state.time}`.replace(
        new RegExp("-", "gm"),
        "/"
      );
      let startdataM = new Date(startdata).getTime();
      let params = {
        name: this.state.name,
        contact: this.state.tel,
        direction: this.state.dec,
        organization: this.state.organization,
        carNumber: this.state.carnum,
        date: startdataM / 1000,
        picUrl: this.state.imageUrl,
        items: this.state.numlist
      };
      postDate("/addoc", params).then(data => {
        if (data && data.code === 200) {
          message.info("申请添加成功！");
          this.setState(this.getInit());
        } else {
          message.info("添加失败！");
        }
      });
    } else {
      message.info("信息填写不正确！");
    }
  };

  getstartData = () => {};
  render() {
    const goodsHtml = this.goodssize();
    return (
      <div>
        <Row>
          <Col span={16} offset={4} className="textcenter tableheard">
            深圳市医疗器械项目进/出场条
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
          <Col span={24} className="showtype mr10">
            <span className="textRight lin30">单位：</span>
            <Input
              value={this.state.organization}
              onChange={e => {
                this.from("organization", e);
              }}
              className="flex1"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className="textRight lin30">车牌：</span>
            <Input
              value={this.state.carnum}
              onChange={e => {
                this.from("carnum", e);
              }}
              className="flex1"
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className="textRight lin30">联系方式：</span>
            <Input
              className="flex1"
              value={this.state.tel}
              onChange={e => {
                this.from("tel", e);
              }}
            />
          </Col>
        </Row>
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className="textRight lin30">方向：</span>
            <RadioGroup
              defaultValue={"in"}
              className="flex4 lin30"
              value={this.state.dec}
              onChange={e => {
                this.from("dec", e);
              }}
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
                className="mr10 r6 "
                locale={locale}
                onChange={(e, string) => {
                  this.changetime("data", string);
                }}
              />
              <TimePicker
                className="r6"
                locale={locale}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                onChange={(e, string) => {
                  this.changetime("time", string);
                }}
              />
            </div>
          </Col>
        </Row>

        {goodsHtml}
        <Row className="m18">
          <Col span={24} className="showtype">
            <span className="textRight lin30">图片：</span>
            <div >
              <button id="replaceImg" onClick={this.handleChange}  className="l-btn" style={{marginRight:"0.625rem"}}>
              {!!this.state.imageUrl? "更换图片":"上传图片"}
              </button>
              <span >温馨提示：图片截取尽可能的小！！</span>
              <div style={{width: "12rem",height: "12rem",border: "1px solid  #ccc",padding:"2px", marginTop: "10px" ,display:this.state.imageUrl?"block":"none"   }}>
                <img 
                  id="finalImg" 
                  src={this.state.imageUrl} 
                  style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                  }} />
              </div>
              <div style={{display: "none"}} className="tailoring-container">
                <div className="black-cloth" onClick={this.closeTailor} />
                <div className="tailoring-content" style={{top: "146.5px", left: "0px"}}>
                  <div className="tailoring-content-one" >
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
                  
                     <Icon type="close-circle" style={{float:"right",fontSize:"1.45rem", color:"#1890ff"}}  onClick={this.toggle}/>
                 
                  </div>
                  <div className="tailoring-content-two">
                    <div className="tailoring-box-parcel">
                      <img id="tailoringImg"  />
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
        <Row className="mt45 mb60">
          <Col span={16} offset={4}>
            <Button
              type="primary"
              block
              onClick={() => {
                this.creat();
              }}
            >
              提交
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default InputTable;
