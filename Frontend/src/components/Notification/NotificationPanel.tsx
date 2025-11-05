import { useState } from "react"
import NotificationToast from "./NotificationToast"

const NotificationPanel = () => {
  const [notificationBox, setNotificationBox] = useState<string[]>([])
  return (
    <div className="fixed top-0 left-0 z-999 w-full">
      <div className="w-full h-fit flex items-center flex-col gap-2.5 relative">
        {
          notificationBox.length > 0 && 
          notificationBox.map((message, index) => {
            return (
              <NotificationToast key={message} index={index} message={message} />
            )
          })
        }
      </div>
    </div>
  )
}

export default NotificationPanel