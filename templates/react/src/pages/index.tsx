import { useStores } from '../stores'
import TodoItem from '../components/TodoItem'

export default observer(() => {
  const { todoListStore } = useStores()
  const { todos, addTodo, todoDone } = todoListStore

  const doneHandle = (id: number) => {
    todoDone(id)
  }

  const inputEl = useRef<HTMLInputElement>(null)

  const addTodoHandle = () => {
    const content = inputEl.current?.value
    if (content) {
      addTodo(content)
      inputEl.current!.value = ''
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-3xl pb-10">Todo List</div>

      <input
        ref={inputEl}
        placeholder="add a todo"
        type="text"
        className="block px-4 py-2 mb-8 w-250px text-center bg-transparent outline-none outline-active:none border border-rounded border-gray-200 border-dark:gray-700"
        onKeyDown={({ key }) => key === 'Enter' && addTodoHandle()}
      />

      <div>
        {
          todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} doneHandle={doneHandle} />
          ))
        }
      </div>
    </div>
  )
})
