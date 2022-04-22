import jwt from "jsonwebtoken"

export const setAuthToken = (token) =>
  localStorage.setItem("todoAuthToken", token)

export const getAuthToken = () => localStorage.getItem("todoAuthToken")

export const removeAuthToken = () => localStorage.removeItem("todoAuthToken")

export const getAuthTokenPayload = (token) => jwt.decode(token)
