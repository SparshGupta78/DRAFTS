import { useEffect, useState } from "react"
import { Alert, Notification } from "../../assets/Icons"
import Marquee from "../Marquee/Marquee"
import type { NotificationToastType } from "../../types/notificationToast.type"
import { cn } from "../../utils/cn"

interface props extends NotificationToastType {
  index: number,
  destructNotification: (toastId: string) => void
}

const NotificationToast = ({
  toastId,
  title,
  index,
  message,
  type,
  destructNotification
}: props) => {
  const translateY = index * -10
  const scale = Math.max(100 - index * 10, 0) / 100

  const [notificationAnimationCLass, setNotificationAnimationClass] = useState('notification-hide')
  
  useEffect(() => {
    const t1 = setTimeout(() => setNotificationAnimationClass('notification-deactive'), 200)
    const t2 = setTimeout(() => setNotificationAnimationClass('notification-active'), 800)
    const t3 = setTimeout(() => setNotificationAnimationClass('notification-deactive'), 4800)
    const t4 = setTimeout(() => setNotificationAnimationClass('notification-hide'), 5400)
    const t5 = setTimeout(() => {
      destructNotification(toastId)
    }, 5800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [])

  let colors = {
    color1: '#000000',
    color2: '#e7e7e7',
    color3: '#4C4C4C'
  }

  if (type === 'error') {
    colors = {
      color1: '#FF0000',
      color2: '#ffe3e3',
      color3: '#ff6c6c'
    }
  }
  
  return (
    <div 
      className={cn(
        'max-h-14 absolute top-7 left-1/2 max-w-9/10 sm:max-w-95 p-2 bg-[var(--white-1)] rounded-full shadow-[var(--shadow-1)] flex items-center gap-2 overflow-hidden h-fit',
        notificationAnimationCLass
      )}
      style={{
        zIndex: 999 - index,
        transform: `translate(-50%, ${translateY}px) scale(${scale})`
      }}
    >
      <div 
        className="h-10 aspect-square p-1.75 rounded-full flex items-center justify-center" 
        style={{backgroundColor: colors.color2}}
      >
          {type == 'default' && <Notification dimension={24} />}
          {type == 'error' && <Alert dimension={24} color={colors.color1} />}
      </div>
      <div className="w-[calc(100%-42px)] flex flex-col gap-0.25 pr-2">
        <div 
          className="text-[15px] font-normal whitespace-nowrap overflow-hidden truncate" 
          style={{color: colors.color1}}
        >
          {title}
        </div>
        <div 
          className="w-full pr-2 text-xs relative" 
          style={{color: colors.color3}}
        >
          <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-r from-[var(--white-1)] to-transparent z-10"></div>
          <Marquee>
            {message}
          </Marquee>
          <div className="absolute right-2 top-0 h-full w-3 bg-gradient-to-r from-transparent to-[var(--white-1)] z-10"></div>
        </div>
      </div>
    </div>
  )
}

export default NotificationToast