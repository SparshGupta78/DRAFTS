import { EditorContent, useEditor } from "@tiptap/react"
import ToolBox from "./ToolBar"
import StarterKit from "@tiptap/starter-kit"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Close, Edit, Plus, Retry, ThreeDots, Tick, ViewAll } from "../../assets/Icons"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import useUserAPI from "../../services/user.service"
import type { Content } from "../../types/tiptap.type"
import type { TagType } from "../../types/tag.type"
import { useNotificationContext } from "../../contexts/notification.context"
import type { UserType } from "../../types/user.type"
import DropDown from "../DropDown/DropDown"
import DropDownItem from "../DropDown/DropDownItem"
import Alert from "./Alert"
import type { AlertContentType } from "../../types/alertContent.type"
import { usePreferencesContext } from "../../contexts/preferences.context"
import { useWindowWidthContext } from "../../contexts/windowWidth.context"

type props = {
  loggedUser: UserType | undefined,
  sideNavOpen: boolean,
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>
  setNewNoteOpen: React.Dispatch<React.SetStateAction<boolean>>
  editorFetch: (noteId: string) => Promise<void>
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  content: (Content | null),
  setContent: React.Dispatch<React.SetStateAction<Content>>,
  fetchingStatus: -1 | 0 | 1,
  isUserDashboard: boolean,
  tags: TagType[],
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>,
  visibility: 'public' | 'private',
  createdAt: string,
  updatedAt: string,
  setAllNotesOpen: React.Dispatch<React.SetStateAction<boolean>>,
  notesFetch: () => Promise<void>,
  fetchNotesTitle: () => Promise<void>
}

type editorOptionsType = {
  option: string,
  tag: AlertContentType
}

const Editor = ({
  loggedUser,
  sideNavOpen,
  setSideNavOpen,
  setNewNoteOpen,
  editorFetch,
  title,
  setTitle,
  content,
  setContent,
  fetchingStatus,
  isUserDashboard,
  tags,
  setTags,
  visibility,
  createdAt,
  updatedAt,
  setAllNotesOpen,
  notesFetch,
  fetchNotesTitle
}: props) => {

  const { AddTagAPI, DeleteNoteAPI, DeleteTagAPI, EditorContentSaveAPI, EditorTitleUpdateAPI, ToggleVisibilityStatusAPI } = useUserAPI()

  const { createNotification } = useNotificationContext()

  const { username, noteId } = useParams()

  const { preferences } = usePreferencesContext()

  const windowWidth = useWindowWidthContext()

  const [titleEdit, setTitleEdit] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<-1 | 0 | 1>(1)
  const [initialLoad, setInitialLoad] = useState(true)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertContentType, setAlertContentType] = useState<AlertContentType>('delete')

  const controllerRef = useRef<AbortController | null>(null)
  const timeRef = useRef<number | null>(0)
  const prevContentRef = useRef<Content | null>(null)

  const editorOptions: editorOptionsType[] = [
    {option: "Delete note", tag: "delete"},
    {option: "Pin note", tag: 'pin'},
    {option: `Make note ${visibility === 'private' ? 'public' : 'private'}`, tag: (visibility === 'private' ? 'makePublic' : 'makePrivate')},
    {option: "Add tag", tag: 'addTag'}
  ]

  const update = updatedAt.length > 0 ? updatedAt.split('T')[0].split('-') : []
  const month = update.length > 0 ? new Date(0, Number(update[1])).toLocaleString('en-US', {month: 'long'}) : ''
  const formattedUpdatedAt = update.length > 0 ? month + ' ' + update[2] + ', ' + update[0] : null

  const headingUpdateHandler = async () => {
    if (!noteId) return
    await EditorTitleUpdateAPI(noteId, title)
  }

  const save = async () => {
    console.log('saved function called')
    if (!noteId) {
      setAutoSaveStatus(-1)
      return
    }
    setAutoSaveStatus(0)
      if (controllerRef.current) controllerRef.current.abort()
      controllerRef.current = new AbortController()
      const signal = controllerRef.current.signal
      prevContentRef.current = content
      const status = await EditorContentSaveAPI(noteId, content, signal, prevContentRef)
      setAutoSaveStatus(status)
  }

  const autoSave = () => {
    if (timeRef.current) clearTimeout(timeRef.current)
    try {
      if (!noteId) {
        setAutoSaveStatus(-1)
        return
      }

      if (prevContentRef.current && JSON.stringify(prevContentRef.current) === JSON.stringify(content)) return

      const autoSaveInterval = ((preferences && preferences.editor.autosaveInterval * 1000)) ?? 2500

      timeRef.current = setTimeout(async () => {
        save()
      }, autoSaveInterval)
    } catch (error) {
      setAutoSaveStatus(-1)
    }
  }

  const deleteNote = async () => {
    if (!username || !noteId) return
    await DeleteNoteAPI(username, noteId, fetchNotesTitle)
  }

  const toggleVisibilityStatus = async () => {
    if (!username || !noteId) return
    const response = await ToggleVisibilityStatusAPI(username, noteId, (visibility === 'private' ? 'public' : 'private'))
    if (response && response !== visibility) {
      visibility = response
      editorFetch(noteId)
    }
  }

  const addTag = async (newTags: TagType[]) => {
    if (!newTags || !username || !noteId) return
    if (tags.length >= 5) {
      createNotification({
        title: "Tag Limit Exceeded",
        message: "A note can have up to 5 tags only.",
        type: "default"
      })
      return
    }
    const resTags = await AddTagAPI(username, noteId, newTags)
    if(resTags) {
      setTags(resTags)
      editorFetch(noteId)
    }
  }

  const deleteTag = async (tagId: string) => {
    if (!username || !noteId) return
    await DeleteTagAPI(username, noteId, tagId, editorFetch)
  }

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
      if (JSON.stringify(prevContentRef.current) !== JSON.stringify(json)) {
        setContent(json)
      }
    }
  })

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

  useEffect(() => {
    if (editor) {
      editor.setEditable(isUserDashboard)
    }
  }, [isUserDashboard, editor])

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false)
      return
    }
    if (preferences && preferences.editor.autosave && content) autoSave()
  }, [content])

  useEffect(() => {
    if (editor && fetchingStatus === 1 && content) {
      editor.commands.setContent(content)
      prevContentRef.current = content
    }
  }, [editor, fetchingStatus, content])

  useEffect(() => {
    if (username && noteId) editorFetch(noteId)
  }, [username, noteId])

  return (
    <div className={`w-full h-full md:h-screen p-3.5 md:p-5 flex justify-center duration-300 ${preferences && preferences.settings.appearance.sidebar.position === 'Right' ? 'md:pr-2.5' : 'md:pl-2.5'} ${(preferences && !preferences.settings.appearance.sidebar.visible && !sideNavOpen) ? `md:w-[calc(100%-30px)] ${preferences && preferences.settings.appearance.sidebar.position === 'Right' ? 'md:translate-x-2.5' : 'md:-translate-x-2.5'}` : 'md:w-[calc(100%-290px)]'}`}>
      <Alert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        alertContentType={alertContentType}
        deleteNote={deleteNote}
        toggleVisibilityStatus={toggleVisibilityStatus}
        addTag={addTag}
        currentTags={tags}
      />
      <div className="w-full h-full flex flex-col items-center gap-0.75">
        <ToolBox
          setSideNavOpen={setSideNavOpen}
          toolkit={toolkit}
          isUserDashboard={isUserDashboard}
          save={save}
        />
        <div className="w-full h-full md:h-[calc(100%-43.6px)] bg-[linear-gradient(to_right,var(--white-4)_10%,var(--blue-1)_90%,var(--white-4)_100%)] rounded-t-xl md:rounded-t-sm rounded-b-xl flex items-center justify-center mb-10 md:mb-0 overflow-hidden">
          <div className={`w-full h-full md:min-h-0 bg-[var(--white-1)] rounded-sm p-3.5 ${(preferences && preferences.editor.editorWidth === 'Full') ? '' : 'max-w-180'}`}>
            {
              (noteId && fetchingStatus === 1) 
              ? 
              (<div className="w-full h-full overflow-x-hidden overflow-y-scroll">
                <div className="w-full">
                  <div className="w-full flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className={`w-full sm:w-fit max-w-full rounded-full flex sm:flex-row-reverse items-center gap-2.5 duration-300 ${titleEdit ? 'bg-[var(--white-3)] p-2 md:p-1.75' : 'bg-transparent border-transparent'}`}>
                      <input 
                        name="heading" 
                        type="text" 
                        className={`block sm:w-fit overflow-auto text-nowrap truncate outline-none duration-300 ${titleEdit ? 'text-lg md:text-xl px-1' : 'text-xl md:text-2xl'} ${username === loggedUser?.username ? 'w-[calc(100%-38px)] max-w-[calc(100%-38px)]' : 'w-full max-w-full'}`}
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        disabled={!titleEdit}
                        autoComplete="off"
                      />
                      {username === loggedUser?.username ? (
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
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="w-full sm:w-fit flex items-center justify-between sm:justify-start gap-1.5">
                      {visibility && <div className="text-sm text-[var(--black-2)] font-normal px-2.5 py-1 rounded-full border-2 border-[var(--black-6)] h-fit w-fit capitalize">
                        {visibility}
                      </div>}
                      {isUserDashboard && (
                        <DropDown
                          trigger={
                            <button className="group h-fit aspect-square border-2 border-[var(--white-3)] rounded-full flex items-center">
                              <div className="group-hover:scale-95 group-active:scale-85 duration-300 p-1 rounded-full bg-[var(--blue-1)]">
                                <ThreeDots dimension={20} color="#347CE9" />
                              </div>
                            </button>
                          }
                          preStyle={false}
                          contentStyle="p-0.75 bg-[var(--black-6)] rounded-lg flex flex-col gap-0.75"
                          align={'right'}
                        >
                          {editorOptions && editorOptions.map((item, i) => {
                            return (
                              <DropDownItem
                              key={item.tag}
                              setValue={() => {}}
                              data={item.tag}
                              preStyle={false}
                              className={`bg-[var(--black-4)] text-sm text-nowrap px-2.25 py-1 text-[var(--black-3)] cursor-default duration-200 font-normal hover:opacity-75 active:scale-97 ${i == 0 ? 'rounded-t-md rounded-b-[2px]' : ''} ${i != 0 && i != (editorOptions.length - 1) ? 'rounded-[2px]' : ''} ${i == (editorOptions.length - 1) ? 'rounded-b-md rounded-t-[2px]' : ''}`}
                              onClick={() => {
                                setAlertContentType(item.tag)
                                setAlertOpen(true)
                              }}
                            >
                              {item.option}
                            </DropDownItem>
                            )
                          })}
                        </DropDown>
                      )}
                    </div>
                  </div>
                  <div className="mt-2.5 w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-1.5">
                    <div className="w-full sm:max-w-[352px] relative">
                      <div className="absolute left-0 top-0 w-1.5 h-6 bg-gradient-to-r from-[var(--white-1)] to-transparent"></div>
                      <div className="px-1.5 w-full flex items-center gap-1.25 overflow-x-auto overflow-y-hidden">
                        {
                          tags.length > 0
                          ?
                          (
                            tags.map((tag, _) => {
                              return (
                                <div key={tag.tagId} className={`flex items-center gap-1 pl-2.25 py-0.5 bg-[var(--blue-1)] rounded-full ${isUserDashboard ? 'pr-1.5' : 'pr-2.5'}`}>
                                  <span className="text-sm text-[var(--blue-2)] text-nowrap w-fit max-w-22 truncate">{tag.tag}</span>
                                  {isUserDashboard && (
                                    <div
                                      className="h-fit w-fit hover:opacity-65 active:opacity-50 duration-300"
                                      onClick={() => deleteTag(tag.tagId)}
                                    >
                                      <Close dimension={14} color="#1b63ce" />
                                    </div>
                                  )}
                                </div>
                              )
                            })
                          )
                          :
                          <span className="text-xs italic text-[var(--black-2)]">No tags added</span>
                        }
                      </div>
                      <div className="absolute right-0 top-0 w-1.5 h-6 bg-gradient-to-r from-transparent to-[var(--white-1)]"></div>
                    </div>
                    <div className="w-full sm:w-fit flex items-center justify-between sm:justify-start gap-1.5">
                      <div className="text-xs text-[var(--black-2)] text-nowrap truncate">
                        {formattedUpdatedAt ? `${formattedUpdatedAt}` : ''}
                      </div>
                      <div className="h-3.5 w-0.5 bg-[var(--black-1)] rounded-full hidden sm:block"></div>
                      <div className="w-fit max-w-full truncate overflow-hidden text-xs text-[var(--black-2)]">
                        {autoSaveStatus === -1 && ('Error saving note')}
                        {autoSaveStatus === 0 && ('Saving...')}
                        {autoSaveStatus === 1 && ('Saved')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-0.5 rounded-full bg-[var(--blue-1)] my-2.5"></div>
                <div className={`w-full px-1 ${titleEdit ? 'md:h-[calc(100%-88px)]' : 'md:h-[calc(100%-98px)]'}`}>
                  <EditorContent className="w-full h-full" editor={editor} spellCheck={(preferences && !preferences.editor.spellCheck) ? false : true} />
                </div>
              </div>)
              :
              (<div className="w-full h-full min-h-100 flex items-center justify-center">
                <div className="w-full max-w-150 p-2 sm:p-5 text-[var(--black-2)] flex flex-col gap-5">
                  <div className="text-[22px] sm:text-2xl font-normal">
                    {
                      !noteId
                        ? isUserDashboard ? "Your workspace is empty" : "Workspace is empty"
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
                          ? "Fetching the notes right now."
                          : fetchingStatus === -1
                          ? "Something went wrong while fetching the notes."
                          : ""
                      }
                    </div>
                    <div className="mt-1">
                      {
                        !noteId
                          ? isUserDashboard ? "Choose one from your list or create a new note to begin." : "Select a note from the list to continue."
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
                          onClick={() => {
                            if (noteId) editorFetch(noteId)
                          }}
                        >
                          <div className="pl-0.75">
                            <Retry dimension={16} color="#347CE9" />
                          </div>
                          <span className="text-[var(--blue-2)] font-normal">Retry</span>
                        </button>
                      ) : (
                        isUserDashboard && (
                          <button
                            className="w-fit flex items-center gap-0.5 duration-150 hover:opacity-80 active:opacity-60 select-none"
                            onClick={() => setNewNoteOpen(true)}
                          >
                            <Plus dimension={22} color="#347CE9" />
                            <span className="text-[var(--blue-2)] font-normal">New Note</span>
                          </button>
                        )
                      )
                    }
                    <button
                      className="flex items-center gap-1.25 duration-150 hover:opacity-80 active:opacity-60 select-none w-fit"
                      onClick={() => {
                        if (windowWidth < 768) setSideNavOpen(false)
                        setAllNotesOpen(true)
                        notesFetch()
                      }}
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