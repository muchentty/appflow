package com.twe.api;

import com.common.dto.ResultModel;
import com.twe.dto.ApprovalFormDTO;
import com.twe.dto.DocumentDTO;
import com.twe.dto.UserDTO;
import com.twe.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // 登录
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel login(@RequestBody UserDTO userDTO, HttpServletResponse response) {
        return documentService.login(userDTO, response);
    }

    // 提交进出条
    @RequestMapping(value = "/addoc", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel addDoc(@RequestBody DocumentDTO dto) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        Integer id = documentService.addDoc(dto);
        result.setData(id);
        return result;
    }

    // 提交动火审批
    @RequestMapping(value = "/addapproval", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel addapproval(@RequestBody ApprovalFormDTO dto) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        Integer id = documentService.addapproval(dto);
        result.setData(id);
        return result;
    }

    // 获取进出条详情
    @RequestMapping(value = "/doc", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel getDoc(@RequestParam("id") Integer id, @RequestParam("hasPic") int hasPic) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        DocumentDTO dto = documentService.getDoc(id, hasPic);
        result.setData(dto);
        return result;
    }

    // 获取动火审批详情
    @RequestMapping(value = "/approval", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel getApproval(@RequestParam("id") Integer id) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        ApprovalFormDTO dto = documentService.getApproval(id);
        result.setData(dto);
        return result;
    }

    // 审批进出条
    @RequestMapping(value = "/doc/process/{id}/{action}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel updateDoc(@PathVariable("id") Integer id, @PathVariable("action") Integer action) {
        return documentService.updateDoc(id, action);
    }

    // 审批动火审批
    @RequestMapping(value = "/approval/process/{id}/{action}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel updateApproval(@PathVariable("id") Integer id, @PathVariable("action") Integer action) {
        return documentService.updateApproval(id, action);
    }

    // 添加用户
    @RequestMapping(value = "/user", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel addUser(@RequestBody UserDTO userDTO) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        Integer id = documentService.addUser(userDTO);
        result.setData(id);
        return result;
    }

    // 获取用户列表
    @RequestMapping(value = "/user/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel getUserList(@RequestParam(value = "page", defaultValue = "1") Integer page, @RequestParam(value = "limit", defaultValue = "10") Integer limit) {
        return documentService.getUserList(page, limit);
    }

    // 审核查看列表
    @RequestMapping(value = "/approval/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel getList(@RequestParam("type") Integer type, @RequestParam("role") Integer role, @RequestParam(value = "page", defaultValue = "1") Integer page, @RequestParam(value = "limit", defaultValue = "10") Integer limit) {
        return documentService.getList(type, role, page, limit);
    }

    // 删除用户
    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel delUser(@PathVariable("id") int id) {
        return documentService.delUser(id);
    }

    // 删除资源
    @RequestMapping(value = "/resource/{id}/{type}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    public ResultModel delDocOrAppro(@PathVariable("id") int id, @PathVariable("type") int type) {
        return documentService.delDocOrAppro(id, type);
    }

    // 审核查看列表
    @RequestMapping(value = "/excel", method = RequestMethod.GET)
    public void downloadExcel(@RequestParam("id") Integer id, HttpServletResponse response) {
        documentService.exportExcel(id, response);
    }
}
