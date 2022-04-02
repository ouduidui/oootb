<script setup lang="ts">
import { isDark, toggleDark } from '~/composables/dark'
</script>

<template>
  <nav
    text-xl
    mt-6
    pb-6
    flex
    algin="center"
    justify="center"
    gap-2
    text="gray-700 dark:gray-200"
  >
    <button class="icon-btn !outline-none" @click="toggleDark()">
      <div v-if="isDark" i-carbon-moon />
      <div v-else i-carbon-sun />
    </button>

    <a
      class="icon-btn"
      i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/ouduidui"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
