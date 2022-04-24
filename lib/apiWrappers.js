import api from "./api"
import { getAuthToken } from "./auth"

export const getTodos = ({ completedFilter, tagsFilter }) => {
  const completedQuery =
    completedFilter === "completed"
      ? "completed=true"
      : completedFilter === "incompleted"
      ? "completed=false"
      : ""

  const tagsQuery = tagsFilter.map((tag) => `tags=${tag}`).join("&")

  const queriesArray = [completedQuery, tagsQuery].filter(Boolean)

  const queryString = queriesArray.length ? `?${queriesArray.join("&")}` : ""

  const url = "/todos"
  return () => api.get(url + queryString)
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

export const updateTodo = ({ todoId, update }) => {
  return api.put(`/todos/${todoId}`, { body: JSON.stringify(update) })
}

export const removeTodoAttachment = ({ todoId, attachmentId }) => {
  return api.delete(`/todos/${todoId}/attachments/${attachmentId}`)
}

export const addTodoAttachment = ({ todoId, attachment }) => {
  const formData = new FormData()
  formData.append("attachment", attachment)

  return api.put(`/todos/${todoId}/attachments`, {
    body: formData,
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })
}

export const removeTodoTag = ({ todoId, tagId }) => {
  return api.delete(`/todos/${todoId}/tags/${tagId}`)
}

export const addTodotag = ({ todoId, tag }) => {
  return api.put(`/todos/${todoId}/tags`, { body: JSON.stringify(tag) })
}
