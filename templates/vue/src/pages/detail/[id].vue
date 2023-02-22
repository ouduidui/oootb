<script setup lang="ts">
import { todosStore } from '~/stores'

const route = useRoute()
const id = Number(route.params.id as string)

const store = todosStore()
let done = false
let todo = store.todos.find(todo => todo.id === id)
if (!todo) {
  done = true
  todo = store.doneTodos.find(todo => todo.id === id)
}

type ActionType = 'Delete' | 'Done' | 'Back'
const actions: ActionType[] = done ? ['Delete', 'Back'] : ['Done', 'Delete', 'Back']

const router = useRouter()

const back = () => router.back()

const actionHandle = (action: ActionType) => {
  switch (action) {
    case 'Done':
      store.todoDone(todo!.id, !done)
      break
    case 'Delete':
      store.deleteTodo(todo!.id, done)
      break
  }
  back()
}
</script>

<template>
  <div font-sans flex="~ col" items-center text="gray-700 dark:gray-200">
    <div text-3xl pb-10>
      Todo
    </div>
    <template v-if="todo">
      <div text-xl>
        {{ todo.content }}
      </div>
      <div mt-20>
        <button
          v-for="action in actions"
          :key="action"
          p="x-3 y-2"
          opacity="70 hover:100"
          @click="actionHandle(action)"
        >
          {{ action }}
        </button>
      </div>
    </template>

    <template v-else>
      <div text-xl>
        Not Found
      </div>
      <button
        mt-20
        p="x-3 y-2"
        opacity="70 hover:100"
        @click="back"
      >
        Back
      </button>
    </template>
  </div>
</template>

<style scope></style>
