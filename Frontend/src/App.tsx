import { Outlet } from "react-router-dom"
import NotificationPanel from "./components/Notification/NotificationPanel"
import { NotificationProvider } from "./contexts/notification.context"

function App() {

  return (
  <NotificationProvider>
    <NotificationPanel />
    <Outlet />
  </NotificationProvider>
  )
}

export default App