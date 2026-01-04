import { useRef, useState } from "react"
import { Close } from "../../assets/Icons"
import type { AlertContentType } from "../../types/alertContent.type"
import type { TagType } from "../../types/tag.type"
import { useNotificationContext } from "../../contexts/notification.context"

type props = {
  alertOpen: boolean,
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
  alertContentType: AlertContentType,
  deleteNote: () => Promise<void>
  toggleVisibilityStatus: () => Promise<void>
  addTag: (tag: TagType[]) => Promise<void>,
  currentTags: TagType[]
}

const Alert = ({
  alertOpen,
  setAlertOpen,
  alertContentType,
  deleteNote,
  toggleVisibilityStatus,
  addTag,
  currentTags
}: props) => {

  const { createNotification } = useNotificationContext()
  
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<TagType[]>([])

  const dialogRef = useRef(null)

  const createTag = () => {
    if (tagInput.length < 1 || tagInput.length > 10) {
      return createNotification({
        title: "Invalid Tag Length",
        message: "Tags must contain between 1 and 10 characters.",
        type: "default"
      })
    }
    if ((currentTags.length + tags.length) >= 5) {
      return createNotification({
        title: "Tag Limit Reached", 
        message: "You can create up to 5 tags only.", 
        type: "default"
      })
    }
    const allTags = [...currentTags, ...tags]
    const exists = allTags.some(t => t.tag === tagInput)
    if (exists) {
      return createNotification({
        title: "Duplicate Tag",
        message: "A tag with this name already exists.",
        type: "default"
      })
    }
    setTags(prev => {
      if (prev.length >= 5) {
        return prev
      }
      return [...prev, {tagId: crypto.randomUUID(), tag: tagInput}]
    })
  }

  const removeTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.tagId !== tagId))
  }

  const clearDialog = () => {
    setAlertOpen(false)
    setTagInput('')
    setTags([])
  }

  const outsideClickHandler = (e :React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dialogRef.current && !(dialogRef.current as HTMLElement).contains(e.target as Node)) {
      setAlertOpen(false)
    }
  }

  const submitHandler = () => {
    if (alertContentType === 'delete') deleteNote()
    if (alertContentType === 'makePublic' || alertContentType === 'makePrivate') toggleVisibilityStatus()
    if (alertContentType === 'addTag') {
      if (tags.length === 0) {
        createNotification({
          title: "No Tag Added",
          message: "Please enter a tag name before adding.",
          type: "default"
        })
        return
      }
      addTag(tags)
    }
    clearDialog()
  }

  return (
    <div
      className={`p-3 fixed inset-0 w-screen h-screen z-100 bg-black/15 backdrop-blur-[2px] duration-300 flex items-center justify-center ${alertOpen ? 'pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={(e) => outsideClickHandler(e)}
    >
      <div
        className="w-full max-w-120 shadow-[var(--shadow-1)] rounded-xl"
        ref={dialogRef}
      >
        <div className="px-3 py-2 bg-[var(--black-4)] flex items-center justify-between gap-1.5 rounded-t-xl border-b-1 border-[var(--black-1)]">
          <div className="pl-0.25">
            {alertContentType === 'delete' ? "Delete Note" : ""}
            {(alertContentType === 'makePublic' || alertContentType === 'makePrivate') ? "Change Visibility" : ""}
            {(alertContentType === 'pin' || alertContentType === 'unpin') ? "Pin/Unpin Note" : ""}
            {alertContentType === 'addTag' ? "Add Tag" : ""}
          </div>
          <button
            className="duration-150 hover:opacity-70 active:opacity-60"
            onClick={() => setAlertOpen(false)}
          >
            <Close />
          </button>
        </div>
        <div className="p-2.5 bg-[var(--white-2)] rounded-b-xl">
          <div className="px-0.75 w-full font-normal">
            {alertContentType === 'delete' ? "Are you sure you want to delete this note?" : ""}
            {alertContentType === 'makePublic' ? "Are you sure you want to make this note public?" : ""}
            {alertContentType === 'makePrivate' ? "Are you sure you want to make this note private?" : ""}
            {alertContentType === 'pin' ? "Pin this note?" : ""}
            {alertContentType === 'unpin' ? "Unpin this note?" : ""}
            {alertContentType === 'addTag' ? "Add a new tag to this note?" : ""}
          </div>
          <div className="px-0.75 mt-0.5 w-full font-normal text-[var(--black-2)] text-sm">
            {alertContentType === 'delete' ? "This action cannot be undone." : ""}
            {alertContentType === 'makePublic' ? "Anyone with the link will be able to view this note." : ""}
            {alertContentType === 'makePrivate' ? "Only you will be able to access this note after this change." : ""}
            {alertContentType === 'pin' ? "This note will stay at the top of your notes list." : ""}
            {alertContentType === 'unpin' ? "This note will return to its original position in the list." : ""}
            {alertContentType === 'addTag' ? "This will make the note easier to categorize and access later." : ""}
          </div>
          {alertContentType === 'addTag' && (
            <div className="w-full mt-2">
              <div className="w-full flex gap-1.5">
                <div className="relative w-[calc(100%-55.72px)]">
                  <input
                    type="text"
                    className="w-full pl-2 pr-7 py-0.5 border-2 border-[var(--blue-1)] rounded-md placeholder:text-sm duration-300 outline-0 outline-[var(--white-2)] focus:border-[var(--blue-4)] focus:outline-2 focus:outline-[var(--blue-1)]"
                    placeholder="Max 10 characters"
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value.slice(0, 10))
                    }}
                  />
                  <div className="absolute top-0 right-0 h-full aspect-square flex items-center justify-center">
                    <div
                      className={`w-fit h-fit duration-300 ${tagInput.length === 0 ? 'scale-0 opacity-0' : 'opacity-100 hover:opacity-75 active:scale-90'}`}
                      onClick={() => setTagInput('')}
                    >
                      <Close dimension={20} color="#347CE9" />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2.5 text-[var(--blue-2)] bg-[var(--blue-1)] rounded-md"
                  onClick={() => {
                    createTag()
                    setTagInput('')
                  }}
                >Add</button>
              </div>
              <div className="px-1 py-0.25 font-normal text-[11px] text-[var(--black-2)]">{tagInput.length}/10</div>
              <div className="">
                {tags.length === 0 ? (
                  <div className="px-0.75 pt-0.5 italic text-sm text-[var(--black-2)] font-normal">No tags added</div>
                ) : (
                  <div className="mt-1 flex gap-1">
                    {tags.map((tag, _) => {
                      return (
                        <div key={tag.tagId} className="pl-1.75 pr-1 py-0.5 text-sm bg-[var(--blue-1)] rounded-md flex items-center gap-0.5">
                          {tag.tag}
                          <div
                            className="duration-300 hover:opacity-75"
                            onClick={() => removeTag(tag.tagId)}
                          >
                            <Close color="#4C4C4C" dimension={16} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="mt-5 w-full flex items-center justify-end gap-1.75">
            <button
              type="button"
              className=" sm:w-fit h-fit px-3.5 py-1.5 rounded-lg text-[15px] font-normal duration-300 bg-[var(--white-5)] text-[var(--black-5)] hover:opacity-80"
              onClick={() => clearDialog()}
            >
              Cancel
            </button>
            <button
              type="button"
              className=" sm:w-fit h-fit px-3.5 py-1.5 rounded-lg text-[15px] font-normal duration-300 bg-[var(--blue-2)] text-[var(--white-2)] hover:opacity-80"
              onClick={() => submitHandler()}
            >
              {alertContentType === "delete" ? "Delete" : ""}
              {alertContentType === "makePublic" ? "Make Public" : ""}
              {alertContentType === "makePrivate" ? "Make Private" : ""}
              {alertContentType === 'pin' ? "Pin Note" : ""}
              {alertContentType === 'unpin' ? "Unpin Note" : ""}
              {alertContentType === 'addTag' ? "Add Tag" : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert