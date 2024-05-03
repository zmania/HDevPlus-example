<script setup>

import {ref} from "vue";
import navComp from '@/components/nav.vue'
const output = ref(null)
const {Connector} = defineProps({
  Connector: {
    type: Object,
    default: {}
  }
});
const requestData = {'dataID': 'SIGN_IN'};

Connector.request(requestData, (data) => {
  output.value = data; // 성공 시 데이터 저장
}, (error) => {
  console.error('Request failed:', error); // 실패 시 에러 로깅
});
</script>

<template>
  <div class="container">
    <navComp :output="output"/>
    <main>
      <div class="row g-5">
        <div class="offset-lg-2 col-lg-8">
          <div class="text-center">
            <h2 class="mt-5 mb-3">로그인</h2>
          </div>
          <form id="frm_sign_in">
            <input type="hidden" id="return_url" name="return_url" value="/post/list">
            <input type="hidden" id="return_url" name="fail_url" value="/member/mypage">
            <div class="my-1"><label class="sr-only">이메일</label>
              <input id="email" name="email" class="form-control" data-validation="email" data-validation-type="replace" type="text" placeholder="이메일" value="demo@hanbnc.com">
            </div>
            <div class="my-1"><label class="sr-only">비밀번호</label><input class="form-control" type="password" id="password" name="password" placeholder="비밀번호" value="hdevplus1234"></div>
            <div class="form-check lh-base mt-3">
              <input class="form-check-input" type="checkbox" id="remember_me" name="remember_me" value="Y"><label class="form-check-label" for="remember_me">로그인상태 유지</label>
            </div>
            <div class="form-group mt-4">
              <button class="btn btn-dark w-100" type="submit">로그인</button>
            </div>
            <div class="form-group mt-4">
              <div><small>데모페이지 아이디 : demo@hanbnc.com / 비밀번호 : hdevplus1234</small></div>
              <div><small>관리콘솔(<a href="https://dev.hanbnc.com" target="_blank">https://dev.hanbnc.com</a>) 아이디 : demo@hanbnc.com / 비밀번호 : hdevplus1234</small></div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>