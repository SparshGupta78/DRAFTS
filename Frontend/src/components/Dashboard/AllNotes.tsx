import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowTopRight, Close, Delete, Filter, Plus, Retry } from "../../assets/Icons"
import DropDown from "../DropDown/DropDown"
import DropDownItem from "../DropDown/DropDownItem"
import type { NoteType } from "../../types/note.type"
import { AllNotesAPI } from "../../services/user.service"
import { useParams } from "react-router-dom"
import { useNotificationContext } from "../../contexts/notification.context"
import { extractTextFromJSON } from "../../utils/tiptapTextExtractor"

type props = {
  allNotesOpen: boolean,
  setAllNotesOpen: React.Dispatch<React.SetStateAction<boolean>>
  setNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AllNotes = ({allNotesOpen, setAllNotesOpen, setNewNoteOpen}: props) => {

  const { username } = useParams()
  const { createNotification } = useNotificationContext()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [filter, setFilter] = useState<'All' | 'Pinned' | 'Unpinned'>('All')
  const [search, setSearch] = useState('')
  const dialogRef = useRef(null)
  const filters = ['All', 'Pinned', 'Un-pinned']
  const [notes, setNotes] = useState<NoteType[]>([])
  const [fetchingStatus, setFetchingStatus] = useState<-1 | 0 | 1>(1)

  const notesFetch = async () => {
    setFetchingStatus(0)
    try {
      if (!username) return setFetchingStatus(-1)
      const res = await AllNotesAPI(username)
      setNotes(res.data)
      setFetchingStatus(1)
    } catch {
      createNotification({
        title: "Unable to Fetch Notes",
        message: "We couldn't retrieve your notes. Please try again.",
        type: "error"
      })
      setFetchingStatus(-1)
    }
  }

  useEffect(() => {
    notesFetch()
    const handler = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const outsideClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dialogRef.current && !(dialogRef.current as HTMLElement).contains(e.target as Node)) {
      setAllNotesOpen(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-100 bg-black/15 backdrop-blur-[2px] duration-300 ${allNotesOpen ? 'pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-full h-full flex items-center justify-center" onClick={(e) => outsideClickHandler(e)}>
        <div ref={dialogRef} className={`w-92/100 sm:max-w-275 h-90/100 max-h-full bg-[var(--white-2)] rounded-xl shadow-[var(--shadow-1)] duration-300 ${allNotesOpen ? 'scale-100' : 'scale-98'}`}>
          <div className="px-3 py-2 bg-[var(--black-4)] flex items-center justify-between gap-2.5 rounded-t-xl border-b-[1px] border-[var(--black-1)]">
            <span className="pl-1.5">All Notes</span>
            <div
              className="duration-150 hover:opacity-70 active:opacity-60"
              onClick={() => {
                setAllNotesOpen(false)
              }}
            >
              <Close />
            </div>
          </div>
          <div className="w-full h-[calc(100%-41px)] max-h-full">
            <div className="px-3 py-1.75 flex flex-col-reverse sm:flex-row justify-between items-center gap-2.5 relative">
              <div className="w-full sm:w-fit ml-1 flex justify-between sm:justify-start items-center gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-[var(--black-5)] text-nowrap">7 Notes</div>
                  <div className="h-4 w-0.5 bg-[var(--black-1)] rounded-full"></div>
                </div>
                <div className="flex items-center gap-2.5">
                  <DropDown 
                    trigger={
                      <button className="flex items-center duration-150 hover:opacity-75 active:opacity-60">
                        <span className="text-sm text-[var(--blue-2)] mr-1 text-nowrap">Filter</span>
                        <Filter dimension={14} color="#347CE9" />
                        <ArrowDown dimension={8} color="#347CE9" />
                      </button>
                    }
                    preStyle={false}
                    contentStyle="p-1.25 bg-[var(--black-6)] rounded-lg"
                    align={windowWidth < 640 ? 'right' : 'left'}
                  >
                    {filters && filters.map((item => {
                      return (
                        <DropDownItem
                          key={item}
                          setValue={setFilter}
                          data={item}
                          preStyle={false}
                          className={`text-sm text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200 ${filter === item ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'}`}
                        >
                          {item}
                        </DropDownItem>
                      )
                    }))}
                  </DropDown>
                  <DropDown
                    trigger={
                      <button className="text-sm text-[var(--red-4)] duration-150 hover:opacity-75 active:opacity-60 text-nowrap">
                        Delete All
                      </button>
                    }
                    preStyle={false}
                    contentStyle="p-1.5 bg-[var(--black-6)] rounded-lg"
                    align={windowWidth < 640 ? 'right' : 'left'}
                  >
                    <div className="w-50">
                      <div className="text-center p-2 text-[var(--black-5)]">
                        <div className="text-sm font-normal">Are you sure you want to delete all notes?</div>
                        <div className="mt-1 text-xs">This action cannot be undone.</div>
                      </div>
                      <div className="mt-1.5 text-sm bg-[var(--red-5)] rounded-md text-center p-0.75 text-[var(--white-2)] font-normal select-none duration-300 hover:opacity-70 active:scale-96">
                        Yes, Delete
                      </div>
                    </div>
                  </DropDown>
                </div>
              </div>
              <div className="w-full sm:w-fit">
                <div className="relative rounded-md">
                  <input 
                    type="text"
                    name="search"
                    className="w-full max-w-full rounded-md pl-2.25 pr-7.5 py-1 text-sm outline-0 bg-[var(--black-6)] border-1 border-[var(--black-6)] duration-300 focus:border-[var(--black-1)] placeholder:text-sm"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div
                    className="absolute right-0 top-0 h-8 w-8 flex items-center justify-center"
                    onClick={() => setSearch('')}
                  >
                    <div className={`duration-300 ${search.length > 0 ? 'scale-100 opacity-100' : 'opacity-0 scale-0'}`}>
                      <Close dimension={18} color="#4C4C4C" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-0 bottom-0 w-full h-5 translate-y-98/100 bg-gradient-to-b from-[var(--white-2)] to-transparent"></div>
            </div>
            <div className="w-full h-[calc(100%-78px)] sm:h-[calc(100%-44px)] overflow-x-hidden overflow-y-auto rounded-b-xl">
              <div className="p-2.5 pt-4 flex flex-wrap gap-2.5">
                {fetchingStatus === 1 && notes.length > 0 
                ?
                <>
                  {notes.map((note, index) => {
                    const date = note.createdAt ? note.createdAt.split('T')[0].split('-') : null
                    const month = date ? new Date(0, Number(date[1])).toLocaleString('en-US', {month: 'long'}) : ''
                    const formattedDate = date ? date[2] + ' ' +  month + ', ' + date[0]: ''
                    return (
                      <div key={index} className="bg-[var(--white-1)] border-1 border-[var(--black-4)] p-2.5 rounded-md w-full sm:w-[calc(50%-5px)] lg:w-[calc(33%-4px)] flex flex-col gap-2">
                        <div className="w-full flex justify-between items-center gap-2.5">
                          <div className="text-xs text-[var(--black-2)]">{formattedDate}</div>
                          <div className="flex items-center gap-3">
                            <div className="h-fit">
                              <ArrowTopRight dimension={14} color="#1e1e1e" />
                            </div>
                            <div className="h-fit">
                              <Delete dimension={16} color="#1e1e1e" />
                            </div>
                          </div>
                        </div>
                        <div className="w-full text-lg font-normal text-nowrap line-clamp-1">
                          {note.title}
                        </div>
                        <div className="w-full sm:h-20 text-sm text-[va(--black-3)] line-clamp-4">
                          {
                            extractTextFromJSON(note.content) !== '' 
                            ? 
                            extractTextFromJSON(note.content) 
                            : 
                            <span className="text-[var(--black-2)] italic">No content</span>
                          }
                        </div>
                        <div className="flex gap-2 w-full max-w-full overflow-x-auto overflow-y-hidden">
                          {note.tags && note.tags.map((tag, _) => {
                            return (
                              <div key={tag.tagId} className="h-fit w-fit text-xs px-2.5 py-0.75 rounded-full bg-[var(--blue-1)] text-[var(--black-5)] font-normal text-nowrap max-w-25 truncate">
                                {tag.tag}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </>
                :
                <div className="w-full h-full flex items-center justify-center p-2.5">
                  <div className="w-full max-w-150 p-2 sm:p-5 text-[var(--black-2)] flex flex-col gap-5">
                    <div className="text-[22px] sm:text-2xl font-normal">
                      {fetchingStatus === -1 && 'Unable to load notes'}
                      {fetchingStatus === 0 && 'Loading notes'}
                      {fetchingStatus === 1 && notes.length === 0 && 'No notes found'}
                    </div>
                    <div className="text-sm sm:text-[15px]">
                      {fetchingStatus === -1 && (
                        <>
                          <div>Something went wrong while retrieving your notes.</div>
                          <div className="mt-1">Please try again.</div>
                        </>
                      )}
                      {fetchingStatus === 0 && (
                        <>
                          <div>Retrieving all your notes…</div>
                          <div className="mt-1">Almost there.</div>
                        </>
                      )}
                      {fetchingStatus === 1 && notes.length === 0 && (
                        <>
                          <div>You haven't created any notes yet.</div>
                          <div className="mt-1">Start by creating your first one.</div>
                        </>
                      )}
                    </div>
                    {fetchingStatus === -1 && (
                      <div className="">
                        <button
                          className="w-fit flex items-center gap-1.25 duration-150 hover:opacity-80 active:opacity-60 select-none"
                          onClick={() => {
                            notesFetch()
                          }}
                        >
                          <div className="pl-0.75">
                            <Retry dimension={16} color="#347CE9" />
                          </div>
                          <span className="text-[var(--blue-2)] font-normal">Retry</span>
                        </button>
                      </div>
                    )}
                    {fetchingStatus === 1 && notes.length === 0 && (
                      <div className="">
                        <button
                          className="w-fit flex items-center gap-0.5 duration-150 hover:opacity-80 active:opacity-60 select-none"
                          onClick={() => {
                            setNewNoteOpen(true)
                            setAllNotesOpen(false)
                          }}
                        >
                          <div>
                            <Plus dimension={22} color="#347CE9" />
                          </div>
                          <span className="text-[var(--blue-2)] font-normal">Create New</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllNotes