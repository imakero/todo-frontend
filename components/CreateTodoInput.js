import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { addTodo } from "../lib/apiWrappers"

const CreateTodoInput = () => {
  const [todoTitle, setTodoTitle] = useState("")
  const [error, setError] = useState(null)
  const queryClient = useQueryClient()
  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    addTodoMutation.mutate(
      { title: todoTitle },
      {
        onError: (error) => setError(error),
        onSuccess: (data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setTodoTitle("")
          }
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={error}>
        <FormLabel>Add a todo to the list</FormLabel>
        <Input
          type="text"
          value={todoTitle}
          onChange={({ target }) => setTodoTitle(target.value)}
          placeholder="Type something..."
          background="white"
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </form>
  )
}

export default CreateTodoInput
