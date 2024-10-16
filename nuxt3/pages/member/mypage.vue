<script setup>
import {init} from '@/composables/common';
const {route, env} = init();
import {ref} from "vue";
import navComp from '@/components/nav.vue'
const requestData = {'dataID': 'MY_PAGE','fail_redirect_url':'/member/login','my_notice_limit':10,'my_notice_flg':'Y'};
const {output} = await useNuxtApp().$connector(requestData);
</script>

<template>
    <div v-if="output">
      <navComp :output="output"/>
      <main class="container">
        <div class="row">
          <div class="12 mb-5 mx-auto">
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
              <div class="text-center">
                <NuxtLink href="/member/auth" class="mx-1 btn btn-dark mx-auto">회원정보 수정</NuxtLink>
                &nbsp;
                <NuxtLink href="/member/change-password" class="mx-1 btn btn-dark mx-auto">비밀번호 변경</NuxtLink>
              </div>
              <!-- MY NOTICE LIST START -->
              <div v-if="output.notice_list?output.notice_list.length:false">
                <ul class="list-group list-group-flush my-5">
                  <li class="list-group-item py-3 bg-transparent" v-for="result in output.notice_list">
                    <p class="d-sm-flex flex-wrap align-items-center mb-2">
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
                  <pagination :pagination="output.pagination" :env="env" :route="route"/>
                </div>
                <!-- PAGINATION END -->
              </div>
              <div v-else class="my-4 px-3 py-4 text-center rounded-3 d-flex align-items-center justify-content-center"><i class="far fa-bell me-2"></i> <small>활동 내역이 없습니다.</small></div>
              <!-- MY NOTICE LIST END -->
            </div>
          </div>
        </div>
      </main>
    </div>
</template>