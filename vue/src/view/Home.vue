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
const requestData = {'dataID': 'DEFAULT', 'widget': ['most_read_post', 'test1'], 'index': true};

Connector.request(requestData, (data) => {
  output.value = data; // 성공 시 데이터 저장
}, (error) => {
  console.error('Request failed:', error); // 실패 시 에러 로깅
});
</script>

<template>
    <div v-if="output" class="container">
      <navComp :output="output"/>
      <main class="my-4">
        <div class="row g-5">
          <div class="col-6">
            <div>
              <h6 class="mb-3">위젯 1 게시물</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent px-1 d-flex align-items-center justify-content-between" v-for="post in output.widget.most_read_post.content_list">
                  <a :href="'/post/view?post_key='+post.post_key" class="text-black"><small class="crop-text-1">{{ post.subject }}</small></a>
                  <small>{{post.create_date}}</small>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-6">
            <div>
              <h6 class="mb-3">위젯 2 게시물</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent px-1 d-flex align-items-center justify-content-between" v-for="post in output.widget.test1.content_list">
                  <a :href="'/post/view?post_key='+post.post_key" class="text-black"><small class="crop-text-1">{{ post.subject }}</small></a>
                  <small>{{post.create_date}}</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

    </div>
</template>