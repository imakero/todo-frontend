import { Box, ChakraProvider } from "@chakra-ui/react"
import { UserProvider } from "../context/UserContext"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Box w="100%" align="center">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
