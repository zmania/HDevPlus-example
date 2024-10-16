<template>
  <main v-if="pagination.paging.page.length>0">
    <nav>
      <ul class="pagination justify-content-center mb-0">
        <li class="page-item"><NuxtLink class="page-link border-0 bg-transparent" v-bind:href="pagination.paging.first.link" v-bind:data-page="pagination.paging.first.number"><client-only><i class="fas fa-angle-double-left"></i></client-only></NuxtLink></li>
        <li class="page-item"><NuxtLink class="page-link border-0 bg-transparent" v-bind:href="pagination.paging.prev.link" v-bind:data-page="pagination.paging.prev.number"><client-only><i class="fas fa-angle-left"></i></client-only></NuxtLink></li>
        <li class="page-item h-page-numbers" v-if="pagination.paging.page" v-for="page in pagination.paging.page"><NuxtLink class="border-0" :class="{'page-link':true, 'active': pagination.page == page.number }" v-bind:href="page.link" v-bind:data-page="page.number">{{ page.number }}</NuxtLink></li>
        <li class="page-item" v-else><NuxtLink class="border-0 page-link bg-transparent">1</NuxtLink></li>
        <li class="page-item"><NuxtLink class="page-link border-0 bg-transparent" v-bind:href="pagination.paging.next.link" v-bind:data-page="pagination.paging.next.number"><client-only><i class="fas fa-angle-right"></i></client-only></NuxtLink></li>
        <li class="page-item"><NuxtLink class="page-link border-0 bg-transparent" v-bind:href="pagination.paging.end.link" v-bind:data-page="pagination.paging.end.number"><client-only><i class="fas fa-angle-double-right"></i></client-only></NuxtLink></li>
      </ul>
    </nav>
  </main>
</template>
<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  pagination: {
    type: Object,
    required: true
  },
  env: {
    type: Object,
    required: true
  },
  route: {
    type: Object,
    required: true
  }
});
</script>