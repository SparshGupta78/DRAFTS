import type { DefaultPreferencesType } from "../types/preferences.type"

const defaultPreferences: DefaultPreferencesType = {
  settings: {
    general: {
      language: "en",
      startupBehavior: "Dashboard"
    },
    appearance: {
      theme: "Light",
      accentColor: "Blue",
      sidebar: {
        visible: true,
        position: "Left"
      }
    },
  },
  editor: {
    spellCheck: true,
    autosave: true,
    autosaveInterval: 2500,
    visibility: "Private",
    editorWidth: "Default"
  }
}

export default defaultPreferences