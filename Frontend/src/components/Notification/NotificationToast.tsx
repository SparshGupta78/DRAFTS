import { Notification } from "../../assets/Icons"
import Marquee from "../Marquee/Marquee"

type notificationToastType = {
  message: string,
  index: number
}

const NotificationToast = ({message, index}: notificationToastType) => {
  const translateY = index * -10
  const scale = Math.max(100 - index * 10, 0) / 100
  return (
    <div 
    className="absolute top-5 left-1/2 notification-active max-w-9/10 sm:max-w-95 p-2 bg-[var(--white-1)] rounded-full shadow-[var(--shadow-1)] flex items-center gap-2 overflow-hidden duration-600"
    style={{
      zIndex: 999 - index,
      transform: `translate(-50%, ${translateY}px) scale(${scale})`
    }}
    >
      <div className="w-fit p-1.75 bg-[var(--black-1)] rounded-full">
        <Notification dimension={18} />
      </div>
      <div className="w-[calc(100%-43px)] pr-2 text-sm relative">
        <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-r from-[var(--white-1)] to-transparent z-10"></div>
        <Marquee>
          {message}
        </Marquee>
        <div className="absolute right-2 top-0 h-full w-3 bg-gradient-to-r from-transparent to-[var(--white-1)] z-10"></div>
      </div>
    </div>
  )
}

export default NotificationToast