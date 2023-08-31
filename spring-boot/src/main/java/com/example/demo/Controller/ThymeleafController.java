package com.example.demo.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.example.demo.Connector;

@Controller
public class ThymeleafController {
    private final Connector connector;

    // Logger 인스턴스 생성
    private static final Logger logger = LoggerFactory.getLogger(ThymeleafController.class);
    private MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
    public ThymeleafController(Connector connector) {
        this.connector = connector;
    }

    // index
    @RequestMapping(value = {"/thymeleaf/", "/thymeleaf/index"})
    public String main(@RequestParam Map<String, String> getParams, Model model) {
        List<String> widgets = Arrays.asList("most_read_post", "test1");
        requestBody.addAll("widget[]", widgets);
        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("DEFAULT",requestBody).block();
        output.put("requestBody", requestBody);
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String formattedJson = gson.toJson(output);
        logger.error("Output: \n{}", formattedJson);

        return "main/index";
    }

    // post
    @RequestMapping("/thymeleaf/post/list")
    public String getPostList(@RequestParam Map<String, String> getParams, Model model) {
        requestBody.add("page_link_url", "/thymeleaf/post/list");
        requestBody.add("page", getParams.get("page")!=null?getParams.get("page"):"1");
        requestBody.add("list_per_page", "10");
        requestBody.add("block_per_number", "5");
        requestBody.add("search_keyword", getParams.get("search_keyword"));
        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("GET_POST_LIST",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);

        return "post/list";
    }
    @RequestMapping("/thymeleaf/post/add")
    public String getAddPost(@RequestParam Map<String, String> getParams, Model model) {
        requestBody.add("search_keyword", getParams.get("search_keyword"));
        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("ADD_POST",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);

        return "post/add";
    }
    @RequestMapping("/thymeleaf/post/modify")
    public String getPostDetail(@RequestParam Map<String, String> getParams, Model model) {
        requestBody.add("post_key", getParams.get("post_key"));
        requestBody.add("page", getParams.get("page"));
        requestBody.add("list_per_page", "3");
        requestBody.add("block_per_number", "5");

        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("GET_POST",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);
        logger.error("getParams: {}", getParams.get("post_key"));

        return "post/modify";
    }
    @RequestMapping("/thymeleaf/post/view")
    public String modifyPost(@RequestParam Map<String, String> getParams, Model model) {
        requestBody.add("post_key", getParams.get("post_key"));
        requestBody.add("search_keyword", getParams.get("search_keyword"));

        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("MODIFY_POST",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);
        logger.error("getParams: {}", getParams.get("post_key"));

        return "post/view";
    }

    // member
    @RequestMapping("/thymeleaf/member/login")
    public String login(@RequestParam Map<String, String> getParams, Model model) {
        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("SIGN_IN",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);
        logger.error("getParams: {}", getParams.get("post_key"));

        return "member/login";
    }
    @RequestMapping("/thymeleaf/member/mypage")
    public String mypage(@RequestParam Map<String, String> getParams, Model model) {
        requestBody.add("page_link_url", "mypage");
        requestBody.add("fail_redirect_url", "login");
        requestBody.add("my_notice_flg", "Y");
        requestBody.add("my_notice_limit", "5");
        requestBody.add("page", getParams.get("page")!=null?getParams.get("page"):"1");
        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("MY_PAGE",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);
        logger.error("getParams: {}", getParams.get("post_key"));

        return "member/mypage";
    }
    @RequestMapping("/thymeleaf/member/profile")
    public String profile(@RequestParam Map<String, String> getParams, Model model) {
        requestBody.add("fail_redirect_url", "/thymeleaf/member/login");
        requestBody.add("my_notice_limit", "10");
        requestBody.add("page", getParams.get("page")!=null?getParams.get("page"):"1");
        requestBody.add("block_number", "5");
        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("MY_PAGE",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);
        logger.error("getParams: {}", getParams.get("post_key"));

        return "member/profile";
    }
    @RequestMapping("/thymeleaf/member/join")
    public String join(@RequestParam Map<String, String> getParams, Model model) {
        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("SIGN_UP",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);
        logger.error("getParams: {}", getParams.get("post_key"));

        return "member/join";
    }

    @RequestMapping("/thymeleaf/web_form/index")
    public String web_form(@RequestParam Map<String, String> getParams, Model model) {
        requestBody.add("form_key", "c81e728d9d4c2f636f067f89cc14862c");

        Map<String, Object> output = (Map<String, Object>) connector.sendPostRequest("GET_USER_FORM",requestBody).block();
        output.put("search_keyword", getParams.get("search_keyword"));
        model.addAttribute("output", output);

        // 로그에 output 값을 출력
        logger.error("Output: {}", output);
        logger.error("getParams: {}", getParams.get("post_key"));

        return "web_form/index";
    }
}
