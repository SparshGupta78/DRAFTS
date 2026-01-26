import { useEffect, useRef, useState } from "react"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Blockquote, Bold, Code, Highlighter, Italic, Link, Redo, Strikethrough, Subscript, Superscript, Underline, Undo, UnorderedList, HorizontalRule, Paragraph, ClearMarks, ClearNodes, Unlink, ScrollDown, Save, H1, H2, H3, H4, H5, H6, OrderedList, TaskList } from "../../assets/Icons";
import { usePreferencesContext } from "../../contexts/preferences.context";
import { useWindowWidthContext } from "../../contexts/windowWidth.context";
import DropDown from "../DropDown/DropDown";
import { useParams } from "react-router-dom";


type props = {
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>,
  toolkit: {
    undo: () => boolean;
    redo: () => boolean;
    bold: () => boolean;
    italic: () => boolean;
    underline: () => boolean;
    subscript: () => boolean;
    superscript: () => boolean;
    strikethrough: () => boolean;
    code: () => boolean;
    paragraph: () => boolean;
    blockquote: () => boolean;
    horizontalRule: () => boolean;
    unorderedList: () => boolean;
    orderedList: () => boolean;
    taskList: () => boolean;
    clearMarks: () => boolean;
    clearNodes: () => boolean;
    removeLink: () => boolean;
    highlight: (color?: string) => boolean;
    align: (alignment: "left" | "center" | "right" | "justify") => boolean;
    heading: (level: 1 | 2 | 3 | 4 | 5 | 6) => boolean;
    setLink: (link?: string) => boolean;
  },
  isUserDashboard: boolean
}

