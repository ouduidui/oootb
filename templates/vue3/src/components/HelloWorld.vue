<script setup lang="ts">
const props = defineProps<{
  initial: number
}>()

const count = ref(props.initial)

const addHandler = () => count.value++
</script>

<template>
  <div>
    <p text op75>
      Count: {{ count }}
    </p>
    <button m-3 text-sm btn bg-blue class="inc" @click="addHandler">
      Add
    </button>
  </div>
</template>
