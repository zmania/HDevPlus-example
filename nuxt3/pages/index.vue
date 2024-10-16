<script setup>

import {init} from '@/composables/common';
const {route, env} = init();
import navComp from '@/components/nav.vue'
const requestData = {'dataID': 'DEFAULT', 'widget': ['most_read_post', 'test1'], 'index': true};
const {output} = await useNuxtApp().$connector(requestData);
</script>

<template>
    <div v-if="output">
      <navComp :output="output"/>
      <main class="container my-4">
        <div class="row">
          <div class="col-6">
            <div>
              <h6 class="mb-3">위젯 1 게시물</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent px-1 d-flex align-items-center justify-content-between" v-for="post in output.widget.most_read_post.content_list">
                  <NuxtLink :href="'/post/'+post.seq+'/'+post.subject" class="text-black"><small class="crop-text-1">{{ post.subject }}</small></NuxtLink>
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
                  <NuxtLink :href="'/post/'+post.content_seq+'/'+post.subject" class="text-black"><small class="crop-text-1">{{ post.subject }}</small></NuxtLink>
                  <small>{{post.create_date}}</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>