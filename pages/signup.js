import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { useRouter } from "next/router"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault()
    const signup = async (username, password) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        router.push("/login")
      }
    }
    signup(username, password)
  }

  const validationErrors =
    error?.name === "ValidationError" && error.data.validationErrors

  return (
    <VStack maxW="300px" w="300px" align="start">
      <Heading>Sign up</Heading>
      <Box as="form" onSubmit={handleSubmit} w="100%">
        <VStack align="start">
          <FormControl isInvalid={validationErrors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <FormErrorMessage>{validationErrors.username}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={validationErrors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <FormErrorMessage>{validationErrors.password}</FormErrorMessage>
          </FormControl>
          {error && !validationErrors && (
            <Text color="red.400">{error.message}</Text>
          )}
          <Button type="submit">Sign up</Button>
        </VStack>
      </Box>
    </VStack>
  )
}

export default Signup
