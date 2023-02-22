<script setup lang="ts">
import { todosStore } from '~/stores/index'

const store = todosStore()
const { todos, doneTodos } = storeToRefs(store)
const doneHandle = (id: number, done: boolean) => store.todoDone(id, done)

const inputContent = ref('')

const addTodoHandle = () => {
  if (inputContent.value) {
    store.addTodo(inputContent.value)
    inputContent.value = ''
  }
}
</script>

<template>
  <main
    font-sans
    text="gray-700 dark:gray-200"
    flex
    flex-col
    items-center
  >
    <div text-3xl pb-10>
      Todo List
    </div>

    <input
      v-model="inputContent"
      placeholder="add a todo"
      type="text"
      block
      p="x-4 y-2"
      mb-8
      w-250px
      text-center
      bg-transparent
      outline="none active:none"
      border="~ rounded gray-700 dark:gray-200"
      @keyup.enter="addTodoHandle"
    >

    <div>
      <todo-item
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @done-handle="doneHandle"
      />
      <todo-item
        v-for="todo in doneTodos"
        :key="todo.id"
        done
        :todo="todo"
        @done-handle="doneHandle"
      />
    </div>
  </main>
</template>
