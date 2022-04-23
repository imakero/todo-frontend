import { Box, ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"
import Navbar from "../components/Navbar"
import { UserProvider } from "../context/UserContext"

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Box w="100%" align="center" background="teal.200" minHeight="100vh">
            <Navbar />
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </QueryClientProvider>
    </UserProvider>
  )
}

export default MyApp
