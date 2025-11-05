import { useEffect, useMemo, useState, type Dispatch } from "react"
import { NavLink } from "react-router-dom"
import type {Note} from '../types/note.type'

type SideBarProps = {
  notes: Note[],
  currentNoteID: number,
  setCurrentNoteID: Dispatch<React.SetStateAction<number>>,
  sideNavOpen: boolean,
  setSideNavOpen: Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({ notes, currentNoteID, setCurrentNoteID, sideNavOpen, setSideNavOpen }: SideBarProps) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [searchOpen, setSearchOpen] = useState(false)
  const [sideNavActiveBg, setSideNavActiveBg] = useState(windowWidth > 768 ? 40 : 46.5)

  useEffect(() => {
    const windowSizeHandler = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', windowSizeHandler)
    return () => window.removeEventListener('resize', windowSizeHandler)
  }, [])

  useEffect(() => {
    if (windowWidth >= 768) {
      setSideNavOpen(true)
      setSideNavActiveBg(40)
    } else {
      setSideNavOpen(false)
      setSideNavActiveBg(46.5)
    }
  }, [windowWidth])
  
  const currentNoteIndex = useMemo(() => {
    return notes.findIndex(note => note.noteID === currentNoteID)
  }, [notes, currentNoteID])

  return (
    <div className={`duration-300 fixed md:relative inset-0 w-full md:w-fit h-full flex z-100 md:p-5 md:pr-2.5 ${sideNavOpen ? 'bg-black/15 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-[0px] opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`duration-300 w-[min(80%,340px)] md:w-65 h-full bg-[var(--white-2)] md:rounded-xl ${sideNavOpen ? 'translate-x-[-0%]' : 'translate-x-[-100%]'}`}>
        <div className="w-full h-fit px-2.5 py-3.5 md:pb-2.5 flex flex-col gap-3.5">
          <div className="w-fit h-hull text-lg md:text-base font-[500] tracking-[3px]">DRAFTS</div>
          <div className="p-2 md:p-1 bg-[var(--blue-2)] rounded-full flex items-center gap-2 md:gap-1">
            <div className="flex justify-center items-center bg-[var(--blue-3)] text-[var(--white-1)] rounded-full p-1 md:scale-80">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_4418_6162)">
                  <path opacity="0.4" d="M6 12H18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_4418_6162">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="text-[15px] md:text-[13px] text-[var(--white-1)]">New Note</div>
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
              className="bg-[var(--black-3)] text-[var(--white-1)] flex justify-center items-center w-fit aspect-square rounded-full p-2.5 text-sm md:scale-85" 
              onClick={() => {setSearchOpen(prev => !prev)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path opacity="0.4" d="M22 22L20 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[var(--blue-1)]"></div>
        <div className={`w-full duration-300 relative ${searchOpen ? 'h-[calc(100%-262px)] md:h-[calc(100%-232px)]' : 'h-[calc(100%-250px)] md:h-[calc(100%-224px)]'}`}>
          <div className="flex justify-end rounded-br-xl">
            <NavLink to='' className='text-[var(--blue-2)] px-3 py-1.5 translate-y-1.5 text-sm md:text-xs'>View All</NavLink>
          </div>
            <div className="w-full h-[calc(100%-32px)] md:h-[calc(100%-28px)] overflow-x-hidden overflow-y-auto pt-3">
            <div className="w-full h-full relative">
              <div className="relative z-10 w-full h-full">
                {notes.map((note, index) => {
                  return (
                    <NavLink key={index} to=''>
                      <div className="w-full pl-5.5 pr-2.5 py-3 md:py-2.5 flex items-center justify-between gap-2.5" onClick={() => setCurrentNoteID(note.noteID)}>
                        <span className={`text-[15px] text-nowrap truncate duration-300 delay-100 ${note.noteID == currentNoteID ? 'md:text-[13px] ml-1 max-w-[calc(100%-29px)]' : 'md:text-sm max-w-full'}`}>
                          {note.title}
                        </span>
                        <div className={`flex items-center justify-center gap-3.5 duration-300 delay-100 ${note.noteID == currentNoteID ? 'opacity-100 w-fit' : 'opacity-0 w-0'}`}>
                          <div className="md:scale-90">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none">
                              <g clipPath="url(#clip0_4418_6050)">
                                <path opacity="0.4" d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.0399 3.01928L8.15988 10.8993C7.85988 11.1993 7.55988 11.7893 7.49988 12.2193L7.06988 15.2293C6.90988 16.3193 7.67988 17.0793 8.76988 16.9293L11.7799 16.4993C12.1999 16.4393 12.7899 16.1393 13.0999 15.8393L20.9799 7.95928C22.3399 6.59928 22.9799 5.01928 20.9799 3.01928C18.9799 1.01928 17.3999 1.65928 16.0399 3.01928Z" stroke="#000000" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path opacity="0.4" d="M14.9102 4.15039C15.5802 6.54039 17.4502 8.41039 19.8502 9.09039" stroke="#000000" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_4418_6050">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="md:scale-90">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none">
                              <g clipPath="url(#clip0_4418_6145)">
                                <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path opacity="0.34" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.8499 9.14062L18.1999 19.2106C18.0899 20.7806 17.9999 22.0006 15.2099 22.0006H8.7899C5.9999 22.0006 5.9099 20.7806 5.7999 19.2106L5.1499 9.14062" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path opacity="0.34" d="M10.3301 16.5H13.6601" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path opacity="0.34" d="M9.5 12.5H14.5" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_4418_6145">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  )
                })}
              </div>
              <div 
                className="absolute duration-300 left-0 w-full h-fit z-0" 
                style={{top: `${(currentNoteIndex * sideNavActiveBg - 13)}px`, display: `${currentNoteIndex == -1 ? 'none' : 'block'}`}}>
                <div className="bg-[var(--blue-1)] w-full h-3">
                  <div className="bg-[var(--white-2)] w-full h-full rounded-br-xl"></div>
                </div>
                <div className="bg-[var(--blue-1)] ml-2.5 w-[calc(100%-10px)] h-12 md:h-10 rounded-l-full">
                  <div className="h-full w-[calc(100%-12px)] rounded-l-full"></div>
                </div>
                <div className="bg-[var(--blue-1)] w-full h-3">
                  <div className="bg-[var(--white-2)] w-full h-full rounded-tr-xl"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-[var(--white-2)] pointer-events-none z-10"></div>
        </div>
        <div className="w-full h-fit p-2.5 pb-3.5 md:pb-2.5">
          <div className="w-full h-full p-1.5 md:p-1 border-1 border-[var(--black-4)] rounded-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-[var(--black-4)] rounded-full p-2 scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_3111_32680)">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.4" d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_3111_32680">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-[15px] md:text-sm">Raj Yadav</div>
            </div>
            <div className="flex justify-center items-center bg-[var(--black-4)] rounded-full p-2 scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_4418_6270)">
                  <path d="M3 9.10937V14.8794C3 16.9994 3 16.9994 5 18.3494L10.5 21.5294C11.33 22.0094 12.68 22.0094 13.5 21.5294L19 18.3494C21 16.9994 21 16.9994 21 14.8894V9.10937C21 6.99937 21 6.99937 19 5.64937L13.5 2.46937C12.68 1.98937 11.33 1.98937 10.5 2.46937L5 5.64937C3 6.99937 3 6.99937 3 9.10937Z" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path opacity="0.34" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_4418_6270">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[calc(100%-min(80%,340px))] md:w-0" onClick={() => setSideNavOpen(false)}></div>
    </div>
  )
}

export default SideBar