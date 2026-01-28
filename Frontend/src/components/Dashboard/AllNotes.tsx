import { useRef, useState } from "react"
import { ArrowDown, ArrowTopRight, Close, Delete, Filter, Plus, Retry } from "../../assets/Icons"
import DropDown from "../DropDown/DropDown"
import DropDownItem from "../DropDown/DropDownItem"
import { extractTextFromJSON } from "../../utils/tiptapTextExtractor"
import type { NoteType } from "../../types/note.type"
import { useWindowWidthContext } from "../../contexts/windowWidth.context"
import useUserAPI from "../../services/user.service"
import { Link, useParams } from "react-router-dom"
import DialogWrapper from "../DialogWrapper/DialogWrapper"

type props = {
  allNotesOpen: boolean,
  setAllNotesOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  allNotes: NoteType[],
  allNotesFetchingStatus: -1 | 0 | 1,
  notesFetch: () => Promise<void>,
  fetchNotesTitle: () => Promise<void>,
  isUserDashboard: boolean
}

const AllNotes = ({
  allNotesOpen,
  setAllNotesOpen,
  setNewNoteOpen,
  allNotes,
  allNotesFetchingStatus,
  notesFetch,
  fetchNotesTitle,
  isUserDashboard
}: props) => {

  const { DeleteAllNotes } = useUserAPI()

  const windowWidth = useWindowWidthContext()

  const { username } = useParams()

  const [filter, setFilter] = useState<'All' | 'Pinned' | 'Unpinned'>('All')
  const [search, setSearch] = useState('')
  const filters = ['All', 'Pinned', 'Un-pinned']

  const deleteAllNotesHandler = async () => {
    if(!username) return
    const res = await DeleteAllNotes(username)
    if(res) {
      await notesFetch()
      await fetchNotesTitle()
    }
  }

  return (
    <DialogWrapper
      open={allNotesOpen}
      setOpen={setAllNotesOpen}
      header={"All Notes"}
    >
      <div className="px-3 py-1.75 flex flex-col-reverse sm:flex-row justify-between items-center gap-2.5 relative">
        <div className="w-full sm:w-fit ml-1 flex justify-between sm:justify-start items-center gap-2.5">
          <div className="flex items-center gap-2">
            <div className="text-sm text-[var(--black-5)] text-nowrap">
              {
                allNotesFetchingStatus === 1
                ?
                (
                  allNotes.length > 1
                  ?
                  `${allNotes.length} Notes`
                  :
                  `${allNotes.length} Note`
                )
                :
                (
                  '- Notes'
                )
              }
            </div>
            <div className="h-4 w-0.5 bg-[var(--black-1)] rounded-full"></div>
          </div>
          {isUserDashboard && (
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
                  <button
                    className="mt-1.5 w-full text-sm bg-[var(--red-5)] rounded-md text-center p-0.75 text-[var(--white-2)] font-normal select-none duration-300 hover:opacity-70 active:scale-96"
                    onClick={deleteAllNotesHandler}
                  >
                    Yes, Delete All
                  </button>
                </div>
              </DropDown>
            </div>
          )}
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
              className="absolute right-0 top-0 h-full w-8 flex items-center justify-center"
              onClick={() => setSearch('')}
            >
              <div className={`hover:opacity-65 duration-300 ${search.length > 0 ? 'scale-100 opacity-100' : 'opacity-0 scale-0'}`}>
                <Close dimension={18} color="#4C4C4C" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 w-full h-5 translate-y-98/100 bg-gradient-to-b from-[var(--white-2)] to-transparent"></div>
      </div>
      <div className="w-full h-[calc(100%-78px)] sm:h-[calc(100%-44px)] overflow-x-hidden overflow-y-auto rounded-b-xl">
        <div className="p-2.5 pt-4 flex flex-wrap gap-2.5">
          {allNotesFetchingStatus === 1 && allNotes.length > 0 
          ?
          <>
            {allNotes.map((note, index) => {
              const date = note.createdAt ? note.createdAt.split('T')[0].split('-') : null
              const month = date ? new Date(0, Number(date[1])).toLocaleString('en-US', {month: 'long'}) : ''
              const formattedDate = date ? date[2] + ' ' +  month + ', ' + date[0]: ''
              return (
                <div key={index} className="bg-[var(--white-1)] border-1 border-[var(--black-4)] p-2.5 rounded-md w-full sm:w-[calc(50%-5px)] lg:w-[calc(33%-4px)] flex flex-col gap-2">
                  <div className="w-full flex justify-between items-center gap-2.5">
                    <div className="text-xs text-[var(--black-2)]">{formattedDate}</div>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/${username}/${note.noteID}`}
                        className="h-fit"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ArrowTopRight dimension={14} color="#1e1e1e" />
                      </Link>
                      {isUserDashboard && (
                        <div className="h-fit">
                          <Delete dimension={16} color="#1e1e1e" />
                        </div>
                      )}
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
                {allNotesFetchingStatus === -1 && 'Unable to load notes'}
                {allNotesFetchingStatus === 0 && 'Loading notes...'}
                {allNotesFetchingStatus === 1 && allNotes.length === 0 && 'No notes found'}
              </div>
              <div className="text-sm sm:text-[15px]">
                {allNotesFetchingStatus === -1 && (
                  <>
                    <div>Something went wrong while retrieving the notes.</div>
                    <div className="mt-1">Please try again.</div>
                  </>
                )}
                {allNotesFetchingStatus === 0 && (
                  <>
                    <div>Retrieving all the notes…</div>
                    <div className="mt-1">Almost there.</div>
                  </>
                )}
                {allNotesFetchingStatus === 1 && allNotes.length === 0 && (
                    isUserDashboard ? (
                      <>
                        <div>You haven't created any notes yet.</div>
                        <div className="mt-1">Start by creating your first one.</div>
                      </>
                    ) : (
                      <>
                        <div>{username} haven't created any public notes yet.</div>
                        <div className="mt-1">When {username} shares public notes, they'll appear here.</div>
                      </>
                    )
                )}
              </div>
              {allNotesFetchingStatus === -1 && (
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
              {isUserDashboard && allNotesFetchingStatus === 1 && allNotes.length === 0 && (
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
    </DialogWrapper>
  )
}

export default AllNotes