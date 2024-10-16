<script setup>

import {init} from '@/composables/common';
const {route, env} = init();
import navComp from '@/components/nav.vue'
const requestData = {'dataID': 'MODIFY_POST', 'post_key': route.query.post_key, 'search_keyword': route.query.search_keyword,'page': route.query.page};
const {output} = await useNuxtApp().$connector(requestData);
</script>

<template>
  <div class="container">
    <main v-if="output">
      <navComp :output="output"/>
      <div class="row g-5">
        <div class="col-12">
          <div class="text-center">
            <h2 class="mt-5 mb-3">게시물 수정</h2>
          </div>
          <form id="frm_save_post" data-validation-alert="no">
            <input type="hidden" name="return_url" :value="'/post/'+output.post[0].seq+'/'+output.post[0].subject"/>
            <input type="hidden" name="post_key" :value="output.post[0].post_key"/>
            <div class="row">
              <div class="col-12">
                <div class="form-label">게시판</div>
                <div id="">
                  <div class="bg-gray-light rounded-3 my-3 py-3">
                    <div class="row">
                      <div class="col-6 col-lg-3" v-for="result in output.bbs_list">
                        <div class="me-2 px-3 py-2 my-2 bg-body-secondary rounded-3">
                          <input type="radio" class="form-check-input" :id="'bbs_'+result.seq" name="bbs_seq" :checked="output.post ? output.post[0].bbs_seq == result.seq : false" :value="result.seq" autocomplete="off">
                          <label :for="'bbs_'+result.seq" class="mx-2">{{result.bbs_name}}</label>
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
                <label for="content" class="form-label">내용</label>
                <textarea id="content" class="form-control" :name="'content['+(output.post ? output.post[0].contents[0].seq : '')+']'" data-validation="not-empty" rows="10" style="width:100%;">{{output.post ? output.post[0].contents[0].content : ''}}</textarea>
                <small class="invalid-feedback">
                  내용을 입력하세요
                </small>
                <div class="my-4 text-center mb-5">
                  <button type="submit" class="mx-1 btn btn-dark px-4">저장</button>
                  <NuxtLink href="/post/list" class="h-btn-cancel-save mx-1 btn btn-dark px-4">취소</NuxtLink>
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