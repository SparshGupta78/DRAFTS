import React, { useRef, useState } from 'react'
import { Account as AccountIcon, Close, Edit, Editor, LogOut, Settings } from '../../assets/Icons'
import type { UserType } from '../../types/user.type'
import type { userTypeExtended } from '../../types/userExtended.type'
import Switch from '../Switch/Switch'

type props = {
  accountOpen: boolean,
  setAccountOpen: React.Dispatch<React.SetStateAction<boolean>>
  loggedUser: userTypeExtended | undefined
}

const Panel = ({
  accountOpen,
  setAccountOpen,
  loggedUser
}: props) => {

  const [panel, setPanel] = useState<'account' | 'editor' | 'settings'>('account')
  const [spellCheck, setSpellCheck] = useState<0 | 1>(0)

  const dialogRef = useRef(null)

  const outsideClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dialogRef.current && !(dialogRef.current as HTMLElement).contains(e.target as Node)) {
      setAccountOpen(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-100 bg-black/15 backdrop-blur-[2px] duration-300 ${accountOpen ? 'pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div
        className="w-full h-full flex items-center justify-center"
         onClick={(e) => outsideClickHandler(e)}
      >
        <div
          ref={dialogRef}
          className={`w-92/100 sm:max-w-275 h-90/100 max-h-full bg-[var(--white-2)] rounded-xl shadow-[var(--shadow-1)] duration-300 ${accountOpen ? 'scale-100' : 'scale-98'}`}
        >
          <div className="px-3 py-2 bg-[var(--black-4)] flex items-center justify-between gap-2.5 rounded-t-xl border-b-[1px] border-[var(--black-1)]">
            <span className="pl-1.5">Account</span>
            <div
              className="duration-150 hover:opacity-70 active:opacity-60"
              onClick={() => {
                setAccountOpen(false)
              }}
            >
              <Close />
            </div>
          </div>
          <div className="h-[calc(100%-41px)] max-h-full overflow-x-hidden overflow-y-auto">
            <div className="w-full h-fit">
              <div className="p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
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
                  <button className="mr-2.5 sm:mr-0 flex items-center gap-1 hover:opacity-75 duration-300">
                    <div className="rotate-180">
                      <LogOut dimension={15} color='#FF0000' />
                    </div>
                    <span className='text-sm text-[var(--red-4)] font-normal text-nowrap'>Log Out</span>
                  </button>
                </div>
                <div className="mr-2.5 w-full sm:w-fit flex items-center gap-3 relative">
                  <button
                    className={`py-0.5 flex items-center gap-1 rounded-md relative after:content-[''] after:absolute after:-bottom-0.75 after:left-0 after:w-9/10 after:h-0.5 after:rounded-full duration-300 ${panel === 'account' ? 'after:bg-[var(--black-4)]' : 'after:bg-transparent hover:opacity-75'}`}
                    onClick={() => setPanel('account')}
                  >
                    <AccountIcon dimension={14} />
                    <span className='text-sm'>Account</span>
                  </button>
                  <button
                    className={`py-0.5 flex items-center gap-1 rounded-md relative after:content-[''] after:absolute after:-bottom-0.75 after:left-0 after:w-9/10 after:h-0.5 after:rounded-full duration-300 ${panel === 'editor' ? 'after:bg-[var(--black-4)]' : 'after:bg-transparent hover:opacity-75'}`}
                    onClick={() => setPanel('editor')}
                  >
                    <Editor dimension={16} />
                    <span className='text-sm'>Editor</span>
                  </button>
                  <button
                    className={`py-0.5 flex items-center gap-1 rounded-md relative after:content-[''] after:absolute after:-bottom-0.75 after:left-0 after:w-9/10 after:h-0.5 after:rounded-full duration-300 ${panel === 'settings' ? 'after:bg-[var(--black-4)]' : 'after:bg-transparent hover:opacity-75'}`}
                    onClick={() => setPanel('settings')}
                  >
                    <Settings dimension={16} />
                    <span className='text-sm'>Settings</span>
                  </button>
                </div>
              </div>
              {panel === 'account' && (
                <div className="p-2.5 w-full flex flex-col items-center gap-2.5">
                  <div className="w-fit flex flex-col items-center">
                    <div className="h-34 aspect-square rounded-full bg-[var(--black-6)] flex items-center justify-center">
                      <AccountIcon dimension={68} />
                    </div>
                    <div className="mt-2 text-2xl text-[var(--black-5)] truncate max-w-75">
                      {loggedUser ? (
                        loggedUser.firstName + ' ' + loggedUser.middleName + ' ' + loggedUser.lastName
                      ) : (
                        '---'
                      )}
                    </div>
                    <button
                      type="button"
                      className='mt-0.5 flex items-center gap-1.25 hover:opacity-75 duration-300'
                    >
                      <Edit dimension={14} color='#347CE9' />
                      <span className='text-sm text-[var(--blue-2)]'>Edit</span>
                    </button>
                  </div>
                  <div className="p-2.5 w-full max-w-120 flex flex-col gap-2">
                    <div className="w-full flex">
                      <div className="w-1/2 truncate text-sm text-[var(--black-2)]">Username</div>
                      <div className="w-1/2 truncate text-sm text-[var(--black-3)]">{loggedUser ? loggedUser.username : '-'}</div>
                    </div>
                    <div className="w-full h-0.25 rounded-full bg-[var(--black-1)]"></div>
                    <div className="w-full flex">
                      <div className="w-1/2 truncate text-sm text-[var(--black-2)]">Email</div>
                      <div className="w-1/2 truncate text-sm text-[var(--black-3)]">{loggedUser ? loggedUser.email : '-'}</div>
                    </div>
                    <div className="w-full h-0.25 rounded-full bg-[var(--black-1)]"></div>
                    <div className="w-full flex">
                      <div className="w-1/2 truncate text-sm text-[var(--black-2)]">Password</div>
                      <div className="w-1/2 truncate text-sm text-[var(--blue-2)]">
                        <button type="button" className='flex items-center gap-1.25 hover:opacity-75 duration-300'>
                          <Edit dimension={14} color='#347CE9' />
                          Edit password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {panel === 'editor' && (
                <div className="p-2.5 w-full flex flex-col gap-2.5">
                  <div className="p-2.5 flex items-center justify-between gap-2.5">
                    <div>
                      <div className='text-sm text-[var(--black-3)] font-normal'>Spell Check</div>
                      <div className='text-xs text-[var(--black-2)]'>Highlight misspelled words as you type.</div>
                    </div>
                    <Switch 
                      state={spellCheck}
                      onClick={() => setSpellCheck(prev => (prev === 0 ? 1 : 0))} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel