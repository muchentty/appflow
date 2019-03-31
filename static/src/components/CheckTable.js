import React, { Component } from "react";
import { Row, Col, Radio, Table, Divider } from "antd";
import moment from "moment";
import { createHashHistory } from 'history'
import { getData } from "../utlis/fetch";
import "./input.css";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const styles = {
  td:{
    fontSize: "25px",
    fontFamily: "宋体",
  },
  tr: {
    height: "100px",
    lineHeight: "100px",
    textAlign:"center",
    // width:"80px"
  },
  right: {
    textAlign: "right"
  },
  center: {
    textAlign: "center"
  },
  titlesz: {
    fontSize: "40px",
    fontFamily: "黑体",
    fontWeight: "bold",
    height:"140px",
    lineHeight: "140px"
  },
  titlenum: {
    size: "25px",
    fontFamily: "宋体",
    fontWeight: 600
  },
  borderall: {
    border: "1px solid #000"
  },

  bordrlb: {
    borderRight: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    borderLeft: "1px solid #ccc"
  },
  bordrb: {
    borderRight: "1px solid #ccc",
    borderBottom: "1px solid #ccc"
  }
};

class CheckTable extends Component {
  
  state = {
    type: this.props.type!=="3"?"inout":"fire",
    page: 1,
    limit: 10,
    usertype: this.props.type,
    heardarr: [],
    dataSource: [],
    url: "",
    columns: [
      {
        title: "申请人",
        dataIndex: "proposer",
        key: "name"
      },
      {
        title: "审核状态",
        dataIndex: "approvalStatus",
        key: "tel"
      },
      {
        title: "申请时间",
        dataIndex: "createTime",
        key: "role"
      },
      {
        title: "操作",
        render: (text, record) => {
          return (
            <span>
              <a
                onClick={() => {
                  if (this.state.type === "inout") {
                    createHashHistory().push(`/inout/${record.id}`);
                  } else {
                    createHashHistory().push(`/fire/${record.id}`);
                  }
                }}
              >
                详情
              </a>
              { (this.state.usertype!=="4"&&this.state.type !== "inout" )&& <Divider type="vertical" />}
              { (this.state.usertype!=="4"&&this.state.type !== "inout" ) && (
                <a
                  onClick={this.ondownload}
                  href={this.state.url}
                  download="12121.xls"
                >
                  下载
                </a>
              )}
            </span>
          );
        }
      }
    ]
  };
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    let type = this.state.type == "inout" ? 1 : 2;
    let role = sessionStorage.getItem("userType");
    getData(
      `/approval/list?type=${type}&role=${role}&page=${this.state.page}&limit=${this.state.limit}`
    ).then(data => {
      if (data && data.code === 200) {
        data.data.map(item => {
          new Date(item.createTime);
          item.approvalStatus =
            item.approvalStatus === 0
              ? "未审核"
              : item.approvalStatus === 1
              ? "审核通过"
              : "审核不通过";
          item.createTime = moment(item.createTime*1000).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        this.setState({ dataSource: data.data });
      }
    });
  };
  
  ondownload = () => {
    // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
    let html =
      "<html><head><meta charset='utf-8' /></head><body>" +
      document.getElementById("tableBox").outerHTML +
      "</body></html>";
    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    let blob = new Blob([html], { type: "application/vnd.ms-excel" });
    // let a = document.getElementsByTagName("a")[0];
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    this.setState({ url: URL.createObjectURL(blob) });
  };

  handleModeChange = e => {
    this.setState({ type: e.target.value }, this.getList);
  };
  getTitle() {
    let type = this.state.usertype;
    let heardarr = [],
      html;
    if (type === "0" || type==="4" ) {
      heardarr = [
        { value: "inout", name: "进出场条" },
        { value: "fire", name: "动火申请表" }
      ];
      html = (
        <Col span={16} offset={4} className="textcenter radiotitle">
          <RadioGroup
            onChange={this.handleModeChange}
            value={this.state.type}
            size="lg"
            style={{ width: "100%", height: "100%" }}
          >
            {heardarr.map(item => (
              <RadioButton
                style={{ width: "50%", height: "100%", lineHeight: "2rem" }}
                value={item.value}
              >
                {item.name}
              </RadioButton>
            ))}
          </RadioGroup>
        </Col>
      );
    } else if (type === "3") {
      html = (
        <Col span={12} offset={6} className="textcenter tableheard">
          动火作业审批表
        </Col>
      );
    } else {
      html = (
        <Col span={16} offset={4} className="textcenter tableheard">
          深圳市医疗器械项目进/出场条
        </Col>
      );
    }
    return html;
  }

  render() {
    return (
      <div>
        <Row>{this.getTitle()}</Row>
        <Row className="m18 mb60" >
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            bordered
          />
        </Row>
        <div >
          <table border="1"  id="tableBox" style={{ display:"none", borderColor: "transparent" , }}>
            <thead>
              <tr
                style={Object.assign(
                  {},
                  styles.titlesz,
                  styles.center,
                  styles.width
                )}
              >
                <td colspan="19">动 火 作 业 审 批 表</td>
              </tr>
              <tr
                style={Object.assign(
                  {},
                  styles.tr,
                  styles.right,
                  styles.titlenum
                )}
              >
                <td colspan="17"  style={styles.td} >GDAQ21203</td>
                <td style={Object.assign({},styles.borderall,styles.td) } />
                <td style={styles.td}/>
              </tr>
              <tr style={styles.tr}>
                <td colspan="2" style={styles.td}>工程名称：</td>
                <td colspan="7" style={styles.td}>医疗器械项目</td>
                <td colspan="2" style={styles.td}>施工单位：</td>
                <td colspan="8" style={styles.td}>中建三局第二建设工程有限责任公司</td>
              </tr>
            </thead>

            <tbody style={{ borderColor: "#000" }}>
              <tr style={styles.tr}>
                <td colspan="4" style={styles.td}>申请动火单位</td>
                <td colspan="5" style={styles.td}/>
                <td colspan="4" style={styles.td}>动 火 班 组</td>
                <td colspan="6" style={styles.td}/>
              </tr>
              <tr style={styles.tr}>
                <td rowspan="2" colspan="4" style={styles.td}>
                  动 火 部 位
                </td>
                <td rowspan="2" colspan="5"  style={styles.td}/>
                <td rowspan="2" colspan="4" style={styles.td}>
                  动火作业级别及种类（用火、气焊、电焊等）
                </td>
                <td colspan="4"  style={styles.td}/>
                <td colspan="2"  style={styles.td}>级动火</td>
              </tr>
              <tr style={styles.tr}>
                <td colspan="6"  style={styles.td}/>
              </tr>
              <tr style={styles.tr}>
                <td colspan="4" style={styles.td}>动 火 作 业</td>
                <td colspan="2" style={Object.assign({},styles.td,styles.right)}>由</td>
                <td colspan="2" style={styles.td} />
                <td colspan="1" style={styles.td}>年</td>
                <td colspan="1" style={styles.td} />
                <td colspan="1" style={styles.td}>月</td>
                <td colspan="1" style={styles.td} />
                <td colspan="1" style={styles.td}>日</td>
                <td colspan="1" style={styles.td}/>
                <td colspan="1" style={styles.td}>时</td>
                <td colspan="2"  style={styles.td}/>
                <td colspan="2" style={styles.td}>分起</td>
              </tr>
              <tr style={styles.tr}>
                <td colspan="4" style={styles.td}>起 止 时 间</td>
                <td colspan="2" style={Object.assign({},styles.td,styles.right)}>至</td>
                <td colspan="2" style={styles.td}/>
                <td colspan="1" style={styles.td}>年</td>
                <td colspan="1" style={styles.td}/>
                <td colspan="1" style={styles.td}>月</td>
                <td colspan="1" style={styles.td}/>
                <td colspan="1" style={styles.td}>日</td>
                <td colspan="1" style={styles.td}/>
                <td colspan="1" style={styles.td}>时</td>
                <td colspan="2" style={styles.td} />
                <td colspan="2" style={styles.td}>分止</td>
              </tr>
              <tr style={styles.tr}>
                <td colspan="10" style={styles.td}>
                  动火原因、防火的主要安全措施和配备的消防器材:
                </td>
                <td colspan="9" style={styles.td}/>
              </tr>
              <tr style={styles.tr}>
                <td rowspan="7" colspan="19" style={styles.td} />
              </tr>
              <tr style={styles.tr} />
              <tr style={styles.tr} />
              <tr style={styles.tr}/>
              <tr style={styles.tr}/>
              <tr style={styles.tr} />
              <tr />
              <tr style={styles.tr}>
                <td colspan="4" style={Object.assign({},styles.td,styles.right)}>监护人(签名)：</td>
                <td colspan="5" style={styles.td}>  </td>
                <td colspan="3" style={styles.td}>申请人(签名)：</td>
                <td colspan="3" style={styles.td} />
                <td colspan="4" style={styles.td}>年 月 日</td>
              </tr>
              <tr style={styles.tr}>
                <td colspan="3" style={styles.td}>审批意见：</td>
                <td colspan="16" style={styles.td}/>
              </tr>
              <tr style={styles.tr}>
                <td rowspan="5" colspan="19" style={styles.td}/>
              </tr>
              <tr style={styles.tr} />
              <tr style={styles.tr}/>
              <tr style={styles.tr} />
              <tr style={styles.tr} />
              <tr style={styles.tr}>
                <td colspan="11" style={Object.assign({},styles.td,styles.right)}> 审批人(签名)： </td>
                <td colspan="4" style={styles.td}> </td>
                <td colspan="4" style={styles.td}> 年 月 日 </td>
              </tr>
              <tr style={styles.tr}>
                <td colspan="7" style={styles.td}> 动火监护和作业后施工现场处理情况： </td>
                <td colspan="12" style={styles.td}> </td>
              </tr>
              <tr style={styles.tr}>
                <td rowspan="5" colspan="19" style={styles.td}/>
              </tr>
              <tr style={styles.tr} />
              <tr style={styles.tr} />
              <tr style={styles.tr} />
              <tr style={styles.tr} />
              <tr style={styles.tr}>
                <td colspan="3" style={styles.td}>作业人(签名)：</td>
                <td colspan="5" />
                <td colspan="4" style={styles.td}>监护人(签名):</td>
                <td colspan="3"   />
                <td colspan="4" style={styles.td}>年 月 日</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default CheckTable;
