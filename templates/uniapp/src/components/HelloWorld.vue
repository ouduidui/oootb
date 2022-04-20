<script setup lang="ts">
import { nav } from 'router/index'
const title = ref('Hello')

const toAbout = () => nav('about')
</script>

<template>
  <view
    class="font-momo text-center font-light p-5 flex-col items-center justify-center"
  >
    <view>HelloWorld</view>
    <button class="w-20 text-sm p-1 mt-4" @tap="toAbout">
      About
    </button>
  </view>
</template>
