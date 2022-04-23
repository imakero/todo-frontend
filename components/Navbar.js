import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { removeAuthToken } from "../lib/auth"

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  const handleClick = () => {
    setUser(null)
    removeAuthToken()
    router.push("/")
  }

  return (
    <Box background="teal.500" p={4} mb={4} borderBottomStartRadius={20}>
      <HStack justify="space-between">
        <VStack align="start">
          <Heading>Todo app</Heading>
          <Text fontSize="xs">version 1245124124</Text>
        </VStack>
        {user && (
          <HStack>
            <VStack spacing={0} align="end">
              <Text fontSize="xs">Logged in as:</Text>
              <Text>{user?.username}</Text>
            </VStack>
            <Button colorScheme="teal" variant="solid" onClick={handleClick}>
              Sign out
            </Button>
          </HStack>
        )}
      </HStack>
    </Box>
  )
}

export default Navbar
