import { useEffect, useReducer, useState } from "react"
import api from "../lib/api"

const dataReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...state, isLoading: true, isError: false }
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case "FAILURE":
      return { ...state, isLoading: false, isError: true, data: action.payload }
    default:
      throw new Error()
  }
}

const useDataFetcher = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(dataReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  })

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      dispatch({ type: "INIT" })
      try {
        const data = await api.get(url)
        if (!cancelled) {
          if (data.error) {
            dispatch({ type: "FAILURE", payload: data })
          } else {
            dispatch({ type: "SUCCESS", payload: data })
          }
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({ type: "FAILURE", payload: { error } })
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [url])

  return [state, setUrl]
}

export default useDataFetcher
