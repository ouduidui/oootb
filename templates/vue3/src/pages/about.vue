<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { userStore } from '~/stores/index'

const store = userStore()
const { nickName, randomNumber } = storeToRefs(store)
</script>

<template>
  <div font-sans p="x-4 y-4" text="center gray-700 dark:gray-200">
    <p>my name is {{ nickName }}, random number is {{ randomNumber }}.</p>
    <button btn mt-5 @click="store.resetRandomNumber()">
      reset random number
    </button>
  </div>
</template>
