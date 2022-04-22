import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useContext } from "react"
import TodoList from "../components/TodoList"
import { UserContext } from "../context/UserContext"

export default function Home() {
  const { user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return <TodoList />
}
