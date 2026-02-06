import React, { useState, type ReactNode } from 'react'
import { Account as AccountIcon, Data, Editor, LogOut, Settings } from '../../assets/Icons'
import type { userTypeExtended } from '../../types/userExtended.type'
import AccountPanel from './Panel/AccountPanel'
import EditorPanel from './Panel/EditorPanel'
import SettingsPanel from './Panel/SettingsPanel'
import DataPanel from './Panel/DataPanel'
import type { SideBarNotesType } from '../../types/titles.type'
import DropDown from '../DropDown/DropDown'
import { useNavigate } from 'react-router-dom'
import { useWindowWidthContext } from '../../contexts/windowWidth.context'
import DialogWrapper from '../DialogWrapper/DialogWrapper'
import { cn } from '../../utils/cn'

type props = {
  panelOpen: boolean,
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
  loggedUser: userTypeExtended | undefined,
  noteTitles: SideBarNotesType[],
  setEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Panel = ({
  panelOpen,
  setPanelOpen,
  loggedUser,
  noteTitles,
  setEditProfileOpen
}: props) => {

  const navigate = useNavigate()

  const windowWidth = useWindowWidthContext()
  
  const [panel, setPanel] = useState<'account' | 'editor' | 'data' | 'settings'>('account')

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('preferences')
    localStorage.removeItem('startup')
    navigate('/login')
  }

  const PanelNavButton = ({
    value,
    icon
  }: {
    value: 'account' | 'editor' | 'data' | 'settings',
    icon: ReactNode
  }) => {
    return (
      <button
        className={cn(
          "py-0.25 flex items-center gap-1 rounded-md relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-6/10 after:h-0.5 after:rounded-full duration-300",
          panel === value ? 'after:bg-[var(--black-4)]' : 'after:bg-transparent hover:opacity-75'
        )}
        onClick={() => setPanel(value)}
      >
        {icon}
        <span className='text-sm capitalize'>{value}</span>
      </button>
    )
  }

  return (
    <DialogWrapper
      open={panelOpen}
      setOpen={setPanelOpen}
      header={panel}
      scrollable
      onClose={() => setPanel('account')}
    >
      <div className="w-full h-fit">
        <div className="sticky top-0 left-0 w-full p-2.5 bg-[var(--white-2)] z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-1.25">
              <div className="p-1.25 w-fit h-fit aspect-square rounded-full bg-[var(--black-4)]">
                <AccountIcon dimension={14} />
              </div>
              <span className='text-sm truncate max-w-26'>
                {loggedUser ? loggedUser.username : '-'}
              </span>
            </div>
            <div className="w-0.5 h-4.75 rounded-full bg-[var(--black-1)] hidden sm:block"></div>
            <DropDown
              trigger={
                <button className="mr-2.5 sm:mr-0 flex items-center gap-1 hover:opacity-75 duration-300">
                  <div className="rotate-180">
                    <LogOut dimension={15} color='#FF0000' />
                  </div>
                  <span className='text-sm text-[var(--red-4)] font-normal text-nowrap'>Log Out</span>
                </button>
              }
              preStyle={false}
              align={windowWidth < 768 ? 'right' : 'left'}
              contentStyle='mt-2.5'
            >
              <div className="p-2.5 w-65 bg-[var(--black-6)] rounded-lg shadow-[var(--shadow-1)]">
                <div className="text-center p-2">
                  <div className="text-sm font-normal text-[var(--red-5)]">Are you sure to log out?</div>
                  <div className="mt-1 text-[13px] text-[var(--black-5)]">Logging out will end your session and return you to the login screen.</div>
                </div>
                <button
                  type="button"
                  className='mt-1.5 w-full text-sm bg-[var(--red-5)] rounded-md text-center p-0.75 text-[var(--white-2)] font-normal select-none duration-300 hover:opacity-70 active:scale-96'
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            </DropDown>
          </div>
          <div className="sm:mr-2.5 w-full max-w-full overflow-x-scroll overflow-y-visible sm:w-fit grid place-items-center">
            <div className="w-fit flex justify-center items-center gap-3 relative">
              <PanelNavButton
                value='account'
                icon={<AccountIcon dimension={14} />}
              />
              <PanelNavButton
                value='editor'
                icon={<Editor dimension={16} />}
              />
              <PanelNavButton
                value='data'
                icon={<Data dimension={16} />}
              />
              <PanelNavButton
                value='settings'
                icon={<Settings dimension={16} />}
              />
            </div>
          </div>
        </div>
        <div className="w-full min-h-[calc(100%-78px)] sm:min-h-[calc(100%-44px)] h-fit relative">
          {panel === 'account' && panelOpen && (
            <AccountPanel
              loggedUser={loggedUser}
              setEditProfileOpen={setEditProfileOpen}
              setPanelOpen={setPanelOpen}
            />
          )}
          {panel === 'editor' && panelOpen && <EditorPanel />}
          {panel === 'data' && panelOpen && <DataPanel noteTitles={noteTitles} />}
          {panel === 'settings' && panelOpen && <SettingsPanel />}
        </div>
      </div>
    </DialogWrapper>
  )
}

export default Panel