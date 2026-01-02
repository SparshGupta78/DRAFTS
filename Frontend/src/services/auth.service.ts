import { useNavigate } from "react-router-dom";
import type { AuthResponseType } from "../types/authResponse.type";
import api from "./axios.config";
import { useNotificationContext } from "../contexts/notification.context";

const useAuthAPI = () => {
  
  const navigate = useNavigate()
  const { createNotification } = useNotificationContext()

  const signUpAPI = async (data: any) => {
    const res = await api.post('/auth/signup', data)
    const response: (AuthResponseType | null) = res.data
    if (!response) {
      createNotification({
        title: "Something Went Wrong",
        message: "Signup could not be completed at this moment. Please try again shortly.",
        type: "error"
      })
      return
    }
    const {error, token} = response
    if (error) {
      createNotification({
        title: "Something Went Wrong",
        message: "Signup could not be completed at this moment. Please try again shortly.",
        type: "error"
      })
    }
    if (token) {
      localStorage.setItem('token', JSON.stringify({token: response.token, createdAt: Date.now()}))
      navigate(`/${data.username}`)
    }
  }
  
  const signInAPI = async (data: any) => {
    try {
      const res = await api.post('/auth/signin', data)
      if (res.status === 404) {
        createNotification({
          title: "User not found",
          message: "We couldn't find an account with the provided username.",
          type: "error"
        })
        return
      }
      if (res.status === 401) {
        createNotification({
          title: "Invalid credentials",
          message: "The username or password you entered is incorrect. Please try again.",
          type: "error"
        })
        return
      }
      const response: AuthResponseType | null = res.data
      if (!response?.token) {
        createNotification({
          title: "Something Went Wrong",
          message: "Signin could not be completed at this moment. Please try again shortly.",
          type: "error"
        })
        return
      }
      localStorage.setItem('token', JSON.stringify({token: response.token, createdAt: Date.now()}))
      navigate(`/${data.username}`)
    } catch (err: any) {
      createNotification({
        title: "Something Went Wrong",
        message: "Signup could not be completed at this moment. Please try again shortly.",
        type: "error"
      })
    }
  }

  return {
    signInAPI,
    signUpAPI
  }
}

export default useAuthAPI