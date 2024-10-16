<script setup>

import {init} from '@/composables/common';

const {route, env} = init();
import navComp from '@/components/nav.vue'

const requestData = {'dataID': 'SIGN_IN'};
const {output} = await useNuxtApp().$connector(requestData);
</script>

<template>
  <div v-if="output">
    <navComp :output="output"/>
    <main class="container">
      <div class="row g-5">
        <div class="offset-lg-3 col-lg-6">
          <div class="text-center">
            <h2 class="mt-5 mb-3">로그인</h2>
          </div>
          <form id="frm_sign_in">
            <input type="hidden" id="return_url" name="return_url" value="/post/list">
            <input type="hidden" id="return_url" name="fail_url" value="/member/mypage">
            <div class="my-1"><label class="sr-only">이메일</label>
              <input id="email" name="email" class="form-control" data-validation="email" data-validation-type="replace"
                     type="text" placeholder="이메일" value="demo@hanbnc.com">
            </div>
            <div class="my-1"><label class="sr-only">비밀번호</label><input class="form-control" type="password"
                                                                        id="password" name="password" placeholder="비밀번호"
                                                                        value="hdevplus1234"></div>
            <div class="form-check lh-base mt-3">
              <input class="form-check-input" type="checkbox" id="remember_me" name="remember_me" value="Y"><label
                class="form-check-label" for="remember_me">로그인상태 유지</label>
            </div>
            <div class="form-group mt-4">
              <button class="btn btn-dark w-100" type="submit">로그인</button>
            </div>
            <div class="form-group mt-3 text-center small">
              <NuxtLink href="/member/join">회원가입</NuxtLink>
              <span> | </span>
              <NuxtLink href="/member/find-password">비밀번호 찾기</NuxtLink>
            </div>
            <div class="form-group mt-4">
              <div><small>데모페이지 아이디 : demo@hanbnc.com / 비밀번호 : hdevplus1234</small></div>
              <div><small>관리콘솔(
                <NuxtLink href="https://www.hdevplus.com" target="_blank">https://www.hdevplus.com</NuxtLink>
                ) 아이디 : demo@hanbnc.com / 비밀번호 : hdevplus1234</small></div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>