import type { AutoSaveIntervalType } from "./autoSaveIntervals.type"

export interface DefaultPreferencesType {
  settings: {
    general: {
      language: "en",
      startupBehavior: 'Dashboard' | 'Last opened note'
    },
    appearance: {
      theme: 'System' | 'Light' | 'Dark',
      accentColor: 'Blue',
      sidebar: {
        visible: boolean,
        position: 'Left' | 'Right'
      }
    },
  },
  editor: {
    spellCheck: boolean,
    autosave: boolean,
    autosaveInterval: AutoSaveIntervalType,
    visibility: 'Private' | 'Public',
    editorWidth: 'Default' | 'Full'
  }
}