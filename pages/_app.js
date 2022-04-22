import { Box, ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { UserProvider } from "../context/UserContext"

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Box w="100%" align="center">
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </QueryClientProvider>
    </UserProvider>
  )
}

export default MyApp
