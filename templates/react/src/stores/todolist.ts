import { makePersistable } from 'mobx-persist-store'

export interface TodoType {
  id: number
  content: string
  done: boolean
}

class TodoListStore {
  todos: TodoType[] = [{
    id: 1,
    content: 'Study React.',
    done: false,
  }]

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: 'todolist',
      properties: ['todos'],
      storage: window.localStorage,
    })
  }

  addTodo(content: string) {
    this.todos.unshift({
      id: this.todos.length + 1,
      content,
      done: false,
    })
  }

  todoDone(id: number) {
    const idx = this.todos.findIndex(todo => todo.id === id)
    if (idx !== -1) {
      const todo = this.todos[idx]
      todo.done = !todo.done
      this.todos = this.todos.filter(t => t !== todo)
      if (todo.done)
        this.todos.push(todo)
      else
        this.todos.unshift(todo)
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
}

const todoListStore = new TodoListStore()

export {
  todoListStore,
}
