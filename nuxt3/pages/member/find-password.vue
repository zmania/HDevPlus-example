<script setup>
import {init} from '@/composables/common';

const {route, env} = init();
import navComp from '@/components/nav.vue'
const requestData = {dataID: 'FIND_PASSWORD'}
const {output} = await useNuxtApp().$connector(requestData);

</script>

<template>
  <div v-if="output">
    <navComp :output="output"/>
    <main>
      <section class="main">
        <div class="container">
          <div class="row">
            <div class="col-12">
                <div class="row">
                  <div class="text-center">
                    <h2 class="mt-5 mb-3">비밀번호 찾기</h2>
                  </div>
                  <form id="frm_find_password" class="col-12 col-md-7 mx-md-auto" method="post">
                    <input type="hidden" id="return_url" name="return_url" value="/user/sign-in">
                    <div class="my-1"><label class="sr-only">이메일</label>
                      <input id="email" name="email" class="form-control" data-validation="email" data-validation-type="replace" type="text" placeholder="이메일" value="">
                      <small class="form-text">가입시 등록한 이메일로 임시 비밀번호가 발송됩니다.</small>
                    </div>
                    <div class="form-group mt-4 text-center">
                      <button class="btn btn-outline-dark" type="submit">비밀번호 찾기</button>
                    </div>
                    <div class="form-group mt-3 text-center small">
                      <NuxtLink href="/member/login">로그인</NuxtLink>
                      <span> | </span>
                      <NuxtLink href="/member/join">회원가입</NuxtLink>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>