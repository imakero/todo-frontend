import {
  Box,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { useQuery } from "react-query"
import { getTodos } from "../lib/apiWrappers"
import CreateTodoInput from "./CreateTodoInput"
import TodoItem from "./TodoItem"

const TodoList = () => {
  const [completeFilter, setcompleteFilter] = useState("both")
  const { data, status } = useQuery(
    ["todos", completeFilter],
    getTodos(completeFilter)
  )

  const handleChange = (value) => {
    setcompleteFilter(value)
  }

  return (
    <Box w="300px" background="gray.100" p={4} borderRadius={4}>
      <VStack align="start">
        <RadioGroup onChange={handleChange} value={completeFilter}>
          <Stack direction="row">
            <Radio value="completed">Complete</Radio>
            <Radio value="incompleted">Incomplete</Radio>
            <Radio value="both">Both</Radio>
          </Stack>
        </RadioGroup>

        <Divider />

        {status === "success" &&
          data.todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)}

        {status === "success" && !data.todos.length && (
          <Text color="gray.400">There are no todos yet.</Text>
        )}

        <Divider />

        {status === "error" && (
          <Text color="red.400">
            Could not fetch todos, please refresh the page to try again.
          </Text>
        )}

        <CreateTodoInput />
      </VStack>
    </Box>
  )
}

export default TodoList
