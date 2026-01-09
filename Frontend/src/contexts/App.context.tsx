import { PreferenceProvider } from "./preferences.context";
import { NotificationProvider } from "./notification.context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      <PreferenceProvider>
        {children}
      </PreferenceProvider>
    </NotificationProvider>
  )
}