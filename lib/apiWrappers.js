import api from "./api"

export const getTodos = (completedFilter) => {
  if (completedFilter === "both") {
    return () => api.get("/todos")
  } else if (completedFilter === "completed") {
    return () => api.get("/todos?completed=true")
  } else if (completedFilter === "incompleted") {
    return () => api.get("/todos?completed=false")
  }
}

export const addTodo = (todo) => {
  return api.post("/todos", {
    body: JSON.stringify(todo),
  })
}

export const toggleTodo = ({ todoId, completed }) => {
  if (completed) {
    return api.delete(`/todos/${todoId}/complete`)
  } else {
    return api.post(`/todos/${todoId}/complete`)
  }
}