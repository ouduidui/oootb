import { useStores } from '~/stores'

type ActionType = 'Delete' | 'Done' | 'Back'

export default function Detail() {
  const navigate = useNavigate()
  const params = useParams()
  const { todoListStore } = useStores()
  const { todos, deleteTodo, todoDone } = todoListStore
  const todo = todos.find(t => t.id === Number(params.id))

  if (todo) {
    const actions: ActionType[] = todo?.done ? ['Delete', 'Back'] : ['Done', 'Delete', 'Back']

    const actionHandle = (action: ActionType) => {
      switch (action) {
        case 'Done':
          todoDone(todo!.id)
          break
        case 'Delete':
          deleteTodo(todo!.id)
          navigate(-1)
          break
        case 'Back':
          navigate(-1)
          break
      }
    }
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-3xl pb-10">Todo</div>

        <div className="text-xl">{todo?.content}</div>
        <div className="mt-20">
          {
            actions.map(action => (
              <button
                className="px-3 py-2 opacity-70 hover:opacity-100"
                key={action}
                onClick={() => actionHandle(action)}
              >
                {action}
              </button>
            ))
          }
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-3xl pb-10">Todo</div>
        <div className="text-xl">Not Found</div>
        <button
          className="mt-20 px-3 py-2 opacity-70 hover:opacity-100"
          onClick={() => navigate(-1)}
        >Back</button>
      </div>
    )
  }
}
