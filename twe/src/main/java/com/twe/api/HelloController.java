package com.twe.api;

import com.common.dto.ResultModel;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping(value = "/hello", method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE+";charset=utf-8")
    public ResultModel hello() {
        ResultModel result = new ResultModel();
        result.setInfo("OK");
        return result;
    }
}
