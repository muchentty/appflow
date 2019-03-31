package com.twe.dto;

import com.twe.values.ProductValues;

import java.util.List;

/**
 * 进出条领域实体
 */
public class DocumentDTO {

    // ID主键
    private Integer id;
    // 用户ID
    private Integer userId;
    // 名称
    private String name;
    // 联系方式
    private String contact;
    // 单位
    private String organization;
    //车牌
    private String carNumber;
    //方向：0-进场；1-出场
    private Integer direction;
    // 时间
    private Integer date;
    // 物品名称
    private List<ProductValues> items;
    // 附件
    private String picUrl;
    // 状态
    private Integer status;
    // 创建时间
    private Integer createTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public Integer getDirection() {
        return direction;
    }

    public void setDirection(Integer direction) {
        this.direction = direction;
    }

    public Integer getDate() {
        return date;
    }

    public void setDate(Integer date) {
        this.date = date;
    }

    public List<ProductValues> getItems() {
        return items;
    }

    public void setItems(List<ProductValues> items) {
        this.items = items;
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Integer createTime) {
        this.createTime = createTime;
    }
}
