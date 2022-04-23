import {
  Box,
  Checkbox,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "react-query"
import { toggleTodo } from "../lib/apiWrappers"
import { GrAttachment, GrTextAlignFull } from "react-icons/gr"
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

  const handleClick = (event) => {
    event.stopPropagation()
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
        cursor="pointer"
      >
        <HStack>
          <Box onClick={handleClick}>
            <Checkbox isChecked={todo.completed} onChange={handleChange} />
          </Box>
          <Text>{todo.title}</Text>
        </HStack>
        <HStack>
          {todo.content && <GrTextAlignFull />}
          {todo.attachments.length && <GrAttachment />}
        </HStack>
      </VStack>
      <TodoDetailsModal todo={todo} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default TodoItem
