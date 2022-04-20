import { getAuthToken } from "./auth"

const getDefaultOptions = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  },
})

const apiCall = async (method, url, options = {}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...getDefaultOptions(),
    ...options,
    method,
  })
  return await res.json()
}

const api = {
  get: (...args) => apiCall("get", ...args),
  post: (...args) => apiCall("post", ...args),
  put: (...args) => apiCall("put", ...args),
  delete: (...args) => apiCall("delete", ...args),
}

export default api
