import { Checkbox, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "react-query"
import { toggleTodo } from "../lib/apiWrappers"
import { GrTextAlignFull } from "react-icons/gr"
import TodoDetailsModal from "./TodoDetailsModal"

const TodoItem = ({ todo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    <>
      <VStack
        align="start"
        p={2}
        background="white"
        w="100%"
        borderRadius={4}
        onClick={onOpen}
      >
        <HStack>
          <Checkbox isChecked={todo.completed} onChange={handleChange} />
          <Text>{todo.title}</Text>
        </HStack>
        {todo.content && <GrTextAlignFull />}
      </VStack>
      <TodoDetailsModal todo={todo} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default TodoItem
