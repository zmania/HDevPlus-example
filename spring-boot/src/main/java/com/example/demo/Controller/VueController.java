package com.example.demo.Controller;

import com.example.demo.Connector;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@Controller
public class VueController {
    private final Connector connector;

    // Logger 인스턴스 생성
    private static final Logger logger = LoggerFactory.getLogger(VueController.class);
    private Object MediaType;

    public VueController(Connector connector) {
        this.connector = connector;
    }

    @PostMapping(value = "/request.js", produces = "application/json")
    @ResponseBody
    public String requestAPI(
//            @RequestParam Map<String, String> getParams,
            @RequestBody MultiValueMap<String, String> postBody, // POST 본문
            Model model,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws JsonProcessingException {

        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequestAPI(postBody, request).block();

        if (output.containsKey("session")) {
            Map<String, Object> sessionData = (Map<String, Object>) output.get("session");

            if (sessionData != null) {
                setCookie(response, "session_id", (String) sessionData.get("id"), 60 * 60 * 24 * 365);
                setCookie(response, "api_token", (String) sessionData.get("api_token"), 60 * 60 * 24 * 365);
            }
            logger.error("Output: {}", sessionData);
        }
        
        model.addAttribute("output", output);

        // 로그에 output 값을 출력

        logger.error("Output: {}", output);
        String jsonOutput = new ObjectMapper().writeValueAsString(output);
        return jsonOutput;
    }
    @RequestMapping("/member/modify")
    public ModelAndView  modifyProfile(
            @RequestParam(required = false) Map<String, String> getParams,
            @RequestBody(required = false) MultiValueMap<String, String> postBody) {

        ModelAndView modelAndView = new ModelAndView("member/modify");

        if (getParams != null && !getParams.isEmpty()) {
            modelAndView.addObject("getParams", getParams);
        }

        if (postBody != null && !postBody.isEmpty()) {
            modelAndView.addObject("postParams", postBody);
        }

        return modelAndView;
    }
    private void setCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);  // 보안상의 이유로 HttpOnly를 설정하는 것이 좋습니다

        response.addCookie(cookie);
    }
}
