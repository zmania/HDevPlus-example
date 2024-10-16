<script setup>

import navComp from '@/components/nav.vue'
const requestData = {'dataID': 'CHANGE_PASSWORD'};
const {output} = await useNuxtApp().$connector(requestData);
</script>

<template>
  <main v-if="output">
    <navComp :output="output"/>
    <div class="container">
      <div class="row">
        <div class="col-10 mb-5 mx-auto">
          <div class="px-lg-4 mb-5">
            <form id="frm_password" class="col-12 px-5 my-5 py-5">
              <input type="hidden" name="return_url" id="return_url" value="/member/mypage"/>
              <div class="row g-3">
                <div class="col-12 col-lg-6 offset-lg-3">
                  <div class="form-group has-validation">
                    <label for="password" class="form-label">현재 비밀번호</label>
                    <input type="password" class="form-control" data-validation="password-8-32" id="password" name="password" placeholder="비밀번호를 입력하세요">
                    <div class="invalid-feedback">
                      비밀번호를 확인하세요.
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-6 offset-lg-3">
                  <div class="form-group has-validation">
                    <label for="password" class="form-label">신규 비밀번호</label>
                    <input type="password" class="form-control" data-validation="password-8-32" id="new_password" name="new_password" placeholder="비밀번호를 입력하세요">
                    <div class="invalid-feedback">
                      비밀번호를 확인하세요.
                    </div>
                    <small class="form-text">8~32자리의 영문+숫자+특수문자 조합</small>
                  </div>
                </div>
                <div class="col-12 col-lg-6 offset-lg-3">
                  <div class="form-group has-validation">
                    <label for="password_re" class="form-label">신규 비밀번호 재입력</label>
                    <input type="password" class="form-control" data-validation="password-8-32" id="new_password_re" name="new_password_re" placeholder="비밀번호를 다시한번 입력하세요">
                    <div class="invalid-feedback">
                      비밀번호를 확인하세요.
                    </div>
                  </div>
                </div>
                <div class="my-5 text-center">
                  <button type="submit" class="mx-1 btn border-hbnc-primary bg-hanbnc-primary-3 border border-3 px-4">저장</button>
                  <NuxtLink href="" class="mx-1 btn border-gray-default-op-50 bg-gray-light border border-3 px-4">취소</NuxtLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>