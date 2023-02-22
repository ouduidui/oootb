<script setup lang="ts">
import type { TodoType } from '~/stores'

const props = defineProps<{
  todo: TodoType
  done?: boolean
}>()

const emits = defineEmits<{
  doneHandle: (id: number, done: boolean) => void
}>()

const router = useRouter()

const toDetail = () => router.push(`/detail/${props.todo.id}`)

</script>

<template>
  <div
    mb-3
    p="x-4 y-2"
    w-300px
    border="~ gray-700 dark:gray-200"
    bg-transparent
    flex
    items-center
    hover:shadow-sm
    :class="props.done ? 'opacity-50' : ''"
    @click="toDetail"
  >
    <div
      cursor-pointer
      mr-3
      :class="props.done ? 'i-carbon-checkbox-checked' : 'i-carbon-checkbox' "
      @click.stop="emits('doneHandle', props.todo.id, !props.done)"
    />
    <div>
      {{ props.todo.content }}
    </div>
  </div>
</template>

<style scope></style>
