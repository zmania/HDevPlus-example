package com.example.demo;

import com.example.demo.Controller.ThymeleafController;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.SSLException;
import java.util.Map;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class Connector {
    private final WebClient webClient;
    private static final int SOME_MAX_AGE = 86_400 * 365;
    private static final Logger logger = LoggerFactory.getLogger(ThymeleafController.class);
    private final String SECURITY_KEY = "ee9d2d324e261c42e5372a20b19c85b5ac7db7908dce804c59c911c2ae6624e1"; // 여기에 실제 security-key 값을 설정하세요.
//    private final String SECURITY_KEY = "d3d9f76a5a6b1d08c00b6e806dc6413ab7fc12d08dc2e1256149d060bed5218b"; // 여기에 실제 security-key 값을 설정하세요.

    public Connector() {
//        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
//                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024 * 10)) // 1MB
//                .build();

        this.webClient = WebClient.builder()
                .baseUrl("https://api.hanbnc.com")
                .clientConnector(new ReactorClientHttpConnector(HttpClient.create().secure(t ->
                        {
                            try {
                                t.sslContext(SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build());
                            } catch (SSLException e) {
                                throw new RuntimeException(e);
                            }
                        }
                )))
                .build();
    }

    public Mono<Map<String, Object>> sendPostRequest(String dataId, MultiValueMap<String, String> initialRequestBody) {
        return Mono.defer(() -> {
            initialRequestBody.add("dataID", dataId);
            initialRequestBody.add("secure_key", SECURITY_KEY);

            ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            logger.error("sra: {}", sra);
            if (sra != null) {
                HttpServletRequest request = sra.getRequest();
                if (request != null) {
                    logger.error("request: {}", request);
                    Cookie[] cookies = request.getCookies();
                    if (cookies != null) {
                        logger.error("cookies: {}", cookies);
                        for (Cookie cookie : cookies) {
                            logger.error("cookie.getName: {}", cookie.getName());
                            logger.error("cookie.getValue: {}", cookie.getValue());
                            if ("session_id".equals(cookie.getName()) && cookie.getValue() != null && !cookie.getValue().isEmpty()) {
                                initialRequestBody.add("session_id", cookie.getValue());
                            }
                            if ("api_token".equals(cookie.getName()) && cookie.getValue() != null && !cookie.getValue().isEmpty()) {
                                initialRequestBody.add("api_token", cookie.getValue());
                            }
                        }
                    }
                }
            }
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String formattedJson = gson.toJson(initialRequestBody);
            logger.error("Request: \n{}", formattedJson);

            return webClient.post()
                    .uri("/request.js")
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .bodyValue(initialRequestBody)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                    })
                    .doOnNext(map -> {
                        if (sra != null) {
                            HttpServletResponse response = sra.getResponse();
                            if (response != null) {
                                logger.error("map: \n{}", map);
                                // 'session' 키를 사용하여 하위 맵을 추출합니다.
                                if (map.containsKey("session") && map.get("session") instanceof Map) {
                                    Map<String, Object> sessionMap = (Map<String, Object>) map.get("session");

                                    // 추출된 하위 맵에서 'api_token'과 'id'를 확인합니다.
                                    if (sessionMap.containsKey("api_token")) {
                                        setCookie(response, "api_token", sessionMap.get("api_token").toString(), SOME_MAX_AGE);
                                    }
                                    if (sessionMap.containsKey("id")) {
                                        setCookie(response, "session_id", sessionMap.get("id").toString(), SOME_MAX_AGE);
                                    }
                                }
                            }
                        }
                    });
        });
    }

    public Mono<Map<String, Object>> sendPostRequestAPI(MultiValueMap<String, String> initialRequestBody, HttpServletRequest request) {
        return Mono.defer(() -> {
            initialRequestBody.add("secure_key", SECURITY_KEY);

            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("session_id".equals(cookie.getName())) {
                        initialRequestBody.add("session_id", cookie.getValue());
                    }
                    if ("api_token".equals(cookie.getName())) {
                        initialRequestBody.add("api_token", cookie.getValue());
                    }
                }
            }

            return webClient.post()
                    .uri("/request.js")
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .bodyValue(initialRequestBody)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                    });
        });
    }

    private void setCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(false);  // 보안상의 이유로 HttpOnly를 설정하는 것이 좋습니다

        response.addCookie(cookie);
    }
}
