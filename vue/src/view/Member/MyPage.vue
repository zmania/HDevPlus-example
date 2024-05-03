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
const requestData = {'dataID': 'MY_PAGE','fail_redirect_url':'/member/login','my_notice_limit':10,'my_notice_flg':'Y'};

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
              <div class="text-center">
                <a href="/member/auth" class="mx-1 btn btn-dark mx-auto">회원정보 수정</a>
                &nbsp;
                <a href="/member/change-password" class="mx-1 btn btn-dark mx-auto">비밀번호 변경</a>
              </div>
              <!-- MY NOTICE LIST START -->
              <div v-if="output.notice_list?output.notice_list.length:false">
                <ul class="list-group list-group-flush my-5">
                  <li class="list-group-item py-3 bg-transparent" v-for="result in output.notice_list">
                    <p class="d-sm-flex flex-wrap align-items-center mb-2">
                      <a href="" class="avatar avatar-sm me-2 d-none d-sm-inline"><img :src="result.avatar_url" alt=""></a>
                      <span class="fs-sm" v-html="result.notice_message"></span>
                      <span class="my-2 text-secondary text-nowrap fs-xs ms-auto d-flex align-items-center justify-content-end">
                                            <i class="far fa-clock me-1"></i><small>{{result.create_date}}</small>
                                    </span>
                    </p>
                    <div class="card border-0" v-if="result.notice_content">
                      <div class="card-body small" v-html="result.notice_content"></div>
                    </div>
                  </li>
                </ul>
                <!-- PAGINATION START -->
                <div class="mt-2">
                  <nav>
                    <ul class="pagination justify-content-center mb-0">
                      <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.first.link" v-bind:data-page="output.pagination.paging.first.number"><i class="fas fa-angle-double-left"></i></a></li>
                      <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.prev.link" v-bind:data-page="output.pagination.paging.prev.number"><i class="fas fa-angle-left"></i></a></li>
                      <li class="page-item h-page-numbers" v-if="output.pagination.paging.page" v-for="page in output.pagination.paging.page"><a class="border-0 bg-transparent" :class="{'page-link':true, 'active': output.pagination.page == page.number }" v-bind:href="page.link" v-bind:data-page="page.number">{{page.number}}</a></li>
                      <li class="page-item" v-else><a class="border-0 page-link bg-transparent">1</a></li>
                      <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.next.link" v-bind:data-page="output.pagination.paging.next.number"><i class="fas fa-angle-right"></i></a></li>
                      <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.end.link" v-bind:data-page="output.pagination.paging.end.number"><i class="fas fa-angle-double-right"></i></a></li>
                    </ul>
                  </nav>
                </div>
                <!-- PAGINATION END -->
              </div>
              <div v-else class="my-4 px-3 py-4 text-center rounded-3 d-flex align-items-center justify-content-center"><i class="far fa-bell me-2"></i> <small>활동 내역이 없습니다.</small></div>
              <!-- MY NOTICE LIST END -->
            </div>
          </div>
        </div>
      </div>
    </main>
</template>