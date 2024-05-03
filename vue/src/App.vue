<script setup>
import { ref } from 'vue';
import {Connector} from "@/_connector/yellow.501.js";
const output = ref(null); // 데이터를 저장할 반응형 참조
console.log(import.meta.env.VITE_APP_API_KEY);
</script>

<template>
  <router-view :Connector="Connector" :output="output"></router-view>
</template>