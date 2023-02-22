import React from 'react'
import type { TodoType } from '../stores/todolist'

interface PropsType {
  todo: TodoType
  doneHandle: (id: number) => void
}

export default observer(({ todo, doneHandle }: PropsType) => {
  const navigate = useNavigate()
  const { id, done, content } = todo

  const toggleDone = (e: React.MouseEvent) => {
    e.stopPropagation()
    doneHandle(id)
  }

  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className={`mb-3 px-4 py-2 w-300px border border-gray-200 border-dark:gray-700 bg-transparent flex items-center hover:shadow-sm ${done ? 'opacity-50' : ''}`}>
      <div
        onClick={e => toggleDone(e)}
        className={`cursor-pointer mr-3 ${done ? 'i-carbon-checkbox-checked' : 'i-carbon-checkbox'}`} />
      <div>{content}</div>
    </div>
  )
})
