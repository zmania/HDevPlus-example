import {getCookie, setCookie} from 'h3';

function getCookieFromClient(cookieName) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('connector', async (requestData) => {
        let output = {};

        try {
            let event;
            let session_id;
            let api_token;
            if (process.server) {
                event = nuxtApp.ssrContext?.event;
                session_id = getCookie(event, 'session_id') || '';
                api_token = getCookie(event, 'api_token') || '';
            } else {
                // 클라이언트에서 쿠키 가져오기
                session_id = getCookieFromClient('session_id') || '';
                api_token = getCookieFromClient('api_token') || '';
            }
            if (session_id) {
                requestData.session_id = session_id;
            }
            if (api_token) {
                requestData.api_token = api_token;
            }
            const {data: result} = await useAsyncData('fetchData', () => $fetch('/api/request', {
                method: 'POST',
                body: requestData,
            }));
            const response = result.value;
            if (process.server && response.session.api_token) {
                // 서버에서 쿠키 설정
                setCookie(event, 'session_id', response.session.id, {
                    httpOnly: false, // 클라이언트에서 접근 가능
                    maxAge: 60 * 60 * 24 * 7, // 7일 동안 유효
                    path: '/'
                });
                setCookie(event, 'api_token', response.session.api_token, {
                    httpOnly: false, // 클라이언트에서 접근 가능
                    maxAge: 60 * 60 * 24 * 7, // 7일 동안 유효
                    path: '/'
                });
            }

            if (response.redirect_url) {
                navigateTo(response.redirect_url, {redirectCode: 301});
            }
            if (response) {
                output = response;
            } else {
                console.error('No response from the API.');
                return {output: null}; // API 응답이 없을 경우 기본 반환값 설정
            }
        } catch (error) {
            console.error('Error during API request:', error);
            return {output: null}; // 오류 발생 시 기본 반환값 설정
        }

        // 클라이언트에서 스크립트 로딩
        if (process.client) {
            const aScript = output.env.js || [];
            if (aScript.length > 0) {
                aScript.forEach(url => {
                    const existingScript = document.querySelector(`script[src="${url}"]`);
                    if (existingScript) {
                        existingScript.remove();
                    }
                    const script = document.createElement('script');
                    script.src = url;
                    script.async = false;
                    script.defer = true;
                    document.head.appendChild(script);
                });
            }
        }
        return {
            output
        };
    });
});
