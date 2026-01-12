import React, { useEffect, useRef, useState } from 'react'
import { Account as AccountIcon, ArrowDown, Close, Data, Edit, Editor, LogOut, Settings } from '../../assets/Icons'
import type { userTypeExtended } from '../../types/userExtended.type'
import AccountPanel from './Panel/AccountPanel'
import EditorPanel from './Panel/EditorPanel'
import SettingsPanel from './Panel/SettingsPanel'
import DataPanel from './Panel/DataPanel'
import type { SideBarNotesType } from '../../types/titles.type'
import DropDown from '../DropDown/DropDown'
import { useNavigate } from 'react-router-dom'
import { useWindowWidthContext } from '../../contexts/windowWidth.context'

type props = {
  panelOpen: boolean,
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
  loggedUser: userTypeExtended | undefined,
  noteTitles: SideBarNotesType[]
}

const Panel = ({
  panelOpen,
  setPanelOpen,
  loggedUser,
  noteTitles
}: props) => {

  const navigate = useNavigate()

  const windowWidth = useWindowWidthContext()
  
  const [panel, setPanel] = useState<'account' | 'editor' | 'data' | 'settings'>('account')
  const dialogRef = useRef(null)

  const outsideClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dialogRef.current && !(dialogRef.current as HTMLElement).contains(e.target as Node)) {
      setPanelOpen(false)
      setPanel('account')
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={`fixed inset-0 z-100 bg-black/15 backdrop-blur-[2px] duration-300 ${panelOpen ? 'pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div
        className="w-full h-full flex items-center justify-center"
         onClick={(e) => outsideClickHandler(e)}
      >
        <div
          ref={dialogRef}
          className={`w-92/100 sm:max-w-275 h-90/100 max-h-full bg-[var(--white-2)] rounded-xl shadow-[var(--shadow-1)] duration-300 ${panelOpen ? 'scale-100' : 'scale-98'}`}
        >
          <div className="px-3 py-2 bg-[var(--black-4)] flex items-center justify-between gap-2.5 rounded-t-xl border-b-[1px] border-[var(--black-1)]">
            <span className="pl-1.5 capitalize">{panel}</span>
            <div
              className="duration-150 hover:opacity-70 active:opacity-60"
              onClick={() => {
                setPanelOpen(false)
                setPanel('account')
              }}
            >
              <Close />
            </div>
          </div>
          <div className="h-[calc(100%-41px)] max-h-full overflow-x-hidden overflow-y-auto">
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
                <div className="sm:mr-2.5 w-full sm:w-fit flex justify-center items-center gap-3 relative">
                  <button
                    className={`py-0.5 flex items-center gap-1 rounded-md relative after:content-[''] after:absolute after:-bottom-0.75 after:left-0 after:w-7/10 after:h-0.5 after:rounded-full duration-300 ${panel === 'account' ? 'after:bg-[var(--black-4)]' : 'after:bg-transparent hover:opacity-75'}`}
                    onClick={() => setPanel('account')}
                  >
                    <AccountIcon dimension={14} />
                    <span className='text-sm'>Account</span>
                  </button>
                  <button
                    className={`py-0.5 flex items-center gap-1 rounded-md relative after:content-[''] after:absolute after:-bottom-0.75 after:left-0 after:w-7/10 after:h-0.5 after:rounded-full duration-300 ${panel === 'editor' ? 'after:bg-[var(--black-4)]' : 'after:bg-transparent hover:opacity-75'}`}
                    onClick={() => setPanel('editor')}
                  >
                    <Editor dimension={16} />
                    <span className='text-sm'>Editor</span>
                  </button>
                  <button
                    className={`py-0.5 flex items-center gap-1 rounded-md relative after:content-[''] after:absolute after:-bottom-0.75 after:left-0 after:w-7/10 after:h-0.5 after:rounded-full duration-300 ${panel === 'data' ? 'after:bg-[var(--black-4)]' : 'after:bg-transparent hover:opacity-75'}`}
                    onClick={() => setPanel('data')}
                  >
                    <Data dimension={16} />
                    <span className='text-sm'>Data</span>
                  </button>
                  <button
                    className={`py-0.5 flex items-center gap-1 rounded-md relative after:content-[''] after:absolute after:-bottom-0.75 after:left-0 after:w-7/10 after:h-0.5 after:rounded-full duration-300 ${panel === 'settings' ? 'after:bg-[var(--black-4)]' : 'after:bg-transparent hover:opacity-75'}`}
                    onClick={() => setPanel('settings')}
                  >
                    <Settings dimension={16} />
                    <span className='text-sm'>Settings</span>
                  </button>
                </div>
              </div>
              <div className="w-full min-h-[calc(100%-78px)] sm:min-h-[calc(100%-44px)] h-fit relative">
                {panel === 'account' && panelOpen && <AccountPanel loggedUser={loggedUser} />}
                {panel === 'editor' && panelOpen && <EditorPanel />}
                {panel === 'data' && panelOpen && <DataPanel noteTitles={noteTitles} />}
                {panel === 'settings' && panelOpen && <SettingsPanel />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel