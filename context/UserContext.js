import { createContext, useState, useEffect } from "react"
import { getAuthToken, getAuthTokenPayload } from "../lib/auth"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      setLoading(false)
    } else {
      const decoded = getAuthTokenPayload(token)
      setUser(decoded)
      setLoading(false)
    }
  }, [])

  if (loading) {
    return null
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
