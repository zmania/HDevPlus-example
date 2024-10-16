<script setup>

import {ref, computed} from "vue";
import {init} from '@/composables/common';
const {route, env} = init();
import navComp from '@/components/nav.vue'

const requestData = {'dataID': 'MODIFY_USER', 'fail_redirect_url': '/user/sign-in', 'token': route.query.token, 'my_post_list_flg': 'Y', 'my_post_list_limit': 10, 'my_notice_flg': 'Y', 'my_notice_limit': 20, 'post_responder_flg': 'Y', 'post_responder_limit': 20, 'page': route.query.page};
const {output} = await useNuxtApp().$connector(requestData);

const currentYear = new Date().getFullYear();

const years = computed(() => {
  const yearList = [];
  for (let y = currentYear; y > currentYear - 80; y--) {
    yearList.push(y);
  }
  return yearList;
});

const months = Array.from({length: 12}, (_, i) => i + 1);
const days = Array.from({length: 31}, (_, i) => i + 1);

</script>

<template>
    <div v-if="output && output.member.length>0">
      <navComp :output="output"/>
      <main class="container">
        <div class="row">
          <div class="col-12 mb-5">
            <div class="px-lg-4 mb-5">
              <!-- USER PROFILE START -->
              <div class="mb-3 row rounded-3 py-3">
                <div class="w-100 my-2 ps-3 py-3 me-4 rounded-3 col-12 col-md-12 col-lg media-body d-flex flex-column align-items-start justify-content-center">
                  <div class="w-100 text-center text-lg-start d-flex align-items-center justify-content-start">
                    <h4>
                      {{output.user.nickname}}
                    </h4>
                    <small class="d-block my-2 ms-2">({{output.user.name}})</small>
                  </div>
                  <div class="w-100 mt-2 row row-cols-sm-auto justify-content-center justify-content-lg-start">
                    <div class="col-6 col-sm-3">
                      <span class="w-100 mt-2 py-3 badge text-white rounded-pill bg-secondary">Level : {{output.member[0].level.toLocaleString()}}</span>
                    </div>
                    <div class="col-6 col-sm-3">
                      <span class="w-100 mt-2 py-3 badge text-white rounded-pill bg-secondary">Post : {{output.member_post_count ? output.member_post_count.toLocaleString() : 0}}</span>
                    </div>
                    <div class="col-6 col-sm-3">
                      <span class="w-100 ms-3 py-3 mt-2 badge text-white rounded-pill bg-secondary">Comment : {{output.member_comment_count ? output.member_comment_count.toLocaleString() : 0}}</span>
                    </div>
                    <div class="col-6 col-sm-3">
                      <span class="w-100 ms-3 py-3 mt-2 badge text-white rounded-pill bg-secondary">Like : {{output.member_like_count ? output.member_like_count.toLocaleString() : 0}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- USER PROFILE END -->
              <!-- MODIFY FORM START -->
              <form id="frm_member" class="my-2">
                <input type="hidden" name="return_url" id="return_url" value="/member/mypage"/>
                <input type="hidden" name="auth_expire_url" id="auth_expire_url" value="/member/auth"/>
                <input type="hidden" name="token" id="token" :value="requestData.token"/>
                <div class="setting-item my-2 py-2 border-bottom">
                  <div class="row g-2 align-items-center">
                    <div class="col-md-5">
                      <h6 class="fw-bold">이메일</h6>
                      <p class="small mb-0">사용하시는 이메일 주소를 입력하세요.</p>
                    </div><!-- col -->
                    <div class="col-md">
                      <input type="email" :value="output.member[0].email" class="form-control" data-validation="email" data-validation-type="replace" id="email" name="email" placeholder="이메일을 입력하세요" data-gtm-form-interact-field-id="0">
                    </div><!-- col -->
                  </div><!-- row -->
                </div>
                <div class="setting-item my-2 py-2 border-bottom">
                  <div class="row g-2 align-items-center">
                    <div class="col-md-5">
                      <h6 class="fw-bold">휴대전화</h6>
                      <p class="small mb-0">휴대전화번호를 입력하세요.</p>
                    </div><!-- col -->
                    <div class="col-md">
                      <input type="text" :value="output.member[0].cell_phone" class="form-control" data-validation="number" data-validation-type="replace" id="cell_phone" name="cell_phone" placeholder="휴대전화 번호를 입력하세요">
                    </div><!-- col -->
                  </div><!-- row -->
                </div>
                <div class="setting-item my-2 py-2 border-bottom">
                  <div class="row g-2 align-items-center">
                    <div class="col-md-5">
                      <h6 class="fw-bold">이름</h6>
                      <p class="small mb-0">이름을 입력하세요.</p>
                    </div><!-- col -->
                    <div class="col-md">
                      <input type="text" :value="output.member[0].name" class="form-control" data-validation="not-empty" id="name" name="name" placeholder="이름을 입력하세요">
                    </div><!-- col -->
                  </div><!-- row -->
                </div>
                <div class="setting-item my-2 py-2 border-bottom">
                  <div class="row g-2 align-items-center">
                    <div class="col-md-5">
                      <h6 class="fw-bold">닉네임</h6>
                      <p class="small mb-0">포럼 등에서 사용할 닉네임을 입력하세요.</p>
                    </div><!-- col -->
                    <div class="col-md">
                      <input type="text" :value="output.member[0].nickname" class="form-control" data-validation="not-empty" id="nickname" name="nickname" placeholder="닉네임을 입력하세요">
                    </div><!-- col -->
                  </div><!-- row -->
                </div>
                <div class="setting-item my-2 py-2 border-bottom">
                  <div class="row g-2 align-items-center">
                    <div class="col-md-5">
                      <h6 class="fw-bold">생일</h6>
                      <p class="small mb-0">생일을 선택하세요.</p>
                    </div><!-- col -->
                    <div class="col-md">
                      <div class="row">
                        <div class="col-12 col-md-4">
                          <select class="form-select" id="birth_y" name="birth_y" data-validation="not-empty">
                            <option value="" :selected="!output.member[0].birth_y">년도 선택</option>
                            <option v-for="year in years" :key="year" :value="year" :selected="Number(output.member[0].birth_y) === year">{{ year }}년</option>
                          </select>
                        </div>
                        <div class="col-12 col-md-4">
                          <select class="form-select" id="birth_m" name="birth_m" data-validation="not-empty">
                            <option value="" :selected="!output.member[0].birth_m">월 선택</option>
                            <option v-for="month in months" :key="month" :value="month" :selected="Number(output.member[0].birth_m) === month">{{ month }}월</option>
                          </select>
                        </div>
                        <div class="col-12 col-md-4">
                          <select class="form-select" id="birth_d" name="birth_d" data-validation="not-empty">
                            <option value="" :selected="!output.member[0].birth_d">일 선택</option>
                            <option v-for="day in days" :key="day" :value="day" :selected="Number(output.member[0].birth_d) === day">{{ day }}일</option>
                          </select>
                        </div>
                      </div>
                    </div><!-- col -->
                  </div><!-- row -->
                </div>
                <div class="setting-item my-2 py-2 border-bottom">
                  <div class="row g-2 align-items-center">
                    <div class="col-md-5">
                      <h6 class="fw-bold">소식 및 정보 수신</h6>
                      <p class="small mb-0">소식 및 정보 수신 여부를 선택하세요.</p>
                    </div><!-- col -->
                    <div class="col-md">
                      <div class="form-group has-validation">
                        <div class="form-check lh-base">
                          <input class="form-check-input" type="checkbox" id="receive_message_flg" name="receive_message_flg" value="Y" :checked="output.member[0].receive_message_flg=='Y'"><label class="form-check-label" for="receive_message_flg">소식 및 정보등의 수신 동의.</label>
                        </div>
                      </div>
                    </div><!-- col -->
                  </div><!-- row -->
                </div>

                <div class="my-5 text-center">
                  <div class="my-4 text-center mb-5">
                    <button type="submit" class="mx-1 btn btn-outline-dark px-4">확인</button>
                    <NuxtLink href="/member/mypage/" class="mx-1 btn btn-outline-secondary px-4">취소</NuxtLink>
                  </div>
                </div>
              </form>
              <!-- MODIFY FORM END -->
            </div>
          </div>
        </div>
      </main>
    </div>
</template>