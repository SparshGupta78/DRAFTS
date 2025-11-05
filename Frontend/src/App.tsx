import { Outlet } from "react-router-dom"
import NotificationPanel from "./components/Notification/NotificationPanel"

function App() {

  return (
    <>
      <NotificationPanel />
      <Outlet />
    </>
  )
}

export default App