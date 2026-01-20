import { useEffect, useMemo, useState, type Dispatch } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Account, Delete, Edit, Plus, Retry, Search, Settings } from "../../assets/Icons"
import type { UserType } from "../../types/user.type"
import { usePreferencesContext } from "../../contexts/preferences.context"
import { useWindowWidthContext } from "../../contexts/windowWidth.context"
import setStartupBehaviour from "../../utils/startupBehaviour"

type SideBarProps = {
  loggedUser: UserType | undefined,
  sideNavOpen: boolean,
  setSideNavOpen: Dispatch<React.SetStateAction<boolean>>,
  setNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  noteTitles: SideBarNotesType[],
  fetchNotesTitle: () => void,
  noteTitlesFetchStatus: -1 | 0 | 1,
  editorFetch: (noteId: string) => Promise<void>,
  setAllNotesOpen: React.Dispatch<React.SetStateAction<boolean>>,
  notesFetch: () => Promise<void>,
  setAccountOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type SideBarNotesType = {
  noteID: string,
  title: string
}

const SideBar = ({
  loggedUser,
  sideNavOpen,
  setSideNavOpen,
  setNewNoteOpen,
  noteTitles,
  fetchNotesTitle,
  noteTitlesFetchStatus,
  editorFetch,
  setAllNotesOpen,
  notesFetch,
  setAccountOpen
}: SideBarProps) => {

  const navigate = useNavigate()

  const { preferences } = usePreferencesContext()

  const { username, noteId } = useParams()

  const windowWidth = useWindowWidthContext()

  const [searchOpen, setSearchOpen] = useState(false)
  const [sideNavActiveBg, setSideNavActiveBg] = useState(windowWidth > 768 ? 40 : 46.5)

  const sidebarPosition = preferences?.settings.appearance.sidebar.position

  const noteTitleFetch = (noteID: string) => {
    navigate(`/${username}/${noteID}`)
    editorFetch(noteID)
    setStartupBehaviour(`/${username}/${noteID}`, preferences)
    if(windowWidth < 768) setSideNavOpen(false)
  }

  useEffect(() => {
    if (windowWidth >= 768) {
      setSideNavOpen(true)
      setSideNavActiveBg(40)
    } else {
      setSideNavOpen(false)
      setSideNavActiveBg(46.5)
    }
  }, [windowWidth])

  useEffect(() => {
    fetchNotesTitle()
    }, [username])
  
  const currentNoteIndex = useMemo(() => {
    return noteTitles.findIndex(note => note.noteID === noteId)
  }, [noteTitles, noteId])

  return (
    <div className={`duration-300 fixed md:relative inset-0 w-full h-full flex z-900 md:z-0 md:p-5 ${sidebarPosition && sidebarPosition === 'Right' ? 'md:pl-2.5 flex-row-reverse' : 'md:pr-2.5'} ${sideNavOpen ? 'bg-black/15 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-[0px] opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${(preferences && !preferences.settings.appearance.sidebar.visible && !sideNavOpen) ? 'md:w-0' : 'md:w-fit' }`}>
      <div className={`duration-300 w-[min(80%,340px)] md:w-65 h-full bg-[var(--white-2)] md:rounded-xl ${sideNavOpen ? 'translate-x-0' : `${sidebarPosition && sidebarPosition === 'Right' ? 'translate-x-full' : '-translate-x-full'}`}`}>
        <div className="w-full h-fit px-2.5 py-3.5 md:pb-2.5 flex flex-col gap-3.5">
          <div className="w-fit h-hull text-lg md:text-base font-[500] tracking-[3px]">DRAFTS</div>
          <div 
            className="group p-2 md:p-1 bg-[var(--blue-2)] rounded-full flex items-center gap-2 md:gap-1 active:scale-96 duration-300" 
            onClick={() => {
              if (windowWidth < 768) setSideNavOpen(false)
              setNewNoteOpen(true)
            }}
          >
            <div className="flex justify-center items-center bg-[var(--blue-3)] text-[var(--white-1)] rounded-full p-1 md:scale-80 group-hover:scale-85 duration-300">
              <Plus color="#ffffff" />
            </div>
            <div className="text-[15px] md:text-[13px] text-[var(--white-1)] select-none">New Note</div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[var(--blue-1)]"></div>
        <div className="px-2.5 py-2.5 md:py-2 flex justify-between items-center">
          <div className={`ml-1.5 duration-300 md:text-sm ${searchOpen ? 'hidden' : 'block'}`}>All notes</div>
          <div className={`h-fit border-1 rounded-full flex items-center duration-300 ${searchOpen ? 'p-1.5 md:p-1 w-full border-[var(--black-1)]' : 'w-fit border-[var(--white-1)]'}`}>
            <div className="min-h-8 md:min-h-6 h-full w-full rounded-l-full">
              <input 
                className={`min-h-8 md:min-h-6 h-full w-full rounded-l-full px-2.5 outline-none placeholder:text-[var(--black-2)] text-sm ${searchOpen ? 'block' : 'hidden'}`} 
                type="text" 
                placeholder="Enter title ..." 
                name="searchInput"
              />
            </div>
            <div 
              className="group bg-[var(--black-3)] text-[var(--white-1)] w-fit aspect-square rounded-full p-2.5 text-sm md:scale-85 active:scale-90 active:md:scale-75 duration-300" 
              onClick={() => {setSearchOpen(prev => !prev)}}
            >
              <div className="w-full h-full flex justify-center items-center group-hover:scale-95 duration-150">
                <Search dimension={16} color="#ffffff"/>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[var(--blue-1)]"></div>
        <div className={`w-full duration-300 relative ${searchOpen ? 'h-[calc(100%-262px)] md:h-[calc(100%-232px)]' : 'h-[calc(100%-250px)] md:h-[calc(100%-224px)]'}`}>
          <div className="flex justify-end rounded-br-xl">
            <button 
              className="text-[var(--blue-2)] px-3 py-1.5 translate-y-1.5 text-sm md:text-xs duration-200 hover:opacity-75 active:opacity-60"
              onClick={() => {
                if (windowWidth < 768) setSideNavOpen(false)
                setAllNotesOpen(true)
                notesFetch()
              }}
            >
              View All
            </button>
          </div>
            <div className="w-full h-[calc(100%-32px)] md:h-[calc(100%-28px)] overflow-x-hidden overflow-y-auto pt-3">
            {
              noteTitlesFetchStatus === 0 && 
              <div className="w-full h-full flex flex-col items-center justify-center p-3.75">
                <span className="text-sm text-[var(--black-2)] text-center">
                  Gathering your notes.
                </span>
                <span className="text-sm text-[var(--black-2)] text-center">
                  Almost there...
                </span>
              </div>
            }
            {
              noteTitlesFetchStatus === -1 && 
              <div className="w-full h-full flex flex-col gap-1 items-center justify-center p-3.75">
                <span className="text-sm text-[var(--black-2)] text-center">
                  Something went wrong while retrieving your notes.
                </span>
                <button
                  className="w-fit flex items-center gap-1.25 duration-150 hover:opacity-80 active:opacity-60 select-none"
                  onClick={() => {
                    if (noteId) fetchNotesTitle()
                  }}
                >
                  <div className="pl-0.75">
                    <Retry dimension={14} color="#347CE9" />
                  </div>
                  <span className="text-sm text-[var(--blue-2)] font-normal">Retry</span>
                </button>
              </div>
            }
            {
              noteTitlesFetchStatus === 1 && 
              noteTitles.length === 0 &&
              <div className="w-full h-full flex flex-col items-center justify-center p-3.75">
                <span className="text-sm text-[var(--black-2)] text-center">
                  You don't have any notes yet.
                </span>
                <div 
                  className="text-sm text-[var(--black-2)] text-center"
                  onClick={() => {
                    if (windowWidth < 768) setSideNavOpen(false)
                    setNewNoteOpen(true)
                  }}
                >
                  Click <span className="text-[var(--blue-2)] text-center select-none">New Note</span> to get started.
                </div>
              </div>
            } 
            {
              noteTitlesFetchStatus === 1 && 
              noteTitles.length > 0 &&
              <div className="w-full h-full relative">
                <div className="relative z-10 w-full h-full">
                  {noteTitles.map((note, _) => {
                    return (
                      <div
                        className={`w-full py-3 md:py-2.5 flex items-center justify-between gap-2.5 ${sidebarPosition && sidebarPosition === 'Right' ? 'pl-4 pr-5.5' : 'pl-5.5 pr-2.5'}`}
                        key={note.noteID}
                        onClick={() => noteTitleFetch(note.noteID)}
                      >
                        <span className={`text-[15px] text-nowrap truncate duration-300 delay-100 ${note.noteID == noteId ? 'md:text-[13px] ml-1 max-w-[calc(100%-29px)]' : 'md:text-sm max-w-full'}`}>
                          {note.title}
                        </span>
                        <div className={`flex items-center justify-center gap-3.5 duration-300 delay-100 ${note.noteID == noteId ? 'opacity-100 w-fit' : 'opacity-0 w-0'}`}>
                          <div className="md:scale-90 active:scale-85 active:md:scale-80 duration-300">
                            <Edit dimension={19} />
                          </div>
                          <div className="md:scale-90 active:scale-85 active:md:scale-80 duration-300">
                            <Delete dimension={19} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div 
                  className="absolute duration-300 left-0 w-full h-fit z-0" 
                  style={{top: `${(currentNoteIndex * sideNavActiveBg - 13)}px`, display: `${currentNoteIndex == -1 ? 'none' : 'block'}`}}>
                  <div className="bg-[var(--blue-1)] w-full h-3">
                    <div className={`bg-[var(--white-2)] w-full h-full ${sidebarPosition && sidebarPosition === 'Right' ? 'rounded-bl-xl' : 'rounded-br-xl'}`}></div>
                  </div>
                  <div className={`bg-[var(--blue-1)] w-[calc(100%-10px)] h-12 md:h-10 ${sidebarPosition && sidebarPosition === 'Right' ? 'mr-2.5 rounded-r-full' : 'ml-2.5 rounded-l-full'}`}>
                    <div className="h-full w-[calc(100%-12px)] rounded-l-full"></div>
                  </div>
                  <div className="bg-[var(--blue-1)] w-full h-3">
                    <div className={`bg-[var(--white-2)] w-full h-full ${sidebarPosition && sidebarPosition === 'Right' ? 'rounded-tl-xl' : 'rounded-tr-xl'}`}></div>
                  </div>
                </div>
              </div>
            }
            
          </div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-[var(--white-2)] pointer-events-none z-10"></div>
        </div>
        <div className="w-full h-fit p-2.5 pb-3.5 md:pb-2.5 cursor-default">
          <div
            className="w-full h-full p-1.5 md:p-1 border-1 border-[var(--blue-1)] hover:border-[var(--blue-4)] rounded-full flex items-center justify-between gap-2 outline-3 outline-[var(--white-2)] hover:outline-[var(--blue-1)] duration-300 active:scale-98"
            onClick={() => {
              if (windowWidth < 768) setSideNavOpen(false)
              setAccountOpen(true)
            }}
          >
            <div className="max-w-[calc(100%-46.4px)] flex items-center gap-2">
              <div className="max-w-full flex justify-center items-center bg-[var(--blue-1)] rounded-full p-2 scale-90">
                <Account dimension={18} color="#1b63ce" />
              </div>
              {
              loggedUser
              ? 
              (<div className="w-full max-w-full flex flex-col">
                <span className="text-[15px] md:text-sm text-nowrap truncate text-[var(--black-3)]">
                  {loggedUser.firstName +
                  ' ' +
                  loggedUser.middleName +
                  ' ' +
                  loggedUser.lastName}
                </span>
                <span className="text-xs text-[var(--black-2)] text-nowrap truncate font-normal">
                  {loggedUser.username}
                </span>
              </div>)
              :
              ''
              }
            </div>
            <div className="flex justify-center items-center bg-[var(--blue-1)] rounded-full p-2 scale-90">
              <Settings dimension={20} color="#1b63ce" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[calc(100%-min(80%,340px))] md:w-0" onClick={() => setSideNavOpen(false)}></div>
    </div>
  )
}

export default SideBar