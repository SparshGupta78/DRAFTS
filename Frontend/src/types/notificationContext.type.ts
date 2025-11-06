import type { NotificationToastType } from "./notificationToast.type";

export interface NotificationContextType {
  notifications: NotificationToastType[],
  createNotification: (notification: Omit<NotificationToastType, 'toastId'>) => void,
  destructNotification: (toastId: string) => void
}