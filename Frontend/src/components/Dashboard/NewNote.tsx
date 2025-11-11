import { useRef, useState } from "react"
import { Close } from "../../assets/Icons"
import { useNotificationContext } from "../../contexts/notification.context"
import { newNoteAPI } from "../../services/user.service"
import { useNavigate, useParams } from "react-router-dom"
import type { TagType } from "../../types/tag.type"
import type { CreateNewNote } from "../../types/CreateNewNote.type"

type NewNoteType = {
  newNoteOpen: boolean,
  setNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  fetchNotesTitle: () => void
}

const NewNote = ({newNoteOpen, setNewNoteOpen, fetchNotesTitle}: NewNoteType) => {

  const navigate = useNavigate()

  const { username } = useParams()

  const {createNotification} = useNotificationContext()

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<TagType[]>([])
  const [tagInput, setTagInput] = useState('')
  const [visibility, setVisibility] = useState<'private' | 'public'>('private')
  const [fieldDisable, setFieldDisable] = useState(false)
  const dialogRef = useRef(null)

  const createTag = () => {
    if (tagInput.length < 1 || tagInput.length > 10) {
      return createNotification({
        title: "Invalid Tag Length",
        message: "Tags must contain between 1 and 10 characters.",
        type: "error"
      })
    }
    if (tags.length >= 5) {
      return createNotification({
        title: "Tag Limit Reached", 
        message: "You can create up to 5 tags only.", 
        type: "error"
      })
    }
    setTags(prev => {
      if (prev.length >= 5) {
        return prev
      }
      return [{tagId: crypto.randomUUID(), tag: tagInput}, ...prev]
    })
  }

  const removeTag = (id: string) => {
    setTags(tags.filter(tag => tag.tagId != id))
  }

  const clearDialog = () => {
    setNewNoteOpen(false)
    setTitle('')
    setTagInput('')
    setTags([])
    setVisibility('private')
    setFieldDisable(false)
  }

  const submitHandler = async () => {
    setFieldDisable(true)
    if (title.length < 1 || title.length > 50) {
      setFieldDisable(false)
      return createNotification({
        title: "Invalid Title Length",
        message: "Title must contain between 1 and 50 characters.",
        type: "error"
      })
    }
    try {
      if (!username) {
        return
      }
      const payload: CreateNewNote = {note: {title, tags, visibility}, username: username}
      const newNoteId = await newNoteAPI(payload)
      if (!newNoteId) {
        createNotification({
          title: "Failed to Create Note",
          message: "An error occurred while creating the note. Please try again.",
          type: "error"
        })
      } else {
        navigate(`/${username}/${newNoteId.data.noteID}`)
        clearDialog()
        fetchNotesTitle()
      }
      setFieldDisable(false)
    } catch (error) {
      setFieldDisable(false)
      return createNotification({
        title: "Failed to Create Note",
        message: "An error occurred while creating the note. Please try again.",
        type: "error"
      })
    }
  }

  const outsideClickHandler = (e :React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dialogRef.current && !(dialogRef.current as HTMLElement).contains(e.target as Node)) {
      clearDialog()
    }
  }

  return (
    <div className={`fixed inset-0 z-100 bg-black/15 backdrop-blur-[2px] duration-300 ${newNoteOpen ? 'pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-full h-full flex items-center justify-center" onClick={(e) => outsideClickHandler(e)}>
        <div ref={dialogRef} className={`w-full h-fit bg-[var(--white-2)] rounded-xl max-w-93/100 sm:max-w-150 shadow-[var(--shadow-1)] duration-300 ${newNoteOpen ? 'scale-100' : 'scale-98'}`}>
          <div className="px-3 py-2 bg-[var(--black-4)] flex items-center justify-between gap-2.5 rounded-t-xl border-b-[1px] border-[var(--black-1)]">
            <span className="pl-1.5">New Note</span>
            <div 
              onClick={() => {
                clearDialog()
              }}
            >
              <Close />
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2.5">
            <div className="sm:flex items-center">
              <div className="w-full sm:w-1/2 flex flex-wrap items-center sm:items-start gap-2 sm:gap-0 justify-between sm:flex-col">
                <div className="text-[15px] sm:text-base">Title</div>
                <div className="text-xs text-[var(--black-2)] italic">Can change later</div>
              </div>
              <div className="mt-1.5 sm:mt-0 w-full sm:w-1/2">
                <input 
                  type="text" 
                  name="title" 
                  className="px-3 py-1.5 rounded-full w-full border-2 outline-0 border-[var(--blue-1)] placeholder:text-sm placeholder:text-[var(--black-2)] placeholder:opacity-60 disabled:opacity-75 duration-300" 
                  placeholder="Max 50 characters" 
                  value={title}
                  onChange={(e) => setTitle(prev => (
                    e.target.value.length <= 50 ? e.target.value : prev
                  ))} 
                  disabled={fieldDisable}
                />
              </div>
            </div>
            <div className="sm:flex items-center flex-wrap">
              <div className="w-full sm:w-1/2 flex flex-wrap items-center sm:items-start gap-2 sm:gap-0 justify-between sm:flex-col">
                <div className="text-[15px] sm:text-base">Tags</div>
                <div className="text-xs text-[var(--black-2)] italic">Maximum of 5 allowed</div>
              </div>
              <div className="mt-1.5 sm:mt-0 w-full sm:w-1/2">
                <div className="w-fit max-w-full relative">
                  <input 
                    type="text" 
                    name="title" 
                    className="pl-3 py-1.5 pr-15 rounded-full max-w-full border-2 outline-0 border-[var(--blue-1)] placeholder:text-sm placeholder:text-[var(--black-2)] placeholder:opacity-60 disabled:opacity-75 duration-300" 
                    placeholder="Max 10 characters" 
                    value={tagInput} 
                    onChange={(e) => setTagInput(prev => (
                      e.target.value.length <= 10 ? e.target.value : prev
                    ))} 
                    disabled={fieldDisable}
                    />
                  <button 
                    className={`absolute top-1/2 right-1.25 -translate-y-1/2 rounded-full px-3 py-1.25 text-sm font-normal bg-[var(--blue-1)] disabled:opacity-75 duration-300 ${fieldDisable ? 'text-[var(--black-2)]' : 'text-[var(--blue-2)]'}`} 
                    onClick={() => {
                      createTag()
                      setTagInput('')
                    }} 
                    disabled={fieldDisable}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className={`mt-3 w-full flex flex-wrap items-center gap-2.5 h-fit duration-500 ${tags.length > 0 ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                {tags.map((tag, _) => {
                  return (
                    <div key={tag.tagId} className="bg-[var(--blue-1)] rounded-full px-1.75 py-1 flex items-center gap-1">
                      <span className="text-xs text-[var(--blue-3)] max-w-24 overflow-hidden truncate pl-0.25">
                        {tag.tag}
                      </span>
                      <div onClick={() => removeTag(tag.tagId)}>
                        <Close dimension={12} color="#347CE9" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-0.5 sm:flex items-center">
              <div className="w-full sm:w-1/2 flex flex-wrap items-center sm:items-start gap-2 sm:gap-0 justify-between sm:flex-col">
                <div className="text-[15px] sm:text-base">Visibility</div>
                <div className="text-xs text-[var(--black-2)] italic">Choose who can see your notes</div>
              </div>
              <div className="mt-1.5 sm:mt-0 w-full sm:w-1/2">
                <div className="p-0.75 w-fit max-w-full border-2 border-[var(--blue-1)] rounded-full flex">
                  <div 
                    className={`px-5 py-1.25 rounded-full text-sm w-1/2 flex items-center justify-center font-normal duration-200 select-none ${visibility === 'private' ? 'bg-[var(--blue-1)] text-[var(--blue-2)]' : 'text-[var(--black-2)]'} ${fieldDisable ? 'opacity-75' : ''}`} 
                    onClick={() => {!fieldDisable && setVisibility('private')}}
                  >
                    Private
                  </div>
                  <div 
                    className={`px-5 py-1.25 rounded-full text-sm w-1/2 flex items-center justify-center font-normal duration-200 select-none ${visibility === 'public' ? 'bg-[var(--blue-1)] text-[var(--blue-2)]' : 'text-[var(--black-2)]'} ${fieldDisable ? 'opacity-75' : ''}`} 
                    onClick={() => {!fieldDisable && setVisibility('public')}}
                  >
                    Public
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3.5 flex justify-end">
              <button 
                className={`w-fit px-5 py-1.5 rounded-full text-[15px] font-normal duration-300 ${fieldDisable ? 'bg-[var(--white-5)] text-[var(--black-2)]' : 'bg-[var(--blue-2)] text-[var(--white-2)]'}`} 
                onClick={() => submitHandler()}
                disabled={fieldDisable}
              >
                {fieldDisable ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewNote