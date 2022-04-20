import {
  Box,
  Divider,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import useDataFetcher from "../hooks/useDataFetcher"
import TodoItem from "./TodoItem"

const TodoList = () => {
  const [completeFilter, setcompleteFilter] = useState("both")
  const [{ data, isError }, setUrl] = useDataFetcher("/todos", {
    todos: [],
  })

  const handleChange = (value) => {
    if (value === "both") {
      setUrl("/todos")
    } else if (value === "complete") {
      setUrl("/todos?completed=true")
    } else if (value === "incomplete") {
      setUrl("/todos?completed=false")
    }
    setcompleteFilter(value)
  }

  return (
    <Box w="300px">
      <VStack align="start">
        <Heading>Todos</Heading>

        <RadioGroup onChange={handleChange} value={completeFilter}>
          <Stack direction="row">
            <Radio value="complete">Complete</Radio>
            <Radio value="incomplete">Incomplete</Radio>
            <Radio value="both">Both</Radio>
          </Stack>
        </RadioGroup>

        <Divider />

        {!isError &&
          data.todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)}

        {!isError && !data.todos.length && (
          <Text color="gray.400">There are no todos yet.</Text>
        )}

        <Divider />

        {isError && (
          <Text color="red.400">
            Could not fetch todos, please refresh the page to try again.
          </Text>
        )}
      </VStack>
    </Box>
  )
}

export default TodoList
