import { PreferenceProvider } from "./preferences.context";
import { NotificationProvider } from "./notification.context";
import { WindowWidthProvider } from "./windowWidth.context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      <PreferenceProvider>
        <WindowWidthProvider>
          {children}
        </WindowWidthProvider>
      </PreferenceProvider>
    </NotificationProvider>
  )
}