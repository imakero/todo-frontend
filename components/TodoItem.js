import { Checkbox, HStack, Text } from "@chakra-ui/react"

const TodoItem = ({ todo }) => {
  return (
    <HStack>
      <Checkbox isChecked={todo.completed}>{todo.title}</Checkbox>
    </HStack>
  )
}

export default TodoItem
