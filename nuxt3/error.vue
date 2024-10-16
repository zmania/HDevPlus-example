<template>
  <div class="container">
    <navComp :output="output"/>
    <main class="my-4">
      <div class="row">
        <div class="col-12">
          <div class="text-center py-5">
          <h1 v-if="error.statusCode === 404">Page not found</h1>
          <h1 v-else>An error occurred</h1>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>

import {init} from '@/composables/common';
const {route, env} = init();
const error = useError();
import navComp from '@/components/nav.vue'
const requestData = {'dataID': 'DEFAULT', 'widget': ['most_read_post', 'test1'], 'index': true};
const {output} = await useNuxtApp().$connector(requestData);
</script>

<style>
/* 여기에 CSS 스타일을 추가하세요 */
</style>