const ToolBox = ({setSideNavOpen, toolkit, isUserDashboard}: props) => {

  const { noteId } = useParams()

  const { preferences } = usePreferencesContext()

  const windowWidth = useWindowWidthContext()
  
  const [toolbarOpen, setToolbarOpen] = useState(false)
  const [link, setLink] = useState('')
  const [toolbarCount, setToolbarCount] = useState(0)
  const [toolbarCountMax, setToolbarCountMax] = useState(1)
  const [toolbarDisable, setToolbarDisable] = useState(true)
  const [toolbarHide, setToolbarHide] = useState(false)

  const toolbarRef = useRef(null)

  const toolbarPosition = () => {
    if(!toolbarRef.current) return
    setToolbarCount(0)
    setToolbarCountMax(Math.floor(Number.parseFloat(getComputedStyle(toolbarRef.current).height) / 28))
  }

  useEffect(() => {
    if(!toolbarRef.current) return
    toolbarPosition()
    setToolbarCount(0)
    const resizeObserver = new ResizeObserver(() => {
      toolbarPosition()
    })
    resizeObserver.observe(toolbarRef.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if(isUserDashboard && noteId) {
      setToolbarDisable(false)
      setToolbarHide(false)
    }
    else {
      setToolbarDisable(true)
      setToolbarHide(true)
    }
  }, [isUserDashboard, noteId])

  useEffect(() => {
    if (windowWidth > 768) setToolbarOpen(true)
    else setToolbarOpen(false)
  }, [windowWidth])

  return (
    <div className="sticky top-3.5 md:relative md:top-0 w-full h-fit flex justify-between z-1">
      {(preferences && !preferences.settings.appearance.sidebar.visible || windowWidth < 768) && (
        <div className="bg-[var(--white-3)] h-10 aspect-square rounded-r-sm rounded-tl-xl rounded-bl-xl md:rounded-bl-sm overflow-clip duration-300 hover:scale-94 active:scale-80">
          <button
            type="button"
            className="h-full aspect-square grid place-items-center"
            onClick={() => setSideNavOpen(prev => !prev)}
          >
            <div className="w-7 h-fit flex flex-col items-center justify-center gap-1.25">
              <div className="w-80/100 h-0.5 rounded-sm bg-[var(--black-3)]"></div>
              <div className="w-60/100 h-0.5 rounded-sm bg-[var(--black-1)]"></div>
            </div>
          </button>
        </div>
      )}
      <div className={`relative bg-[var(--white-3)] h-full w-full flex items-center gap-1.5 rounded-sm p-1.5 ${(preferences && !preferences.settings.appearance.sidebar.visible || windowWidth < 768) ? 'ml-0.75' : 'rounded-tl-xl'} ${preferences && !preferences.editor.autosave ? 'mr-0.75' : 'rounded-r-xl md:rounded-br-sm rounded-tr-xl'}`}>
        {!toolbarHide && (
          <>
            <div className="px-2 py-1.25 flex justify-center items-center gap-1.5">
              <button
                className=""
                onClick={() => toolkit.undo()}
                disabled={toolbarDisable}
              >
                <Undo dimension={18} />
              </button>
              <button
                className=""
                onClick={() => toolkit.redo()}
                disabled={toolbarDisable}
              >
                <Redo dimension={18} />
              </button>
            </div>
            <div className="w-full max-w-full h-7 overflow-hidden">
              <div
                className="w-fit flex flex-wrap items-center gap-1.5 duration-300 ease-out"
                style={{transform: `translateY(calc(${toolbarCount * -1}*34px))`}}
                ref={toolbarRef}
              >
                <div className="max-w-40 px-2 py-1 flex justify-center items-center gap-1.5 bg-[var(--white-1)] rounded-full grow">
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.bold()}
                    disabled={toolbarDisable}
                  >
                    <Bold dimension={20} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.italic()}
                    disabled={toolbarDisable}
                  >
                    <Italic dimension={20} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.underline()}
                    disabled={toolbarDisable}
                  >
                    <Underline dimension={20} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.strikethrough()}
                    disabled={toolbarDisable}
                  >
                    <Strikethrough dimension={20} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.highlight()}
                    disabled={toolbarDisable}
                  >
                    <div className="-translate-y-0.25 scale-75">
                      <Highlighter dimension={20} />
                    </div>
                  </button>
                  {/* <DropDown
                    trigger={
                      <button
                        className="h-full flex items-center"
                        disabled={toolbarDisable}
                      >
                        <Link dimension={20} />
                      </button>
                    }
                    disabled={toolbarDisable}
                    preStyle={false}
                  >
                    <div className="p-1.5 min-w-55 w-fit bg-[var(--white-3)] rounded-lg shadow-[var(--shadow-1)] flex items-center gap-1.5">
                      <input
                        type="text"
                        className="px-2.5 py-1 bg-[var(--white-2)] text-sm w-full rounded-md border-1 duration-100 border-[var(--black-4)] outline-0 outline-[var(--black-4)] hover:outline-2 active:outline-2 focus:outline-3 focus:border-[var(--black-1)]"
                        name=""
                        placeholder="Enter link..."
                        value={link}
                        onChange={e => setLink(e.target.value)}
                      />
                      <button
                        type="button"
                        className="h-full aspect-square p-1"
                        onClick={() => toolkit.setLink('https://github.com/SparshGupta78')}
                        disabled={toolbarDisable}
                      >
                        <Link dimension={windowWidth > 425 ? 20 : 24} />
                      </button>
                      <button
                        type="button"
                        className="h-full aspect-square p-1"
                        onClick={() => toolkit.removeLink()}
                        disabled={toolbarDisable}
                      >
                        <Unlink dimension={windowWidth > 425 ? 20 : 24} />
                      </button>
                    </div>
                  </DropDown> */}
                </div>
                <div className="px-2 py-1 flex justify-center items-center gap-1.5 bg-[var(--white-1)] rounded-full">
                  <button
                    className="h-full flex items-center"
                    disabled={toolbarDisable}
                  >
                    <Link dimension={20} />
                  </button>
                </div>
                <div className="max-w-20 px-2 py-1 flex justify-center items-center gap-1.5 bg-[var(--white-1)] rounded-full grow">
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.superscript()}
                    disabled={toolbarDisable}
                  >
                    <Superscript dimension={20} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.subscript()}
                    disabled={toolbarDisable}
                  >
                    <Subscript dimension={20} />
                  </button>
                </div>
                <div className="max-w-36 px-2 py-1 flex justify-center items-center gap-1.5 bg-[var(--white-1)] rounded-full grow">
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.align('left')}
                    disabled={toolbarDisable}
                  >
                    <AlignLeft dimension={20} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.align('center')}
                    disabled={toolbarDisable}
                  >
                    <AlignCenter dimension={20} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.align('right')}
                    disabled={toolbarDisable}
                  >
                    <AlignRight dimension={20} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.align('justify')}
                    disabled={toolbarDisable}
                  >
                    <AlignJustify dimension={20} />
                  </button>
                </div>
                <div className="max-w-50 px-2 py-0.75 flex justify-center items-center gap-1.5 bg-[var(--white-1)] rounded-full grow">
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.heading(1)}
                    disabled={toolbarDisable}
                  >
                    <H1 dimension={22} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.heading(2)}
                    disabled={toolbarDisable}
                  >
                    <H2 dimension={22} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.heading(3)}
                    disabled={toolbarDisable}
                  >
                    <H3 dimension={22} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.heading(4)}
                    disabled={toolbarDisable}
                  >
                    <H4 dimension={22} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.heading(5)}
                    disabled={toolbarDisable}
                  >
                    <H5 dimension={22} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.heading(6)}
                    disabled={toolbarDisable}
                  >
                    <H6 dimension={22} />
                  </button>
                </div>
                <button
                  className="max-w-20 pl-1.5 pr-2 py-1 flex justify-center items-center gap-1 bg-[var(--white-1)] rounded-full grow group duration-300 active:scale-94"
                  onClick={() => toolkit.code()}
                  disabled={toolbarDisable}
                >
                  <div className="group-hover:opacity-75 duration-300">
                    <Code dimension={20} />
                  </div>
                  <div className="group-hover:opacity-75 duration-300 text-sm md:text-xs text-nowrap">
                    Code
                  </div>
                </button>
                <div className="max-w-26 px-2 py-1.25 flex justify-center items-center gap-1.5 bg-[var(--white-1)] rounded-full grow">
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.orderedList()}
                    disabled={toolbarDisable}
                  >
                    <OrderedList dimension={18} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60 rotate-180"
                    onClick={() => toolkit.unorderedList()}
                    disabled={toolbarDisable}
                  >
                    <UnorderedList dimension={18} />
                  </button>
                  <button
                    className="duration-300 hover:opacity-70 active:opacity-60"
                    onClick={() => toolkit.taskList()}
                    disabled={toolbarDisable}
                  >
                    <TaskList dimension={18} />
                  </button>
                </div>
                <button
                  className="max-w-28 pl-1.5 pr-2 py-1 flex justify-center items-center gap-1 bg-[var(--white-1)] rounded-full grow group duration-300 active:scale-94"
                  onClick={() => toolkit.blockquote()}
                  disabled={toolbarDisable}
                >
                  <div className="group-hover:opacity-75 duration-300">
                    <Blockquote dimension={20} />
                  </div>
                  <div className="group-hover:opacity-75 duration-300 text-sm md:text-xs text-nowrap">
                    Blockquote
                  </div>
                </button>
                <button
                  className="max-w-34 pl-1.5 pr-2 py-1 flex justify-center items-center gap-1 bg-[var(--white-1)] rounded-full grow group duration-300 active:scale-94"
                  onClick={() => toolkit.horizontalRule()}
                  disabled={toolbarDisable}
                >
                  <div className="group-hover:opacity-75 duration-300">
                    <HorizontalRule dimension={20} />
                  </div>
                  <div className="group-hover:opacity-75 duration-300 text-sm md:text-xs text-nowrap">
                    Horizontal rule
                  </div>
                </button>
                <button
                  className="max-w-30 pl-1.5 pr-2 py-1 flex justify-center items-center gap-1 bg-[var(--white-1)] rounded-full grow group duration-300 active:scale-94"
                  onClick={() => toolkit.paragraph()}
                  disabled={toolbarDisable}
                >
                  <div className="group-hover:opacity-75 duration-300">
                    <Paragraph dimension={20} />
                  </div>
                  <div className="group-hover:opacity-75 duration-300 text-sm md:text-xs text-nowrap">
                    Paragraph
                  </div>
                </button>
                <button
                  className="max-w-34 pl-1.5 pr-2 py-1 flex justify-center items-center gap-1 bg-[var(--white-1)] rounded-full grow group duration-300 active:scale-94"
                  onClick={() => toolkit.clearMarks()}
                  disabled={toolbarDisable}
                >
                  <div className="group-hover:opacity-75 duration-300">
                    <ClearMarks dimension={20} />
                  </div>
                  <div className="group-hover:opacity-75 duration-300 text-sm md:text-xs text-nowrap">
                    CLear marks
                  </div>
                </button>
                <button
                  className="max-w-34 pl-1.5 pr-2 py-1 flex justify-center items-center gap-1 bg-[var(--white-1)] rounded-full grow group duration-300 active:scale-94"
                  onClick={() => toolkit.clearNodes()}
                  disabled={toolbarDisable}
                >
                  <div className="group-hover:opacity-75 duration-300">
                    <ClearNodes dimension={20} />
                  </div>
                  <div className="group-hover:opacity-75 duration-300 text-sm md:text-xs text-nowrap">
                    CLear nodes
                  </div>
                </button>
              </div>
            </div>
            <div className="h-full">
              <button
                type="button"
                className="grid place-items-center duration-300 hover:opacity-75 scale-90 active:scale-80 rotate-z-180"
                onClick={() => setToolbarCount(prev => {
                  if(prev <= 0) return prev
                  return prev - 1
                })}
                disabled={toolbarDisable}
              >
                <ScrollDown dimension={14} color="#347CE9" />
              </button>
              <button
                type="button"
                className="grid place-items-center duration-300 hover:opacity-75 scale-90 active:scale-80"
                onClick={() => setToolbarCount(prev => {
                  if(prev >= (toolbarCountMax - 1)) return prev
                  return prev + 1
                })}
                disabled={toolbarDisable}
              >
                <ScrollDown dimension={14} color="#347CE9" />
              </button>
            </div>
          </>
        )}
      </div>
      {preferences && !preferences.editor.autosave && (
        <div className=" bg-[var(--blue-5)] h-10 aspect-square rounded-l-sm rounded-tr-xl rounded-br-xl md:rounded-br-sm overflow-clip duration-300 hover:scale-94 active:scale-80">
          <button
            type="button"
            className="h-full aspect-square rounded-sm rounded-tr-xl grid place-items-center"
          >
          <Save dimension={22} color="#347CE9" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ToolBox