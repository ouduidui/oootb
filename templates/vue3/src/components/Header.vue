<script setup lang="ts">
const router = useRouter()
const routes = useRoute()

const navs = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
]
</script>

<template>
  <div
    flex
    algin="center"
    justify="center"
    font-sans
    mt-10
    gap="4"
    text="gray-700 dark:gray-200"
    cursor-pointer
  >
    <p
      v-for="(nav, idx) in navs"
      :key="idx"
      text
      :class="routes.path === nav.path ? 'op75' : 'op50'"
      @click="router.push(nav.path)"
    >
      {{ nav.label }}
    </p>
  </div>
</template>
