<script setup>

import {init} from '@/composables/common';
const {route, env} = init();
import navComp from '@/components/nav.vue'
const requestData = {'dataID': 'SIGN_UP'};
const {output} = await useNuxtApp().$connector(requestData);
</script>

<template>
  <div class="container">
    <navComp :output="output"/>
    <main>
      <div class="row">
        <div class="col-12">
          <form id="frm_sign_up" class="col-12 col-lg-7 mx-auto mt-5 needs-validation form-signup">
            <input type="hidden" name="return_url" id="return_url" value="/user/sign-in">
            <div class="text-center">
              <h2 class="my-3">회원가입</h2>
            </div>
            <div class="my-4">
              <div>
                <div class="form-check lh-base mt-3">
                  <input class="form-check-input" type="checkbox" id="term_agree" name="term_agree" value="Y">
                  <label class="form-check-label" for="remember_me">이용약관 및 개인정보 처리방침에 동의합니다.</label>
                </div>
              </div>
            </div>
            <div>
              <div class="row g-3">
                <div class="col-12">
                  <div class="form-group has-validation">
                    <label for="email" class="form-label">이메일</label>
                    <input type="email" class="form-control" data-validation="email" data-validation-type="replace" id="email" name="email" placeholder="이메일을 입력하세요" data-gtm-form-interact-field-id="0">
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group has-validation">
                    <label for="cell_phone" class="form-label">휴대전화</label>
                    <input type="text" class="form-control" data-validation="number" data-validation-type="replace" id="cell_phone" name="cell_phone" placeholder="휴대전화 번호를 입력하세요">
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group has-validation">
                    <label for="name" class="form-label">이름</label>
                    <input type="text" class="form-control" data-validation="not-empty" id="name" name="name" placeholder="이름을 입력하세요">
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group has-validation">
                    <label for="nickname" class="form-label">닉네임</label>
                    <input type="text" class="form-control" data-validation="not-empty" id="nickname" name="nickname" placeholder="닉네임을 입력하세요">
                  </div>
                </div>
                <div class="col-12">
                  <label for="barth_y" class="form-label">생일(년)</label>
                  <select class="form-select" id="barth_y" name="barth_y" data-validation="not-empty">
                    <option value="">년도 선택</option>
                    <option value="2023">2023년</option>
                    <option value="2022">2022년</option>
                    <option value="1945">1945년</option>
                    <option value="1944">1944년</option>
                  </select>
                </div>
                <div class="col-6">
                  <label for="barth_m" class="form-label">생일(월)</label>
                  <select class="form-select" id="barth_m" name="barth_m" data-validation="not-empty">
                    <option value="">월 선택</option>
                    <option value="1">1월</option>
                    <option value="12">12월</option>
                  </select>
                </div>
                <div class="col-6">
                  <label for="barth_d" class="form-label">생일(일)</label>
                  <select class="form-select" id="barth_d" name="barth_d" data-validation="not-empty">
                    <option value="">일 선택</option>
                    <option value="1">1일</option>
                    <option value="2">2일</option>
                    <option value="31">31일</option>
                  </select>
                </div>
                <div class="col-12">
                  <div class="form-group has-validation">
                    <label for="password" class="form-label">비밀번호</label>
                    <input type="password" class="form-control" data-validation="password-8-32" id="password" name="password" placeholder="비밀번호를 입력하세요" data-gtm-form-interact-field-id="1">
                    <div class="invalid-feedback"> 비밀번호를 확인하세요.</div>
                    <small class="form-text">8~32자리의 영문+숫자+특수문자 조합</small>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group has-validation">
                    <label for="password_re" class="form-label">비밀번호 재입력</label>
                    <input type="password" class="form-control" data-validation="password-8-32" id="password_re" name="password_re" placeholder="비밀번호를 다시한번 입력하세요">
                    <div class="invalid-feedback"> 비밀번호를 확인하세요.</div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group has-validation">
                    <div class="form-check lh-base mt-3">
                      <input class="form-check-input" type="checkbox" id="receive_message" name="receive_message" value="Y">
                      <label class="form-check-label" for="remember_me">소식 및 정보수신에 동의합니다.</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-5 text-center">
              <button class="w-50 px-4 btn btn-dark" type="submit">회원가입</button>
              <p class="my-3"><NuxtLink href="/member/join">로그인</NuxtLink><span class="mx-2">|</span><NuxtLink href="#">비밀번호 찾기</NuxtLink></p>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>