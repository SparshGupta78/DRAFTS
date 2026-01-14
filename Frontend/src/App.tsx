import { Outlet } from "react-router-dom"
import NotificationPanel from "./components/Notification/NotificationPanel"
import { AppProvider } from "./contexts/App.context"
import { useEffect, useState } from "react"
import Loader from "./components/Loader/Loader"


function App() {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000);
  }, [])

  return (
    <AppProvider>
        <Loader
          setLoaderOff={!loader}
        />
        <NotificationPanel />
        <Outlet />
    </AppProvider>
  )
}

export default App