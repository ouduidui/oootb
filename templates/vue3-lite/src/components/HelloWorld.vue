<script setup lang="ts">
const count = ref(0)

const addHandler = () => count.value++
</script>

<template>
  <div>
    <p text op75>Count: {{ count }}</p>
    <button m-3 text-sm btn bg-blue @click="addHandler">Add</button>
  </div>
</template>

<style scoped></style>
