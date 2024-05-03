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
const requestData = {'dataID': 'GET_USER_FORM', 'form_code': 'contact', 'fail_url': '/user/sign-in'};

Connector.request(requestData, (data) => {
  output.value = data; // 성공 시 데이터 저장
}, (error) => {
  console.error('Request failed:', error); // 실패 시 에러 로깅
});
</script>

<template>
  <main v-if="output">
    <navComp :output="output"/>
    <div class="row">
      <div class="col-12">
        <div class="col-12 col-xl-6 offset-xl-3 border-lg-end-none">
          <div class="px-4"><h1 class="fw-bold mb-4">문의하기</h1>
            <form id="frm_web_form" data-geo-location="yes" data-validation-alert="no" data-complete-type="alert" data-complete-message="전송이 완료되었습니다."><input type="hidden" name="form_code" value="contact"><input type="hidden" name="return_url" value="/">
              <div class="col-12 col-lg-12 mb-3"><label for="answer_1_value" class="form-label">문의 구분</label><input type="hidden" name="answer[1][label]" value="문의 구분"><select name="answer[1][value]" id="answer_1_value" data-validation="not-empty" class="form-select">
                <option value="">선택</option>
                <option value="제휴 문의">제휴 문의</option>
                <option value="서비스 문의">서비스 문의</option>
                <option value="기술 문의">기술 문의</option>
                <option value="기타 문의">기타 문의</option>
              </select><small class="invalid-feedback"> 문의 구분을 선택하세요 </small></div>
              <div class="row" v-if="!output.user.auth_flg">
                <div class="col-12 col-lg-12 mb-3"><label for="answerer_name" class="form-label">이름</label><input type="text" class="form-control h-validation" id="answerer_name" name="answerer_name" data-validation="not-empty" placeholder="이름을 입력하세요 입력하세요"><small class="invalid-feedback"> 이름을 입력하세요 </small></div>
                <div class="col-12 col-lg-12 mb-3"><label for="answerer_email" class="form-label">이메일</label><input type="text" class="form-control h-validation" id="answerer_email" name="answerer_email" data-validation="email" placeholder="이메일을 입력하세요 입력하세요"><small class="invalid-feedback"> 이메일을 입력하세요 </small></div>
              </div>
              <div class="row">
                <div class="col-12 col-lg-12 mb-3"><label class="form-label" for="answer_2_value">문의 내용</label><input type="hidden" name="answer[2][label]" value="문의 내용"><textarea class="form-control" rows="10" id="answer_2_value" name="answer[2][value]" data-validation="not-empty" placeholder="문의 내용을 입력해주세요"></textarea><small class="invalid-feedback"> 문의 내용을 입력해주세요 </small></div>
                <div class="col-12 col-lg-12 mb-3" style="overflow: auto;">
                  <div class="my-4 text-center mb-5">
                    <button type="submit" class="mx-1 btn btn-dark px-4">전송</button>
                    <a href="/" class="text-white mx-1 btn btn-dark px-4">취소</a></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>