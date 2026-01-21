import { useEffect, useState } from "react"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ArrowDown, Blockquote, Bold, Code, Highlighter, Italic, Link, Redo, Strikethrough, Subscript, Superscript, Underline, Undo, UnoderedList, HorizontalRule, Paragraph, ClearMarks, ClearNodes, Unlink } from "../../assets/Icons";
import { usePreferencesContext } from "../../contexts/preferences.context";
import { useWindowWidthContext } from "../../contexts/windowWidth.context";

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
    heading: (level: 2 | 1 | 3 | 4 | 5 | 6) => boolean;
    setLink: (link?: string) => boolean;
  },
  isUserDashboard: boolean
}

const ToolBox = ({setSideNavOpen, toolkit, isUserDashboard}: props) => {

  const { preferences } = usePreferencesContext()

  const windowWidth = useWindowWidthContext()
  
  const [toolbarOpen, setToolbarOpen] = useState(false)

  useEffect(() => {
    if (windowWidth > 768) setToolbarOpen(true)
    else setToolbarOpen(false)
  }, [windowWidth])

  return (
    <div className="bg-[var(--white-3)] md:bg-transparent rounded-b-xl fixed md:relative top-0 left-2 md:left-0 w-[calc(100%-16px)] md:w-full h-fit z-10">
      <div className={`h-fit p-2 md:p-0 md:pb-0 rounded-b-xl flex flex-wrap items-center gap-2.5 relative duration-300 ${toolbarOpen ? 'pb-6' : 'pb-3'}`}>
        <div className="w-full max-w-full duration-300">
          <div className="md:w-full flex items-center flex-wrap md:flex-nowrap duration-300">
            <div className="h-fit md:h-14 w-full md:w-fit flex items-center justify-between gap-0.5">
              <div
                className={`bg-[var(--white-3)] h-full aspect-square active:bg-[var(--white-3)] flex items-center justify-center rounded-sm rounded-tl-xl active:scale-94 duration-300 ${(preferences && !preferences.settings.appearance.sidebar.visible) ? '' : 'md:hidden'}`}
                onClick={() => setSideNavOpen(prev => !prev)}
              >
                {/* menu-toggle-button */}
                <div className="w-7 h-fit flex flex-col items-center justify-center gap-1.25">
                  <div className="w-85/100 h-0.5 rounded-sm bg-[var(--black-3)]"></div>
                  <div className="w-65/100 h-0.5 rounded-sm bg-[var(--black-1)]"></div>
                </div>
              </div>
              <div className={`md:pl-2.5 h-full bg-[var(--white-3)] flex items-center gap-0.5 ${(preferences && !preferences.settings.appearance.sidebar.visible) ? 'rounded-l-sm' : 'rounded-bl-sm rounded-tl-xl'}`}>
                <div className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]" onClick={() => toolkit.undo()}>
                  <Undo dimension={windowWidth > 425 ? 20 : 22} />
                </div>
                <div className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]" onClick={() => toolkit.redo()}>
                  <Redo dimension={windowWidth > 425 ? 20 : 22} />
                </div>
              </div>
            </div>
            <div className="p-2.5 h-14 w-5.5 bg-[var(--white-3)] hidden md:flex items-center">
              <div className="h-6 w-0.5 rounded-full bg-[var(--black-1)]"></div>
            </div>
            <div className={`bg-[var(--white-1)] md:bg-[var(--white-3)] max-w-full md:max-w-[calc(100%-80px)] overflow-x-auto overflow-hidden rounded-lg md:rounded-none md:rounded-tr-xl md:rounded-br-sm px-2 md:p-2.5 duration-300 h-fit ${toolbarOpen ? 'py-2 md:py-2.5 max-h-75 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="w-max flex items-center gap-2.5">
                <div className="h-fit w-fit flex items-center justify-evenly gap-0.5">
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.bold()}
                    disabled={!isUserDashboard}
                  >
                    <Bold dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.italic()}
                    disabled={!isUserDashboard}
                  >
                    <Italic dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.underline()}
                    disabled={!isUserDashboard}
                  >
                    <Underline dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.strikethrough()}
                    disabled={!isUserDashboard}
                  >
                    <Strikethrough dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.highlight()}
                    disabled={!isUserDashboard}
                  >
                    <div className="-translate-y-0.25 scale-75">
                      <Highlighter dimension={windowWidth > 425 ? 20 : 24} />
                    </div>
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.setLink('https://github.com/SparshGupta78')}
                    disabled={!isUserDashboard}
                  >
                    <Link dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.removeLink()}
                    disabled={!isUserDashboard}
                  >
                    <Unlink dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                </div>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <div className="h-fit w-fit flex items-center justify-evenly gap-0.5">
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.superscript()}
                    disabled={!isUserDashboard}
                  >
                    <Superscript dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.subscript()}
                    disabled={!isUserDashboard}
                  >
                    <Subscript dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                </div>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <div className="h-fit w-fit flex items-center justify-evenly gap-0.5">
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.align('left')}
                    disabled={!isUserDashboard}
                  >
                    <AlignLeft dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.align('center')}
                    disabled={!isUserDashboard}
                  >
                    <AlignCenter dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.align('right')}
                    disabled={!isUserDashboard}
                  >
                    <AlignRight dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.align('justify')}
                    disabled={!isUserDashboard}
                  >
                    <AlignJustify dimension={windowWidth > 425 ? 20 : 24} />
                  </button>
                </div>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <div className="p-1 h-fit w-fit flex items-center justify-evenly gap-0.5">
                  <button
                    className="text-sm md:text-xs p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.heading(1)}
                    disabled={!isUserDashboard}
                  >
                    H1
                  </button>
                  <button
                    className="text-sm md:text-xs p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.heading(2)}
                    disabled={!isUserDashboard}
                  >
                    H2
                  </button>
                  <button
                    className="text-sm md:text-xs p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.heading(3)}
                    disabled={!isUserDashboard}
                  >
                    H3
                  </button>
                  <button
                    className="text-sm md:text-xs p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.heading(4)}
                    disabled={!isUserDashboard}
                  >
                    H4
                  </button>
                  <button
                    className="text-sm md:text-xs p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.heading(5)}
                    disabled={!isUserDashboard}
                  >
                    H5
                  </button>
                  <button
                    className="text-sm md:text-xs p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)]"
                    onClick={() => toolkit.heading(6)}
                    disabled={!isUserDashboard}
                  >
                    H6
                  </button>
                </div>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <button
                  className="p-1 h-fit w-fit rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center justify-evenly gap-1"
                  onClick={() => toolkit.code()}
                  disabled={!isUserDashboard}
                >
                  <div className="">
                    <Code dimension={windowWidth > 425 ? 20 : 24} />
                  </div>
                  <div className="text-sm md:text-xs text-nowrap">
                    Code
                  </div>
                </button>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <div className="p-1 h-fit w-fit flex items-center justify-evenly gap-0.5">
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center gap-1"
                    onClick={() => toolkit.unorderedList()}
                    disabled={!isUserDashboard}
                  >
                    <div className="">
                      <UnoderedList dimension={windowWidth > 425 ? 20 : 24} />
                    </div>
                    <div className="text-sm md:text-xs text-nowrap">Unordered list</div>
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center gap-1"
                    onClick={() => toolkit.orderedList()}
                    disabled={!isUserDashboard}
                  >
                    <div className="">
                      <UnoderedList dimension={windowWidth > 425 ? 20 : 24} />
                    </div>
                    <div className="text-sm md:text-xs text-nowrap">Ordered list</div>
                  </button>
                  <button
                    className="p-1 rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center gap-1"
                    onClick={() => toolkit.taskList()}
                    disabled={!isUserDashboard}
                  >
                    <div className="">
                      <UnoderedList dimension={windowWidth > 425 ? 20 : 24} />
                    </div>
                    <div className="text-sm md:text-xs text-nowrap">Task list</div>
                  </button>
                </div>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <button
                  className="p-1 h-fit w-fit rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center justify-evenly gap-1"
                  onClick={() => toolkit.blockquote()}
                  disabled={!isUserDashboard}
                >
                  <div className="">
                    <Blockquote dimension={windowWidth > 425 ? 20 : 24} />
                  </div>
                  <div className="text-sm md:text-xs text-nowrap">
                    Blockquote
                  </div>
                </button>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <button
                  className="p-1 h-fit w-fit rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center justify-evenly gap-1"
                  onClick={() => toolkit.horizontalRule()}
                  disabled={!isUserDashboard}
                >
                  <div className="">
                    <HorizontalRule dimension={windowWidth > 425 ? 20 : 24} />
                  </div>
                  <div className="text-sm md:text-xs text-nowrap">
                    Horizontal rule
                  </div>
                </button>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <button
                  className="p-1 h-fit w-fit rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center justify-evenly gap-1"
                  onClick={() => toolkit.paragraph()}
                  disabled={!isUserDashboard}
                >
                  <div className="">
                    <Paragraph dimension={windowWidth > 425 ? 20 : 24} />
                  </div>
                  <div className="text-sm md:text-xs text-nowrap">
                    Paragraph
                  </div>
                </button>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <button
                  className="p-1 h-fit w-fit rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center justify-evenly gap-1"
                  onClick={() => toolkit.clearMarks()}
                  disabled={!isUserDashboard}
                >
                  <div className="">
                    <ClearMarks dimension={windowWidth > 425 ? 20 : 24} />
                  </div>
                  <div className="text-sm md:text-xs text-nowrap">
                    CLear marks
                  </div>
                </button>
                <div className="h-6 w-0.5 rounded-full  bg-[var(--blue-1)]"></div>
                <button
                  className="p-1 h-fit w-fit rounded-sm duration-200 hover:bg-[var(--blue-1)] active:bg-[var(--blue-1)] flex items-center justify-evenly gap-1"
                  onClick={() => toolkit.clearNodes()}
                  disabled={!isUserDashboard}
                >
                  <div className="">
                    <ClearNodes dimension={windowWidth > 425 ? 20 : 24} />
                  </div>
                  <div className="text-sm md:text-xs text-nowrap">
                    CLear nodes
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden absolute bottom-1 left-0 w-full h-fit flex items-center justify-center gap-1">
          <button
            className="w-fit flex items-center justify-center gap-1 select-none" 
            onClick={() => setToolbarOpen(prev => !prev)}
            disabled={!isUserDashboard}
            >
            <div className={`duration-300 ${toolbarOpen ? 'rotate-x-180' : 'rotate-x-0'}`}>
              <ArrowDown dimension={10} color="#347CE9" />
            </div>
            {toolbarOpen ? <span className="text-xs text-[var(--blue-2)]">Close toolbar</span> : <span className="text-xs text-[var(--blue-2)]">Open toolbar</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToolBox