package com.common.dto;

import org.springframework.http.HttpStatus;

public class ResultModel {

    private Integer status;
    private Integer code;
    private Object data;
    private String info;

    public ResultModel() {
        this.status = 0;
        this.code = HttpStatus.OK.value();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
