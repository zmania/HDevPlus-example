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
const requestData = {'dataID': 'ADD_POST', 'search_keyword': new URLSearchParams(window.location.search).get('search_keyword')};

Connector.request(requestData, (data) => {
  output.value = data; // 성공 시 데이터 저장
}, (error) => {
  console.error('Request failed:', error); // 실패 시 에러 로깅
});
</script>

<template>
  <div class="container">
    <main v-if="output">
      <navComp :output="output"/>
      <div class="row g-5">
        <div class="col-12">
          <div class="text-center">
            <h2 class="mt-5 mb-3">게시물 등록</h2>
          </div>
          <form id="frm_save_post" data-validation-alert="no">
            <input type="hidden" name="return_url" value="/post/list"/>
            <div class="row">
              <div class="col-12">
                <div class="form-label">게시판</div>
                <div id="">
                  <div class="bg-gray-light rounded-3 my-3 py-3">
                    <div class="row">
                      <div class="col-6 col-lg-3" v-for="result in output.bbs_list">
                        <div class="me-2 px-3 py-2 my-2 bg-secondary rounded-3 d-flex justify-content-between align-items-center">
                          <label class="crop-text-1 text-white" :for="'bbs_'+result.seq">{{result.bbs_name}}</label>
                          <input type="radio" class="form-check-input" :id="'bbs_'+result.seq" name="bbs_seq" :checked="output.post ? output.post[0].bbs_seq == result.seq : false" :value="result.seq" autocomplete="off">
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="invalid-feedback">
                    게시판을 선택하세요
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-12 mb-3">
                <label for="subject" class="form-label">제목</label>
                <input type="text" :value="output.post ? output.post[0].subject : ''" class="form-control h-validation" id="subject" name="subject" data-validation="not-empty" placeholder="제목을 입력하세요">
                <small class="invalid-feedback">
                  제목을 입력하세요
                </small>
              </div>
              <div class="row" v-if="!output.user.auth_flg">
                <div class="col-12 col-lg-6 mb-3">
                  <label for="email" class="form-label">이메일</label>
                  <input type="text" :value="output.post ? output.post[0].email : ''" class="form-control h-validation" id="email" name="email" data-validation="email" data-validation-type="replace" data-invalid-message="올바른 이메일을 입력하세요" placeholder="이메일을 입력하세요">
                </div>
                <div class="col-12 col-lg-6 mb-3">
                  <label for="cell_phone" class="form-label">휴대폰 번호</label>
                  <input type="text" :value="output.post ? output.post[0].cell_phone : ''" class="form-control" id="cell_phone" name="cell_phone" data-validation="phone" data-validation-type="replace" data-invalid-message="올바른 휴대폰 번호를 입력하세요" placeholder="휴대폰 번호를 입력하세요">
                </div>
                <div class="col-12 col-lg-6 mb-3">
                  <label for="reg_name" class="form-label">이름</label>
                  <input type="text" :value="output.post ? output.post[0].reg_name : ''" class="form-control h-validation" id="reg_name" name="reg_name" data-validation="not-empty" placeholder="이름을 입력하세요">
                </div>
                <div class="col-12 col-lg-6 mb-3">
                  <label for="reg_name" class="form-label">비밀번호</label>
                  <input type="password" :value="output.post ? output.post[0].password : ''" class="form-control" id="password" name="password" data-validation="password-4-8" data-invalid-message="올바른 비밀번호를 입력하세요" placeholder="숫자,영문 대 소문자 및 특수문자를 포함한 4-8글자">
                </div>
              </div>
              <div class="col-12 col-lg-12 mb-3" style="overflow: auto;">
                <div for="content" class="form-label">내용</div>
                <textarea id="content_1" :name="'content['+(output.post ? output.post[0].contents[0].seq : '')+']'" data-validation="not-empty" :value="output.post ? output.post[0].contents[0].content : ''" rows="10" style="width:100%;"></textarea>

                <small class="invalid-feedback">
                  내용을 입력하세요
                </small>
                <div class="my-4 text-center mb-5">
                  <button type="submit" class="mx-1 btn btn-dark px-4">저장</button>
                  <a href="/post/list" class="h-btn-cancel-save mx-1 btn btn-dark px-4">취소</a>
                </div>
              </div>
              <div class="col-12 col-lg-12 text-center mb-5">

              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>