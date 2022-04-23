import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import InternalLink from "../components/InternalLink"
import { UserContext } from "../context/UserContext"
import api from "../lib/api"
import { setAuthToken } from "../lib/auth"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [router, user])

  const handleSubmit = (event) => {
    event.preventDefault()

    const login = async (username, password) => {
      const data = await api.post("/auth/login", {
        body: JSON.stringify({ username, password }),
      })
      if (data.error) {
        setError(data.error)
      } else {
        setAuthToken(data.token)
        setUser(data)
        router.push("/")
      }
    }

    login(username, password)
  }

  // If already logged in, don't render anything and wait for redirect
  if (user) {
    return null
  }

  return (
    <VStack maxW="300px" w="300px" align="start">
      <Heading>Log in</Heading>
      <Text>
        Don&apos;t have an account?{" "}
        <InternalLink href="/signup" color="teal">
          Sign up
        </InternalLink>
      </Text>
      <form onSubmit={handleSubmit}>
        <Box align="start">
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              placeholder="username"
              bg="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="password"
              bg="white"
            />
          </FormControl>
          {error && <Text color="red.400">{error.message}</Text>}
          <Button type="submit">Log in</Button>
        </Box>
      </form>
    </VStack>
  )
}

export default Login
