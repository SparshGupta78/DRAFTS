export interface authResponse {
  user?: {
    firstName: string,
    middleName: string,
    lastName: string,
    username: string
  },
  token?: string,
  error?: string
}