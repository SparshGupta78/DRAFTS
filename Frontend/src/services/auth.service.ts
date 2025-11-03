import api from "./axios.config";

export const signUpAPI = (data: any) => api.post('/auth/signup', data)
export const signInAPI = (data: any) => api.post('/auth/signin', data)