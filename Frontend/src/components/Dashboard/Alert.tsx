import { useEffect, useRef, useState, type JSX } from "react"
import { Close } from "../../assets/Icons"
import type { AlertContentType } from "../../types/alertContent.type"

type props = {
  alertOpen: boolean,
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
  alertContentType: AlertContentType
}

const Alert = ({alertOpen, setAlertOpen, alertContentType}: props) => {

  const [currentAlertContent, setCurrentAlertContent] = useState<JSX.Element>()

  const dialogRef = useRef(null)

  const outsideClickHandler = (e :React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dialogRef.current && !(dialogRef.current as HTMLElement).contains(e.target as Node)) {
      setAlertOpen(false)
    }
  }

  const alertContent = (type: AlertContentType) => {
    return (
      <>
        <div className="px-0.75 w-full font-normal">
          {type === 'delete' ? "Are you sure you want to delete this note?" : ""}
          {type === 'makePublic' ? "Are you sure you want to make this note public?" : ""}
          {type === 'makePrivate' ? "Are you sure you want to make this note private?" : ""}
          {type === 'pin' ? "Pin this note?" : ""}
          {type === 'unpin' ? "Unpin this note?" : ""}
          {type === 'addTag' ? "Add a new tag to this note?" : ""}
        </div>
        <div className="px-0.75 mt-0.5 w-full font-normal text-[var(--black-2)] text-sm">
          {type === 'delete' ? "This action cannot be undone." : ""}
          {type === 'makePublic' ? "Anyone with the link will be able to view this note." : ""}
          {type === 'makePrivate' ? "Only you will be able to access this note after this change." : ""}
          {type === 'pin' ? "This note will stay at the top of your notes list." : ""}
          {type === 'unpin' ? "This note will return to its original position in the list." : ""}
          {type === 'addTag' ? "This will make the note easier to categorize and access later." : ""}
        </div>
        <div className="mt-5 w-full flex items-center justify-end gap-1.75">
          <button
            type="button"
            className=" sm:w-fit h-fit px-3.5 py-1.5 rounded-lg text-[15px] font-normal duration-300 bg-[var(--white-5)] text-[var(--black-5)] hover:opacity-80"
          >
            Cancel
          </button>
          <button
            type="button"
            className=" sm:w-fit h-fit px-3.5 py-1.5 rounded-lg text-[15px] font-normal duration-300 bg-[var(--black-3)] text-[var(--white-2)] hover:opacity-80"
          >
            {type === "delete" ? "Delete" : ""}
            {type === "makePublic" ? "Make Public" : ""}
            {type === "makePrivate" ? "Make Private" : ""}
            {type === 'pin' ? "Pin Note" : ""}
            {type === 'unpin' ? "Unpin Note" : ""}
            {type === 'addTag' ? "Add Tag" : ""}
          </button>
        </div>
      </>
    )
  }

  useEffect(() => {
    setCurrentAlertContent(alertContent(alertContentType))
  }, [alertContentType])

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
          <div className="pl-0.25 font-normal">Delete Note</div>
          <button
            className="duration-150 hover:opacity-70 active:opacity-60"
            onClick={() => setAlertOpen(false)}
          >
            <Close />
          </button>
        </div>
        <div className="p-2.5 bg-[var(--white-2)] rounded-b-xl">
          {currentAlertContent}
        </div>
      </div>
    </div>
  )
}

export default Alert