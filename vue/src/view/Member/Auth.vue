<script setup>

import {ref} from "vue";
import router from '@/router';
import navComp from '@/components/nav.vue'
const output = ref(null)
const {Connector} = defineProps({
  Connector: {
    type: Object,
    default: {}
  }
});
// const requestData = {'dataID': 'CHECK_AUTHED_USER'};
const requestData = {'dataID': 'CHECK_AUTHED_USER', 'my_post_list_flg':'Y','my_post_list_limit':10,'my_notice_flg': 'Y', 'my_notice_limit':20, 'post_responder_flg':'Y','post_responder_limit':20};

Connector.request(requestData, (data) => {
  output.value = data; // 성공 시 데이터 저장
}, (error) => {
  console.error('Request failed:', error); // 실패 시 에러 로깅
});
</script>

<template>
    <main v-if="output">
      <navComp :output="output"/>
      <div class="container">
        <div class="row">
          <div class="col-10 mb-5 mx-auto">
            <div class="px-lg-4 mb-5">
              <form id="frm_auth_user" data-return-url="/member/modify" class="my-5 py-5" data-validation-alert="no">
                <div class="row">
                  <div class="col-12 col-lg-6 offset-lg-3 mb-3 p-5 rounded-4 bg-gray-200">
                    <label for="password" class="form-label sr-only">비밀번호</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="비밀번호를 입력하세요.">
                    <small class="invalid-feedback">
                      올바른 비밀번호를 입력하세요
                    </small>
                    <small class="help-block">
                      숫자,영문 대 소문자 및 특수문자를 포함한 4-8글자
                    </small>
                  </div>
                  <div class="col-12 mb-3">
                    <div class="my-4 text-center mb-5">
                      <button type="submit" class="mx-1 btn border-hbnc-primary bg-hanbnc-primary-3 border border-3 px-4">확인</button>
                      <a href="/member/mypage" class="mx-1 btn border-gray-default-op-50 bg-gray-light border border-3 px-4">취소</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>