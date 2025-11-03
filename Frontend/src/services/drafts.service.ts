import api from "./axios.config";

export const usernameCheckerAPI = (username: string) => api.get(`/public/usernameExistCheck?username=${username}`)