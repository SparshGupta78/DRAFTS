import { createContext, useContext, useState } from "react"
import type { NotificationToastType } from "../types/notificationToast.type"
import type { NotificationContextType } from "../types/notificationContext.type"

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const [notifications, setNotifications] = useState<NotificationToastType[]>([])

  const createNotification = ({title, message, type}: Omit<NotificationToastType, 'toastId'>) => {
    setNotifications(prev => {
      const toastId = crypto.randomUUID()
      const update = [{toastId ,title, message, type}, ...prev]
      return update.slice(0, 4)
    })
  }

  const destructNotification = (toastId: string) => {
    setNotifications(prev => {
      return prev.filter((n, _) => n.toastId !== toastId)
    })
  }

  return (
    <NotificationContext.Provider value={{notifications, createNotification, destructNotification}}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotificationContext must be used inside NotificationProvider")
  return ctx
}