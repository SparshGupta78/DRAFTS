import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import type { TokenType } from "../../types/token.type"

type props = {
  children: ReactNode
}

const AuthRoute = ({children}: props) => {
  const location = useLocation()
  const tokenObj = localStorage.getItem('token')
  if (!tokenObj) {
    return <Navigate to='/signin' replace state={{from: location.pathname}} />
  }
  const {token, createdAt} = JSON.parse(tokenObj) as TokenType
  const expire = (Date.now() - createdAt) > 1 * 60 * 60 * 1000
  if (expire) {
    localStorage.removeItem('token')
    localStorage.removeItem('preferences')
    localStorage.removeItem('startup')
    return <Navigate to='/signin' replace state={{from: location.pathname}} />
  }
  return (
    <>{children}</>
  )
}

export default AuthRoute