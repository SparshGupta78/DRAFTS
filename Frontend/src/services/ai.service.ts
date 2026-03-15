import type { JSONContent } from "@tiptap/core"
import api from "./axios.config"
import { useNotificationContext } from "../contexts/notification.context"
import type { actionType, AIResponse } from "../types/AiResponse.type"

const useAiAPI = () => {

  const { createNotification } = useNotificationContext()

  const aiQuery = async (query: JSONContent, action: actionType): Promise<AIResponse | undefined> => {
    try {
      const res = await api.post<{ message: string; response: AIResponse }>('/ai/query', { query, action })
      return {
        response: res.data.response,
        action
      }
    } catch (error) {
      createNotification({
        title: "AI Processing Error",
        message: "The request could not be processed at this time. Please try again.",
        type: "error"
      })
    }
  }

  return {
    aiQuery
  }
}

export default useAiAPI