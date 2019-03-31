package com.twe.service;

import com.alibaba.fastjson.JSONObject;
import com.common.dto.ResultModel;
import com.common.util.SmsUtils;
import com.twe.domain.DocumentApproval;
import com.twe.dto.ApprovalFormDTO;
import com.twe.dto.DocumentDTO;
import com.twe.dto.UserDTO;
import org.apache.poi.hssf.usermodel.*;
import org.jasypt.encryption.StringEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

@Service
public class DocumentService {

    private final static Logger logger = LoggerFactory.getLogger(SmsUtils.class);

    @Autowired
    StringEncryptor stringEncryptor;
    private DocumentApproval documentApproval = new DocumentApproval();

    public ResultModel login(UserDTO userDTO, HttpServletResponse response) {
        ResultModel result = new ResultModel();
        UserDTO dto = documentApproval.login(userDTO);
        if (null == dto) {
            result.setStatus(1);
            result.setInfo("userName or passwd error!");
        } else {
            result.setData(dto);
            result.setInfo("OK");
            Cookie cookie = new Cookie("token", dto.getUserName() + "_" + dto.getRole());
            cookie.setMaxAge(Integer.MAX_VALUE);
            cookie.setPath("/");
            response.addCookie(cookie);
        }
        return result;
    }

    public Integer addDoc(DocumentDTO dto) {
        return documentApproval.addDoc(dto);
    }

    public Integer addapproval(ApprovalFormDTO dto) {
        return documentApproval.addapproval(dto);
    }

    public DocumentDTO getDoc(Integer id, int hasPic) {
        return documentApproval.getDoc(id, hasPic);
    }

    public ApprovalFormDTO getApproval(Integer id) {
        return documentApproval.getApproval(id);
    }

    public ResultModel updateDoc(Integer id, Integer action) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        documentApproval.updateDoc(id, action);
        return result;
    }

    public ResultModel updateApproval(Integer id, Integer action) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        documentApproval.updateApproval(id, action);
        return result;
    }

    public Integer addUser(UserDTO userDTO) {
        return documentApproval.addUser(userDTO);
    }

    public ResultModel getUserList(Integer page, Integer limit) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        List<UserDTO> list = documentApproval.getUserList(page, limit);
        result.setData(list);
        return result;
    }

    public ResultModel getList(Integer type, Integer role, Integer page, Integer limit) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        List<JSONObject> list = documentApproval.getList(type, role, page, limit);
        result.setData(list);
        return result;
    }

    public ResultModel delUser(int id) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        documentApproval.delUser(id);
        return result;
    }

    public ResultModel delDocOrAppro(int id, int type) {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        documentApproval.delDocOrAppro(id, type);
        return result;
    }

    public void exportExcel(int id, HttpServletResponse response) {
//        HSSFWorkbook workbook = new HSSFWorkbook();
//        HSSFSheet sheet = workbook.createSheet("统计表");
//        createTitle(workbook,sheet);
//        List<User> rows = userService.getAll();
//
//        //设置日期格式
//        HSSFCellStyle style = workbook.createCellStyle();
//        style.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy h:mm"));
//
//        //新增数据行，并且设置单元格数据
//        int rowNum=1;
//        for(User user:rows){
//            HSSFRow row = sheet.createRow(rowNum);
//            row.createCell(0).setCellValue(user.getId());
//            row.createCell(1).setCellValue(user.getName());
//            row.createCell(2).setCellValue(user.getUsername());
//            HSSFCell cell = row.createCell(3);
//            cell.setCellValue(user.getCreate_time());
//            cell.setCellStyle(style);
//            rowNum++;
//        }
//
//        String fileName = "导出excel例子.xls";
//
//        //浏览器下载excel
//        buildExcelDocument(fileName,workbook,response);
    }

    //创建表头
    private void createTitle(HSSFWorkbook workbook, HSSFSheet sheet) {
        HSSFRow row = sheet.createRow(0);
        //设置列宽，setColumnWidth的第二个参数要乘以256，这个参数的单位是1/256个字符宽度
        sheet.setColumnWidth(1, 12 * 256);
        sheet.setColumnWidth(3, 17 * 256);

        //设置为居中加粗
        HSSFCellStyle style = workbook.createCellStyle();
        HSSFFont font = workbook.createFont();
        font.setBold(true);
//        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        style.setFont(font);

        HSSFCell cell;
        cell = row.createCell(0);
        cell.setCellValue("ID");
        cell.setCellStyle(style);


        cell = row.createCell(1);
        cell.setCellValue("显示名");
        cell.setCellStyle(style);

        cell = row.createCell(2);
        cell.setCellValue("用户名");
        cell.setCellStyle(style);

        cell = row.createCell(3);
        cell.setCellValue("创建时间");
        cell.setCellStyle(style);

    }

    //浏览器下载excel
    protected void buildExcelDocument(String filename, HSSFWorkbook workbook, HttpServletResponse response) throws Exception {
        // 解决导出文件名中文乱码
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "utf-8"));
        OutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        outputStream.flush();
        outputStream.close();
    }

}
