import api from "./axios.config";

const useDraftsAPI = () => {

  const usernameCheckerAPI = async (username: string) => {
    try {
      const res = await api.get(`/public/usernameExistCheck?username=${username}`)
      const result: ({matched?: string} | null) = res.data
      if (!result) {
        return 3
      } else {
        if (result.matched) { return 2 }
        else { return 1 }
      }
    } catch (error) {
      return 3
    }
  }

  return {
    usernameCheckerAPI
  }
}

export default useDraftsAPI;