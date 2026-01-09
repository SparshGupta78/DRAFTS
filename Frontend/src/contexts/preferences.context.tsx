import { createContext, useContext, useEffect, useState } from "react"
import type { DefaultPreferencesType } from "../types/preferences.type"
import defaultPreferences from "../config/preferences.defaults"

type PreferencesContextType = {
  preferences: DefaultPreferencesType | undefined
  updatePreference: (path: string, value: string | boolean | number) => boolean | void
  resetPreferences: () => void
  clearPreferences: () => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export const usePreferencesContext = () => {
  const ctx = useContext(PreferencesContext)
  if (!ctx) {
    throw new Error("usePreferencesContext must be used within PreferenceProvider")
  }
  return ctx
}

export const PreferenceProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] = useState<DefaultPreferencesType | undefined>(undefined)

  const updatePreference = (path: string, value: string | boolean | number) => {
    const pathRoute = path.split(".")
    if (pathRoute.length <= 1) return false

    const stored = localStorage.getItem("preferences")
    if (!stored) return false

    const updated = JSON.parse(stored)
    let current = updated

    for (let i = 0; i < pathRoute.length - 1; i++) {
      current = current[pathRoute[i]]
    }

    current[pathRoute[pathRoute.length - 1]] = value
    localStorage.setItem("preferences", JSON.stringify(updated))
    setPreferences(updated)
    return true
  }

  const resetPreferences = () => {
    const fresh = structuredClone(defaultPreferences)
    localStorage.setItem("preferences", JSON.stringify(fresh))
    setPreferences(fresh)
  }

  const clearPreferences = () => {
    localStorage.removeItem("preferences")
    setPreferences(undefined)
  }

  useEffect(() => {
    const stored = localStorage.getItem("preferences")
    if (stored) {
      setPreferences(JSON.parse(stored))
    } else {
      const fresh = structuredClone(defaultPreferences)
      localStorage.setItem("preferences", JSON.stringify(fresh))
      setPreferences(fresh)
    }
  }, [])

  return (
    <PreferencesContext.Provider
      value={{ preferences, updatePreference, resetPreferences, clearPreferences }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}