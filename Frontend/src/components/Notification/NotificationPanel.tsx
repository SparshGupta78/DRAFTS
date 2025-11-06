import { useNotificationContext } from "../../contexts/notification.context"
import NotificationToast from "./NotificationToast"

const NotificationPanel = () => {
  const {notifications, destructNotification} = useNotificationContext()
  return (
    <div className="fixed top-0 left-0 z-999 w-full">
      <div className="w-full h-fit flex items-center flex-col gap-2.5 relative">
        {
          notifications.length > 0 && 
          notifications.map((notification, index) => {
            return (
              <NotificationToast 
                key={notification.toastId} 
                toastId={notification.toastId} 
                title={notification.title}
                index={index} 
                message={notification.message} 
                type={notification.type} 
                destructNotification={destructNotification} 
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default NotificationPanel