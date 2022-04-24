import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
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
import TagsList from "./TagsList"

const TodoList = () => {
  const [completeFilter, setcompleteFilter] = useState("both")
  const [tagsFilter, setTagsFilter] = useState([])
  const [tagInput, setTagInput] = useState("")
  const { data, status } = useQuery(
    ["todos", completeFilter, tagsFilter],
    getTodos({ completeFilter, tagsFilter })
  )

  const handleChange = (value) => {
    setcompleteFilter(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!tagsFilter.includes(tagInput)) {
      setTagsFilter([...tagsFilter, tagInput])
    }
    setTagInput("")
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

        <Box as="form" onSubmit={handleSubmit} w="100%">
          <FormControl>
            <FormLabel>Filter by tags</FormLabel>
            <TagsList
              tags={tagsFilter.map((tag) => ({ text: tag, _id: tag }))}
              onDelete={(tagText) => {
                return setTagsFilter(
                  tagsFilter.filter((tag) => tag !== tagText)
                )
              }}
            />
            <Input
              type="text"
              bg="white"
              mt={2}
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              placeholder="Enter tags to filter by"
            />
          </FormControl>
        </Box>

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
