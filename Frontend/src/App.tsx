import { Outlet } from "react-router-dom"
import NotificationPanel from "./components/Notification/NotificationPanel"
import { AppProvider } from "./contexts/App.context"


function App() {

  return (
    <AppProvider>
        <NotificationPanel />
        <Outlet />
    </AppProvider>
  )
}

export default App