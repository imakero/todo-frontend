import { Checkbox, HStack } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "react-query"
import { toggleTodo } from "../lib/apiWrappers"

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient()
  const toggleTodoMutation = useMutation(toggleTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
    },
  })

  const handleChange = () => {
    toggleTodoMutation.mutate({ todoId: todo._id, completed: todo.completed })
  }

  return (
    <HStack>
      <Checkbox isChecked={todo.completed} onChange={handleChange}>
        {todo.title}
      </Checkbox>
    </HStack>
  )
}

export default TodoItem
