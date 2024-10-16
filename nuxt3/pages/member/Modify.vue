<script setup>

import {ref, computed} from "vue";
import navComp from '@/components/nav.vue'
const output = ref(null)
const {Connector} = defineProps({
  Connector: {
    type: Object,
    default: {}
  }
});
const requestData = {'dataID': 'MODIFY_USER','token': new URLSearchParams(window.location.search).get('token'),'fail_redirect_url':'/member/auth'};

Connector.request(requestData, (data) => {
  output.value = data; // 성공 시 데이터 저장
}, (error) => {
  console.error('Request failed:', error); // 실패 시 에러 로깅
});

const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(new Date().getMonth() + 1);
const selectedDay = ref(new Date().getDate());
const years = range(1900, new Date().getFullYear());

const daysInMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value, 0).getDate();
});

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

</script>

<template>
    <main v-if="output && output.member.length>0">
      <navComp :output="output"/>
      <div class="container">
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
                      <span class="w-100 mt-2 badge text-white rounded-pill bg-secondary">Level : {{output.member[0].level.toLocaleString()}}</span>
                    </div>
                    <div class="col-6 col-sm-3">
                      <span class="w-100 mt-2 badge text-white rounded-pill bg-secondary">Post : {{output.member_post_count ? output.member_post_count.toLocaleString() : 0}}</span>
                    </div>
                    <div class="col-6 col-sm-3">
                      <span class="w-100 ms-3 mt-2 badge text-white rounded-pill bg-secondary">Comment : {{output.member_comment_count ? output.member_comment_count.toLocaleString() : 0}}</span>
                    </div>
                    <div class="col-6 col-sm-3">
                      <span class="w-100 ms-3 mt-2 badge text-white rounded-pill bg-secondary">Like : {{output.member_like_count ? output.member_like_count.toLocaleString() : 0}}</span>
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
                        <div class="col">
                          <label for="barth_y" class="form-label visually-hidden">생일(년)</label>
                          <select class="form-select" id="barth_y" name="barth_y" data-validation="not-empty" v-model="selectedYear">
                            <option value="">년도 선택</option>
                            <option v-for="year in years" :key="year" :value="year">
                              {{ year }}
                            </option>
                          </select>
                        </div>
                        <div class="col">
                          <label for="barth_m" class="form-label visually-hidden">생일(월)</label>
                          <select class="form-select" id="barth_m" name="barth_m" data-validation="not-empty" v-model="selectedMonth">
                            <option value="" selected="selected">월 선택</option>
                            <option v-for="month in 12" :key="month" :value="month">
                              {{ month }}
                            </option>
                          </select>
                        </div>
                        <div class="col">
                          <label for="barth_d" class="form-label visually-hidden">생일(일)</label>
                          <select  class="form-select" id="barth_d" name="barth_d" data-validation="not-empty" v-model="selectedDay">
                            <option value="" selected="selected">일 선택</option>
                            <option v-for="day in daysInMonth" :key="day" :value="day">
                              {{ day }}
                            </option>
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
                    <button type="submit" class="mx-1 btn border-hbnc-primary bg-hanbnc-primary-3 border border-3 px-4">확인</button>
                    <NuxtLink href="/member/mypage/" class="mx-1 btn border-gray-default-op-50 bg-gray-light border border-3 px-4">취소</NuxtLink>
                  </div>
                </div>
              </form>
              <!-- MODIFY FORM END -->
            </div>
          </div>
        </div>
      </div>
    </main>
</template>