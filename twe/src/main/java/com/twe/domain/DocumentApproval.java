package com.twe.domain;

import com.alibaba.fastjson.JSONObject;
import com.common.util.BeanTools;
import com.common.util.SmsUtils;
import com.twe.dto.ApprovalFormDTO;
import com.twe.dto.DocumentDTO;
import com.twe.dto.UserDTO;
import com.twe.repository.DocumentRepository;
import com.twe.values.ProductValues;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DocumentApproval {

    private final static Logger logger = LoggerFactory.getLogger(SmsUtils.class);

    private DocumentRepository documentRepository;
    private SmsUtils smsUtils;

    public DocumentApproval() {
        documentRepository = BeanTools.getBean(DocumentRepository.class);
        smsUtils = BeanTools.getBean(SmsUtils.class);
    }

    public UserDTO login(UserDTO userDTO) {
        UserDTO dto = documentRepository.findUser(userDTO);
        return dto;
    }

    public Integer addDoc(DocumentDTO dto) {
        long tmp_time = System.currentTimeMillis() / 1000;
        dto.setCreateTime((int) tmp_time);
        int rel = documentRepository.addDoc(dto);
        if (rel > 0 && !CollectionUtils.isEmpty(dto.getItems())) {
            Integer docId = dto.getId();
            List<ProductValues> list = dto.getItems();
            for (ProductValues value : list) {
                value.setDocId(docId);
            }
            documentRepository.addProduct(list);
        }
        // 发送手机短信
        sendMsg(1);
        return dto.getId();
    }

    public Integer addapproval(ApprovalFormDTO dto) {
        long tmp_time = System.currentTimeMillis() / 1000;
        dto.setCreateTime((int) tmp_time);
        documentRepository.addapproval(dto);
        // 发送手机短信
        sendMsg(3);
        return dto.getId();
    }

    public DocumentDTO getDoc(Integer id, int hasPic) {
        if (0 == hasPic) {
            return documentRepository.getDoc(id);
        } else {
            return documentRepository.getDocPic(id);
        }
    }

    public ApprovalFormDTO getApproval(Integer id) {
        return documentRepository.getApproval(id);
    }

    public void updateDoc(Integer id, Integer action) {
        int approvalStatus = 0;
        int status = 0;
        int role = documentRepository.selectDocRoleById(id);
        if (0 == action.intValue()) {
            // 同意
            if (1 == role) {
                role = 2;
                approvalStatus = 1;
            } else if (2 == role) {
                approvalStatus = 3;
                status = 1;
            }
        } else if (1 == action.intValue()) {
            // 不同意
            if (1 == role) {
                approvalStatus = 2;
            } else if (2 == role) {
                approvalStatus = 4;
            }
            status = 1;
        } else {
            return;
        }
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("id", id);
        paramMap.put("status", status);
        paramMap.put("approvalStatus", approvalStatus);
        paramMap.put("nextRole", role);
        paramMap.put("updateTime", System.currentTimeMillis() / 1000);
        documentRepository.updateByDocId(paramMap);

        // 发送手机短信
        if (0 == action.intValue() && 2 == role) {
            sendMsg(2);
        }
    }

    public void updateApproval(Integer id, Integer action) {
        int approvalStatus = 0;
        if (0 == action.intValue()) {
            // 同意
            approvalStatus = 1;
        } else if (1 == action.intValue()) {
            // 不同意
            approvalStatus = 2;
        } else {
            return;
        }
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("id", id);
        paramMap.put("status", 1);
        paramMap.put("approvalStatus", approvalStatus);
        paramMap.put("updateTime", System.currentTimeMillis() / 1000);
        documentRepository.updateByApprovalId(paramMap);
    }

    public Integer addUser(UserDTO userDTO) {
        long tmp_time = System.currentTimeMillis() / 1000;
        userDTO.setCreateTime((int) tmp_time);
        documentRepository.addUser(userDTO);
        return userDTO.getId();
    }

    public List<UserDTO> getUserList(Integer page, Integer limit) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("offset", (page - 1) * limit);
        paramMap.put("limit", limit);
        return documentRepository.getUserList(paramMap);
    }

    public List<JSONObject> getList(Integer type, Integer role, Integer page, Integer limit) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("role", role);
        paramMap.put("offset", (page - 1) * limit);
        paramMap.put("limit", limit);
        if (1 == type.intValue()) {
            return documentRepository.getDocList(paramMap);
        } else {
            return documentRepository.getApprovalList(paramMap);
        }
    }

    public void delUser(int id) {
        documentRepository.delUser(id);
    }

    public void delDocOrAppro(int id, int type) {
        if (1 == type) {
            documentRepository.delDoc(id);
        } else if (2 == type) {
            documentRepository.delAppro(id);
        }
    }

    public void sendMsg(int role) {
        List<String> list = documentRepository.findUserPhList(role);
        smsUtils.sendMsg(list);
    }
}
