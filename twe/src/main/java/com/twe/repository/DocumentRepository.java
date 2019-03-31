package com.twe.repository;

import com.alibaba.fastjson.JSONObject;
import com.twe.dto.ApprovalFormDTO;
import com.twe.dto.DocumentDTO;
import com.twe.dto.UserDTO;
import com.twe.values.ProductValues;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface DocumentRepository {

    UserDTO findUser(UserDTO userDTO);

    int addDoc(DocumentDTO dto);

    int addapproval(ApprovalFormDTO dto);

    void addProduct(@Param("list") List<ProductValues> list);

    DocumentDTO getDoc(Integer id);

    DocumentDTO getDocPic(Integer id);

    ApprovalFormDTO getApproval(Integer id);

    Integer addUser(UserDTO userDTO);

    List<UserDTO> getUserList(Map<String, Object> paramMap);

    List<JSONObject> getDocList(Map<String, Object> paramMap);

    List<JSONObject> getApprovalList(Map<String, Object> paramMap);

    void updateByDocId(Map<String, Object> paramMap);

    void updateByApprovalId(Map<String, Object> paramMap);

    int selectDocRoleById(@Param("id") Integer id);

    List<String> findUserPhList(@Param("role") int role);

    void delUser(@Param("id") Integer id);

    void delDoc(@Param("id") Integer id);

    void delAppro(@Param("id") Integer id);

}
