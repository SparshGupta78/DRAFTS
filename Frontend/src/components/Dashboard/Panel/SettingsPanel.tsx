import { useEffect, useState } from 'react'
import DropDownItem from '../../DropDown/DropDownItem'
import DropDown from '../../DropDown/DropDown'
import { ArrowDown } from '../../../assets/Icons'
import Switch from '../../Switch/Switch'
import { usePreferencesContext } from '../../../contexts/preferences.context'
import { cn } from '../../../utils/cn'
import { useNotificationContext } from '../../../contexts/notification.context'

const SettingsPanel = () => {

  const { createNotification } = useNotificationContext()
  const { preferences, updatePreference, resetPreferences } = usePreferencesContext()

  const [language, setLanguage] = useState<'English'>('English')
  const [theme, setTheme] = useState<'System' | 'Light' | 'Dark'>('Light')
  const [accentColor, setAccentColor] = useState<'Blue'>('Blue')
  const [sidebarPosition, setSidebarPosition] = useState<'Left' | 'Right'>('Left')
  const [showSidebar, setShowSidebar] = useState(true)
  const [startupBehavior, setStartupBehavior] = useState<'Dashboard' | 'Last opened note'>('Dashboard')
  
  const startupBehaviors = ['Dashboard', 'Last opened note']
  const languages = ['English']
  const themes = ['System', 'Light', 'Dark']
  const accentColors = ['Blue']
  const sidebarPositions = ['Left', 'Right']

  const sidebarPositionHandler = () => {
    updatePreference('settings.appearance.sidebar.position', sidebarPosition === 'Left' ? 'Right' : 'Left')
  }

  const showSidebarHandler = () => {
    if(!preferences) return
    const status = updatePreference("settings.appearance.sidebar.visible", !preferences.settings.appearance.sidebar.visible)
    if(status) setShowSidebar(prev => !prev)
  }

  const startupBehaviorHandler = () => {
    updatePreference('settings.general.startupBehavior', startupBehavior === 'Dashboard' ? 'Last opened note' : 'Dashboard')
  }

  useEffect(() => {
    if(!preferences) return
    setSidebarPosition(preferences.settings.appearance.sidebar.position)
    setShowSidebar(preferences.settings.appearance.sidebar.visible)
    setStartupBehavior(preferences.settings.general.startupBehavior)

    if(preferences.settings.general.startupBehavior === 'Dashboard') localStorage.removeItem('startup')
  }, [preferences])

  return (
    <div className="w-full p-2.5">
      <div>
        <div className="text-sm font-normal text-[var(--black-2)]">
          General
        </div>
        <hr className="my-1.5 w-full border-[var(--black-1)]" />
      </div>
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Language</div>
          <div className='text-xs text-[var(--black-2)]'>Select your preferred language.</div>
        </div>
        <DropDown
        trigger={
          <button className="px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 hover:opacity-75 active:opacity-60">
            <span className='text-[13px] whitespace-nowrap'>
              {language}
            </span>
            <ArrowDown dimension={10} />
          </button>
        }
        preStyle={false}
        contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
        align='right'
        onContentClickClose={true}
      >
        {languages && languages.map((lang => {
          return (
            <DropDownItem
              key={lang}
              setValue={setLanguage}
              data={lang}
              preStyle={false}
              className={cn(
                'text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200',
                language === lang ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'
              )}
            >
              {lang}
            </DropDownItem>
          )
        }))}
      </DropDown>
      </div>
      <hr className="mx-2.5 w-[calc(100%-20px)] border-[var(--black-4)]" />
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Startup Behavior</div>
          <div className='text-xs text-[var(--black-2)]'>Choose what happens when the app starts.</div>
        </div>
        <DropDown
        trigger={
          <button className="px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 hover:opacity-75 active:opacity-60">
            <span className='text-[13px] whitespace-nowrap'>{startupBehavior}</span>
            <ArrowDown dimension={10} />
          </button>
        }
        preStyle={false}
        contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
        align='right'
        onContentClickClose={true}
      >
        {startupBehaviors && startupBehaviors.map((sp => {
          return (
            <DropDownItem
              key={sp}
              setValue={setStartupBehavior}
              data={sp}
              preStyle={false}
              className={cn(
                'text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200',
                startupBehavior === sp ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'
              )}
              onClick={startupBehaviorHandler}
            >
              {sp}
            </DropDownItem>
          )
        }))}
      </DropDown>
      </div>
      <div>
        <div className="mt-1.5 text-sm font-normal text-[var(--black-2)]">
          Appearance
        </div>
        <hr className="my-1.5 w-full border-[var(--black-1)]" />
      </div>
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Theme</div>
          <div className='text-xs text-[var(--black-2)]'>Select the preferred theme for the interface.</div>
        </div>
        <DropDown
        trigger={
          <button className="px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 hover:opacity-75 active:opacity-60">
            <span className='text-[13px] whitespace-nowrap'>{theme}</span>
            <ArrowDown dimension={10} />
          </button>
        }
        preStyle={false}
        contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
        align='right'
        onContentClickClose={true}
      >
        {themes && themes.map((th => {
          return (
            <DropDownItem
              key={th}
              setValue={setTheme}
              data={th}
              preStyle={false}
              className={cn(
                'text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200',
                theme === th ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'
              )}
            >
              {th}
            </DropDownItem>
          )
        }))}
      </DropDown>
      </div>
      <hr className="mx-1.5 w-[calc(100%-20px)] border-[var(--black-4)]" />
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Accent Color</div>
          <div className='text-xs text-[var(--black-2)]'>Set the highlight color used across the interface.</div>
        </div>
        <DropDown
        trigger={
          <button className="px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 hover:opacity-75 active:opacity-60">
            <span className='text-[13px] whitespace-nowrap'>{accentColor}</span>
            <ArrowDown dimension={10} />
          </button>
        }
        preStyle={false}
        contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
        align='right'
        onContentClickClose={true}
      >
        {accentColors && accentColors.map((ac => {
          return (
            <DropDownItem
              key={ac}
              setValue={setAccentColor}
              data={ac}
              preStyle={false}
              className={cn(
                'text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200',
                accentColor === ac ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'
              )}
            >
              {ac}
            </DropDownItem>
          )
        }))}
      </DropDown>
      </div>
      <hr className="mx-1.5 w-[calc(100%-20px)] border-[var(--black-4)]" />
      <div className="p-2.5 flex items-center justify-between gap-2.5">
      <div>
        <div className='text-sm text-[var(--black-3)] font-normal'>Show Sidebar</div>
        <div className='text-xs text-[var(--black-2)]'>Toggles the visibility of the sidebar.</div>
      </div>
      <Switch
        state={showSidebar}
        onClick={showSidebarHandler}
      />
      </div>
      <hr className="mx-1.5 w-[calc(100%-20px)] border-[var(--black-4)]" />
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Sidebar Position</div>
          <div className='text-xs text-[var(--black-2)]'>Choose where the sidebar appears on the screen.</div>
        </div>
        <DropDown
        trigger={
          <button className="px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 hover:opacity-75 active:opacity-60">
            <span className='text-[13px] whitespace-nowrap'>{sidebarPosition}</span>
            <ArrowDown dimension={10} />
          </button>
        }
        preStyle={false}
        contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
        align='right'
        onContentClickClose={true}
      >
        {sidebarPositions && sidebarPositions.map((sp => {
          return (
            <DropDownItem
              key={sp}
              setValue={setSidebarPosition}
              data={sp}
              preStyle={false}
              className={cn(
                'text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200',
                sidebarPosition === sp ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'
              )}
              onClick={sidebarPositionHandler}
            >
              {sp}
            </DropDownItem>
          )
        }))}
      </DropDown>
      </div>
      <div>
        <div className="mt-1.5 text-sm font-normal text-[var(--black-2)]">
          Preferences
        </div>
        <hr className="my-1.5 w-full border-[var(--black-1)]" />
      </div>
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Theme</div>
          <div className='text-xs text-[var(--black-2)]'>Undo all changes and restore default settings.</div>
        </div>
        <button
          type='button'
          className="px-2.5 py-1.5 rounded-sm bg-[var(--blue-2)] text-[var(--white-1)] font-normal flex items-center gap-2 duration-150 hover:opacity-90 active:opacity-80 text-[13px] text-nowrap"
          onClick={() => {
            resetPreferences()
            createNotification({
              title: "Preferences Restored",
              message: "All preferences have been reset to their default settings.",
              type: "default"
            })
          }}
        >
          Reset Preferences
        </button>
      </div>
    </div>
  )
}

export default SettingsPanel