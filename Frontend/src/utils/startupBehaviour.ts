import type { DefaultPreferencesType } from "../types/preferences.type"

const setStartupBehaviour = (path: string, preferences: DefaultPreferencesType | undefined) => {
  if(preferences && preferences.settings.general.startupBehavior === 'Dashboard') {
    localStorage.removeItem('startup')
    return
  }
  localStorage.setItem('startup', path)
}

export default setStartupBehaviour
