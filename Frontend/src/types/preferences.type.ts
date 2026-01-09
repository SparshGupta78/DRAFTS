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
    autosaveInterval: number,
    visibility: 'Private' | 'Public',
    editorWidth: 'Default' | 'Full'
  }
}