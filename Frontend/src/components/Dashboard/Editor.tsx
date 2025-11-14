import { EditorContent, useEditor } from "@tiptap/react"
import ToolBox from "./ToolBar"
import StarterKit from "@tiptap/starter-kit"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Delete, Edit, Pin, Plus, Retry, Tick, ViewAll } from "../../assets/Icons"
import { useEffect, useRef, useState } from "react"
import { useFetcher, useParams } from "react-router-dom"
import { EditorFetchAPI, EditorContentSaveAPI, EditorTitleUpdateAPI } from "../../services/user.service"
import type { Content } from "../../types/tiptap.type"
import { useNotificationContext } from "../../contexts/notification.context"

type EditorType = {
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>
  setNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Editor = ({setSideNavOpen, setNewNoteOpen}: EditorType) => {
  
  const { createNotification } = useNotificationContext()
  const { noteId } = useParams()
  
  const [title, setTitle] = useState('')
  const [titleEdit, setTitleEdit] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<-1 | 0 | 1>(1)
  const [fetchingStatus, setFetchingStatus] = useState<-1 | 0 | 1>(0)
  const [content, setContent] = useState<Content>({
    type: "doc",
    content: []
  })
  const controllerRef = useRef<AbortController>(null)
  const timeRef = useRef(0)
  const prevContentRef = useRef<Content | null>(null)
  const firstLoadRef = useRef(true)

  const headingUpdateHandler = async () => {
    try {
      if (!noteId) return
      const res = await EditorTitleUpdateAPI(noteId, title)
      console.log(res.data)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const editorFetch = async () => {
    if(!noteId) {
      setFetchingStatus(1)
      return
    }
    try {
      const res = await EditorFetchAPI(noteId)
      if (!res) {
        createNotification({
          title: "Unable to Load Note",
          message: "Could not fetch this note. Please try again.",
          type: "error"
        })
        return setFetchingStatus(-1)
      }
      console.log(res)
      setTitle(res.title)
      setContent(res.content)
      setFetchingStatus(1)
    } catch (error) {
      createNotification({
        title: "Unable to Load Note",
        message: "Could not fetch this note. Please try again.",
        type: "error"
      })
      setFetchingStatus(-1)
    }
  }

  useEffect(() => {
    editorFetch()
  }, [])

  const autoSave = () => {
    if (timeRef.current) clearTimeout(timeRef.current)
    try {
      if (!noteId) {
        setAutoSaveStatus(-1)
        return
      }

      if (JSON.stringify(prevContentRef.current) === JSON.stringify(content)) return
      prevContentRef.current = content

      setAutoSaveStatus(0)
      timeRef.current = setTimeout(async () => {
        if (controllerRef.current) controllerRef.current.abort()
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        await EditorContentSaveAPI(noteId, content, signal)
        setAutoSaveStatus(1)
      }, 1000)
    } catch (error) {
      setAutoSaveStatus(-1)
    }
  }

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false
      return
    }
    autoSave()
  }, [content])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Subscript,
      Superscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    onUpdate: ({editor}) => {
      const json = editor.getJSON()
      if (JSON.stringify(json) !== JSON.stringify(content)) {
        setContent(json)
      }
    }
  })

  useEffect(() => {
    if (editor && fetchingStatus === 1) {
      editor.commands.setContent(content)
    }
  }, [editor, fetchingStatus])

  const toolkit = {
    undo: () => editor.chain().focus().undo().run(),
    redo: () => editor.chain().focus().redo().run(),
    bold: () => editor.chain().focus().toggleBold().run(),
    italic: () => editor.chain().focus().toggleItalic().run(),
    underline: () => editor.chain().focus().toggleUnderline().run(),
    strikethrough: () => editor.chain().focus().toggleStrike().run(),
    highlight: (color: string = '#FFFF00') => editor.chain().focus().toggleHighlight({ color }).run(),
    setLink: (link: string = '') => editor.chain().focus().extendMarkRange('link').setLink({ href: link }).run(),
    removeLink: () => editor.chain().focus().unsetLink().run(),
    superscript: () => editor.chain().focus().toggleSuperscript().run(),
    subscript: () => editor.chain().focus().toggleSubscript().run(),
    align: (alignment: 'left' | 'center' | 'right' | 'justify') => editor.chain().focus().setTextAlign(alignment).run(),
    heading: (level: 1 | 2 | 3 | 4 | 5 | 6) => editor.chain().focus().toggleHeading({ level }).run(),
    code: () => editor.chain().focus().toggleCode().run(),
    unorderedList: () => editor.chain().focus().toggleBulletList().run(),
    orderedList: () => editor.chain().focus().toggleOrderedList().run(),
    taskList: () => editor.chain().focus().toggleTaskList().run(),
    blockquote: () => editor.chain().focus().toggleBlockquote().run(),
    horizontalRule: () => editor.chain().focus().setHorizontalRule().run(),
    paragraph: () => editor.chain().focus().setParagraph().run(),
    clearMarks: () => editor.chain().focus().unsetAllMarks().run(),
    clearNodes: () => editor.chain().focus().clearNodes().run(),
  }

  return (
    <div className="w-full h-full md:h-screen md:w-[calc(100%-290px)] p-3.5 md:p-5 md:pl-2.5 flex justify-center">
      <div className="w-full h-full flex flex-col items-center gap-0.5">
        <ToolBox 
          setSideNavOpen={setSideNavOpen}
          toolkit={toolkit}
        />
        <div className="w-full h-full md:h-[calc(100%-46px)] bg-[linear-gradient(to_right,var(--white-4)_10%,var(--blue-1)_90%,var(--white-4)_100%)] rounded-xl md:rounded-t-sm md:rounded-b-xl flex items-center justify-center mt-13 mb-10 md:mt-0 md:mb-0">
          <div className="w-full max-w-180 h-full md:min-h-0 bg-[var(--white-1)] rounded-xl md:rounded-sm p-3.5">
            {
              (noteId && fetchingStatus === 1) 
              ? 
              (<div className="w-full h-full overflow-x-hidden overflow-y-auto">
                <div className="w-full flex flex-wrap gap-3.5 justify-between">
                  <div className="w-full sm:w-fit max-w-full">
                    <div className={`w-full sm:w-fit rounded-full max-w-full flex sm:flex-row-reverse items-center gap-2.5 duration-300 ${titleEdit ? 'bg-[var(--white-3)] p-2 md:p-1.75' : 'bg-transparent border-transparent'}`}>
                      <input 
                        name="heading" 
                        type="text" 
                        className={`block w-[calc(100%-38px)] sm:w-fit max-w-[calc(100%-38px)] overflow-auto text-nowrap truncate outline-none duration-300 ${titleEdit ? 'text-lg md:text-xl px-1' : 'text-xl md:text-2xl'}`}  
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        disabled={!titleEdit}
                        autoComplete="off"
                      />
                      <div className="flex">
                        <div 
                          className={`bg-[var(--white-3)] p-1.5 rounded-full hover:scale-90 active:scale-90 duration-150 ${titleEdit ? 'hidden' : ''}`} 
                          onClick={() => setTitleEdit(true)}
                        >
                          <Edit dimension={16} color="#1b63ce" />
                        </div>
                        <div 
                          className={`bg-[var(--blue-2)] p-0.5 rounded-full hover:scale-90 active:scale-90 duration-150 ${titleEdit ? '' : 'hidden'}`} 
                          onClick={() => {
                            headingUpdateHandler()
                            setTitleEdit(false)
                          }}
                        >
                          <Tick dimension={24} color="#fff" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-[var(--blue-2)]"></div>
                      <div className="text-xs text-[var(--black-2)] text-nowrap truncate">Last updated at Oct 28, 2025 00:25</div>
                    </div>
                  </div>
                  <div className="w-full sm:w-fit flex justify-between gap-2.5 md:flex-col">
                    <div className="w-fit md:w-full flex justify-end gap-1.5">
                      <button className="group h-fit p-1 bg-[var(--blue-1)] rounded-full flex items-center">
                        <div className="group-hover:scale-90 group-active:scale-90 duration-300 p-1 rounded-full bg-[var(--blue-2)]">
                          <Pin dimension={14} />
                        </div>
                        <span className="px-1.5 text-xs text-[var(--blue-2)] font-[500]">Pin</span>
                      </button>
                      <button className="group h-fit p-1 bg-[var(--red-3)] rounded-full flex items-center">
                        <div className="group-hover:scale-90 group-active:scale-90 duration-300 p-1 rounded-full bg-[var(--red-4)]">
                          <Delete dimension={14} color="#ffe3e3" />
                        </div>
                        <span className="px-1.5 text-xs text-[var(--red-4)] font-[500]">Delete</span>
                      </button>
                    </div>
                    <div className="w-fit min-w-12 md:w-full max-w-full mt-1.5 truncate overflow-hidden text-xs text-[var(--black-2)] text-right">
                      {autoSaveStatus === -1 && ('Error saving note')}
                      {autoSaveStatus === 0 && ('Saving...')}
                      {autoSaveStatus === 1 && ('Saved')}
                    </div>
                  </div>
                </div>
                <div className="w-full h-0.5 rounded-full bg-[var(--blue-1)] my-2.5"></div>
                <div className="w-full md:h-[calc(100%-76px)] px-1">
                  <EditorContent className="w-full h-full" editor={editor} />
                </div>
              </div>)
              :
              (<div className="w-full h-full min-h-100 flex items-center justify-center">
                <div className="w-full max-w-150 p-2 sm:p-5 text-[var(--black-2)] flex flex-col gap-5">
                  <div className="text-[22px] sm:text-2xl font-normal">
                    {
                      !noteId
                        ? "Your workspace is empty"
                        : fetchingStatus === 0
                        ? "Loading workspace ..."
                        : fetchingStatus === -1
                        ? "Failed to load workspace"
                        : ""
                    }
                  </div>
                  <div className="text-sm sm:text-[15px]">
                    <div>
                      {
                        !noteId
                          ? "You don't have any note open right now."
                          : fetchingStatus === 0
                          ? "We're fetching your notes right now."
                          : fetchingStatus === -1
                          ? "Something went wrong while fetching your notes."
                          : ""
                      }
                    </div>
                    <div className="mt-1">
                      {
                        !noteId
                          ? "Choose one from your list or create a new note to begin."
                          : fetchingStatus === 0
                          ? "Please wait a moment."
                          : fetchingStatus === -1
                          ? "Please try again in a moment."
                          : ""
                      }
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {
                      fetchingStatus === -1 ? (
                        <button
                          className="w-fit flex items-center gap-1.25 duration-150 hover:opacity-80 active:opacity-60 select-none"
                          onClick={() => editorFetch()}
                        >
                          <div className="pl-0.75">
                            <Retry dimension={16} color="#347CE9" />
                          </div>
                          <span className="text-[var(--blue-2)] font-normal">Retry</span>
                        </button>
                      ) : (
                        <button
                          className="w-fit flex items-center gap-0.5 duration-150 hover:opacity-80 active:opacity-60 select-none"
                          onClick={() => setNewNoteOpen(true)}
                        >
                          <Plus dimension={22} color="#347CE9" />
                          <span className="text-[var(--blue-2)] font-normal">New Note</span>
                        </button>
                      )
                    }
                    <button
                      className="flex items-center gap-1.25 duration-150 hover:opacity-80 active:opacity-60 select-none"
                    >
                      <div className="pl-0.75">
                        <ViewAll dimension={16} color="#347CE9" />
                      </div>
                      <span className="text-[var(--blue-2)] font-normal">View All</span>
                    </button>
                  </div>
                </div>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor