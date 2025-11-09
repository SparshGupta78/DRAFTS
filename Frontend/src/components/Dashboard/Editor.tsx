import { EditorContent, useEditor } from "@tiptap/react"
import ToolBox from "./ToolBar"
import StarterKit from "@tiptap/starter-kit"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Delete, Edit, Pin, Tick } from "../../assets/Icons"
import { useState } from "react"

type EditorType = {
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Editor = ({setSideNavOpen}: EditorType) => {

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
    content: '',
    onUpdate: ({editor}) => {
      // console.log(editor.getJSON())
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

  const [headingEdit, setHeadingEdit] = useState(false)
  const [heading, setHeading] = useState('Untitled Note 4')

  return (
    <div className="w-full h-full md:h-screen md:w-[calc(100%-290px)] p-3.5 md:p-5 md:pl-2.5 flex justify-center">
      <div className="w-full h-full flex flex-col items-center gap-0.5">


        <ToolBox setSideNavOpen={setSideNavOpen} toolkit={toolkit} />


        <div className="w-full h-full md:h-[calc(100%-46px)] bg-[linear-gradient(to_right,var(--white-4)_10%,var(--blue-1)_90%,var(--white-4)_100%)] rounded-xl md:rounded-t-sm md:rounded-b-xl flex items-center justify-center mt-13 mb-10 md:mt-0 md:mb-0">
          <div className="w-full max-w-180 h-full md:min-h-0 bg-[var(--white-1)] rounded-xl md:rounded-sm p-3.5">
            <div className="w-full h-full overflow-x-hidden overflow-y-auto">
              <div className="w-full flex flex-wrap gap-3.5 justify-between">
                <div className="w-full sm:w-fit max-w-full">
                  <div className={`w-full sm:w-fit rounded-full max-w-full flex sm:flex-row-reverse items-center gap-2.5 duration-300 ${headingEdit ? 'bg-[var(--white-3)] p-2 md:p-1.75' : 'border-transparent'}`}>
                    <input 
                      name="heading" 
                      type="text" 
                      className={`block w-[calc(100%-38px)] sm:w-fit max-w-[calc(100%-38px)] overflow-auto text-nowrap truncate outline-none duration-300 ${headingEdit ? 'text-lg md:text-xl px-1' : 'text-xl md:text-2xl'}`}  
                      value={heading}
                      onChange={e => setHeading(e.target.value)} 
                      disabled={!headingEdit}
                    />
                    <div className="flex">
                      <div 
                        className={`bg-[var(--white-3)] p-1.5 rounded-full hover:scale-90 active:scale-90 duration-150 ${headingEdit ? 'hidden' : ''}`} 
                        onClick={() => setHeadingEdit(true)}
                      >
                        <Edit dimension={16} color="#1b63ce" />
                      </div>
                      <div 
                        className={`bg-[var(--blue-2)] p-0.5 rounded-full hover:scale-90 active:scale-90 duration-150 ${headingEdit ? '' : 'hidden'}`} 
                        onClick={() => setHeadingEdit(false)}
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
                <div className="w-full sm:w-fit flex justify-end gap-1.5">
                  <button className="group h-fit p-1 bg-[var(--blue-1)] rounded-full flex items-center">
                    <div className="group-hover:scale-90 group-active:scale-90 duration-300 p-1 rounded-full bg-[var(--blue-2)]">
                      <Pin dimension={14} />
                    </div>
                    <span className="px-1.5 text-xs text-[var(--blue-2)] font-[500]">Pin</span>
                  </button>
                  <button className="group h-fit p-1 bg-[var(--red-3)] rounded-full flex items-center">
                    <div className="group-hover:scale-90 group-active:scale-90 duration-300 p-1 rounded-full bg-[var(--red-4)]">
                      <Delete dimension={14} />
                    </div>
                    <span className="px-1.5 text-xs text-[var(--red-4)] font-[500]">Delete</span>
                  </button>
                </div>
              </div>
              <div className="w-full h-0.5 rounded-full bg-[var(--blue-1)] my-2.5"></div>
              <div className="w-full md:h-[calc(100%-76px)] px-1">
                <EditorContent className="w-full h-full" editor={editor} />
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Editor