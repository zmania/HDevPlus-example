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
const requestData = {'dataID': 'GET_POST_LIST', 'list_per_page': 10, 'page_link_url': '/post/list', 'search_keyword': new URLSearchParams(window.location.search).get('search_keyword'), 'page': new URLSearchParams(window.location.search).get('page') ? new URLSearchParams(window.location.search).get('page') : 1};

Connector.request(requestData, (data) => {
  output.value = data; // 성공 시 데이터 저장
}, (error) => {
  console.error('Request failed:', error); // 실패 시 에러 로깅
});
</script>

<template>
  <main v-if="output && output.pagination">
    <navComp :output="output"/>
    <div class="row g-5">
      <div class="col-12">
        <div class="text-center">
          <h2 class="mt-5 mb-3">게시물 목록</h2>
        </div>
        <div class="py-2 d-flex justify-content-between align-items-center">
          <small class="smaller text-black"> Result {{ output.pagination.total_result_num }} post / total {{ output.total_post_count }} post </small>
          <a :href="output.user.auth_flg ? '/post/add' : '/member/login'" class="btn btn-sm btn-dark d-flex justify-content-between align-items-center lh-1"><small class="smaller">ADD</small></a>
        </div>
        <div id="post_list" data-load-type="vue-pagination" class="row h-post-list">
          <div class="col-12 my-3" v-if="output.post_list.length>0" v-for="post in output.post_list">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <small>{{ post.reg_name }}</small><small>{{ post.create_date }}</small>
                </div>
                <hr/>
                <h1 class="fs-3 card-title py-3"><a :href="'/post/view?post_key='+post.post_key" v-html="post.subject"></a></h1>
                <p class="card-text" v-html="post.content"></p>
              </div>
            </div>
          </div>
          <div class="col-12" v-else>
            <div class=" my-2 d-flex justify-content-center align-items-center alert alert-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>
              <span class="ms-2">게시물이 없습니다.</span>
            </div>
          </div>
        </div>
        <div>
          <nav>
            <ul class="pagination justify-content-center mb-0">
              <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.first.link" v-bind:data-page="output.pagination.paging.first.number"><i class="fas fa-angle-double-left"></i></a></li>
              <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.prev.link" v-bind:data-page="output.pagination.paging.prev.number"><i class="fas fa-angle-left"></i></a></li>
              <li class="page-item h-page-numbers" v-if="output.pagination.paging.page" v-for="page in output.pagination.paging.page"><a :class="{'page-link':true, 'active': output.pagination.page == page.number }" v-bind:href="page.link" v-bind:data-page="page.number">{{ page.number }}</a></li>
              <li class="page-item" v-else><a class="border-0 page-link">1</a></li>
              <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.next.link" v-bind:data-page="output.pagination.paging.next.number"><i class="fas fa-angle-right"></i></a></li>
              <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.end.link" v-bind:data-page="output.pagination.paging.end.number"><i class="fas fa-angle-double-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>