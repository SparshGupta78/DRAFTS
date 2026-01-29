import { useEffect, useRef, useState, type ReactNode } from "react"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Blockquote, Bold, Code, Highlighter, Italic, Link, Redo, Strikethrough, Subscript, Superscript, Underline, Undo, UnorderedList, HorizontalRule, Paragraph, ClearMarks, ClearNodes, ScrollDown, Save, H1, H2, H3, H4, H5, H6, OrderedList, TaskList } from "../../assets/Icons";
import { usePreferencesContext } from "../../contexts/preferences.context";
import { useWindowWidthContext } from "../../contexts/windowWidth.context";
import { useParams } from "react-router-dom";
import { cn } from "../../utils/cn";


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
  isUserDashboard: boolean,
  save: () => Promise<void>
}

type InsideButtonProps = {
  children: ReactNode,
  className?: string
  onClick: () => void
}

const ToolBox = ({
  setSideNavOpen,
  toolkit,
  isUserDashboard,
  save
}: props) => {

  const { noteId } = useParams()

  const { preferences } = usePreferencesContext()

  const windowWidth = useWindowWidthContext()

  const [link, setLink] = useState('')
  const [toolbarCount, setToolbarCount] = useState(0)
  const [toolbarCountMax, setToolbarCountMax] = useState(1)
  const [toolbarDisable, setToolbarDisable] = useState(true)

  const toolbarRef = useRef(null)

  const toolbarPosition = () => {
    if(!toolbarRef.current) return
    setToolbarCount(0)
    setToolbarCountMax(Math.floor(Number.parseFloat(getComputedStyle(toolbarRef.current).height) / 28))
  }

  const sidebarVisibile = preferences && !preferences.settings.appearance.sidebar.visible || windowWidth < 768
  const autosave = preferences && !preferences.editor.autosave

  const toolbarWidth = () => {
    if(windowWidth < 768) return 'w-full'
    if(sidebarVisibile && autosave) return 'w-[calc(100%-84px)]'
    if(sidebarVisibile || autosave) return 'w-[calc(100%-42px)]'
    return 'w-full'
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
    }
    else {
      setToolbarDisable(true)
    }
  }, [isUserDashboard, noteId])

  const InsideButton = ({
    children,
    className,
    onClick
  }: InsideButtonProps) => {
    return (
      <button
        className={cn(
          "duration-300 hover:opacity-70 active:opacity-60 disabled:opacity-50",
          className
        )}
        onClick={onClick}
        disabled={toolbarDisable}
      >
        {children}
      </button>
    )
  }

  const Button = ({
    className,
    icon,
    title,
    onClick
  }: {
    className?: string,
    icon: ReactNode,
    title: string,
    onClick: () => void
  }) => {
    return (
      <button
        className={cn(
          "py-1 flex justify-center items-center bg-[var(--white-1)] rounded-full grow group duration-300 active:scale-94 disabled:opacity-50",
          title === '' ? 'px-2' : 'pl-1.5 pr-2 gap-1',
          className
        )}
        onClick={onClick}
        disabled={toolbarDisable}
      >
        <div className="group-hover:opacity-75 duration-300">
          {icon}
        </div>
        <div className="group-hover:opacity-75 duration-300 text-xs text-nowrap">
          {title}
        </div>
      </button>
    )
  }

  const ButtonsWrapper = ({
    children,
    className
  }: {
    children: ReactNode,
    className?: string
  }) => {
    return (
      <div className={cn(
        'px-2 py-1 flex justify-center items-center gap-1.5 bg-[var(--white-1)] rounded-full grow',
        className
      )}>
        {children}
      </div>
    )
  }

  return (
    <div className="w-full max-w-full md:relative md:top-0 h-fit md:flex justify-between z-1">
      {sidebarVisibile && (
        <div className="w-full md:w-fit flex gap-1.5 justify-between">
          <div className="bg-[var(--white-3)] h-10 aspect-square rounded-xl md:rounded-sm md:rounded-tl-xl overflow-clip duration-300 hover:scale-94 active:scale-80">
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
          <div className="md:hidden w-fit h-10 flex justify-center items-center gap-1.5">
            <div className="w-fit h-full px-2 py-1.25 flex justify-center items-center gap-1.5 bg-[var(--white-3)] rounded-xl">
              <button
                className="duration-300 hover:opacity-70 active:opacity-60 disabled:opacity-50"
                onClick={() => toolkit.undo()}
                disabled={toolbarDisable}
              >
                <Undo dimension={18} />
              </button>
              <button
                className="duration-300 hover:opacity-70 active:opacity-60 disabled:opacity-50"
                onClick={() => toolkit.redo()}
                disabled={toolbarDisable}
              >
                <Redo dimension={18} />
              </button>
            </div>
            {preferences && !preferences.editor.autosave && (
              <div className="bg-[var(--blue-5)] h-10 aspect-square rounded-xl overflow-clip">
                <button
                  type="button"
                  className="h-full aspect-square rounded-sm rounded-tr-xl grid place-items-center duration-300 hover:scale-94 active:scale-80 disabled:hover:scale-100 disabled:active:scale-100 disabled:opacity-50"
                  disabled={toolbarDisable}
                  onClick={save}
                >
                <Save dimension={22} color="#347CE9" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={cn(
        'bg-[var(--white-3)] h-10 flex items-center gap-1.5 rounded-xl p-1.5 mt-0.75 md:mt-0',
        sidebarVisibile ? 'md:ml-0.75 md:rounded-l-sm' : 'md:rounded-bl-sm',
        autosave ? 'md:mr-0.75 md:rounded-r-sm' : 'md:rounded-br-sm',
        toolbarWidth()
      )}>
        <div className="hidden px-2 py-1.25 sm:flex justify-center items-center gap-1.5">
          <button
            className="duration-300 hover:opacity-70 active:opacity-60 disabled:opacity-50"
            onClick={() => toolkit.undo()}
            disabled={toolbarDisable}
          >
            <Undo dimension={18} />
          </button>
          <button
            className="duration-300 hover:opacity-70 active:opacity-60 disabled:opacity-50"
            onClick={() => toolkit.redo()}
            disabled={toolbarDisable}
          >
            <Redo dimension={18} />
          </button>
        </div>
        <div className="w-full max-w-full h-7 overflow-x-scroll overflow-y-hidden">
          <div
            className="w-fit flex flex-wrap items-center gap-1.5 duration-300 ease-out"
            style={{transform: `translateY(calc(${toolbarCount * -1}*34px))`}}
            ref={toolbarRef}
          >
            <ButtonsWrapper
              className="max-w-40"
            >
              <InsideButton
                onClick={() => toolkit.bold()}
              >
                <Bold dimension={20} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.italic()}
              >
                <Italic dimension={20} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.underline()}
              >
                <Underline dimension={20} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.strikethrough()}
              >
                <Strikethrough dimension={20} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.highlight()}
                className="-translate-y-0.25 scale-75"
              >
                <Highlighter dimension={20} />
              </InsideButton>
            </ButtonsWrapper>
            <Button
              icon={<Link dimension={20} />}
              title={''}
              onClick={() => {}}
              className="max-w-10"
            />
            <ButtonsWrapper
              className="max-w-20"
            >
              <InsideButton
                onClick={() => toolkit.superscript()}
              >
                <Superscript dimension={20} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.subscript()}
              >
                <Subscript dimension={20} />
              </InsideButton>
            </ButtonsWrapper>
            <ButtonsWrapper
              className="max-w-36"
            >
              <InsideButton
                onClick={() => toolkit.align('left')}
              >
                <AlignLeft dimension={20} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.align('center')}
              >
                <AlignCenter dimension={20} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.align('right')}
              >
                <AlignRight dimension={20} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.align('justify')}
              >
                <AlignJustify dimension={20} />
              </InsideButton>
            </ButtonsWrapper>
            <ButtonsWrapper
              className="max-w-50 py-0.75"
            >
              <InsideButton
                onClick={() => toolkit.heading(1)}
              >
                <H1 dimension={22} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.heading(2)}
              >
                <H2 dimension={22} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.heading(3)}
              >
                <H3 dimension={22} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.heading(4)}
              >
                <H4 dimension={22} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.heading(5)}
              >
                <H5 dimension={22} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.heading(6)}
              >
                <H6 dimension={22} />
              </InsideButton>
            </ButtonsWrapper>
            <Button
              icon={<Code dimension={20} />}
              title={'Code'}
              onClick={() => toolkit.code()}
              className="max-w-20"
            />
            <ButtonsWrapper
              className="max-w-26 py-1.25"
            >
              <InsideButton
                onClick={() => toolkit.orderedList()}
              >
                <OrderedList dimension={18} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.unorderedList()}
              >
                <UnorderedList dimension={18} />
              </InsideButton>
              <InsideButton
                onClick={() => toolkit.taskList()}
              >
                <TaskList dimension={18} />
              </InsideButton>
            </ButtonsWrapper>
            <Button
              icon={<Blockquote dimension={20} />}
              title={'Blockquote'}
              onClick={() => toolkit.blockquote()}
              className="max-w-28"
            />
            <Button
              icon={<HorizontalRule dimension={20} />}
              title={'Horizontal rule'}
              onClick={() => toolkit.horizontalRule()}
              className="max-w-34"
            />
            <Button
              icon={<Paragraph dimension={20} />}
              title={'Paragraph'}
              onClick={() => toolkit.paragraph()}
              className="max-w-30"
            />
            <Button
              icon={<ClearMarks dimension={20} />}
              title={'CLear marks'}
              onClick={() => toolkit.clearMarks()}
              className="max-w-30"
            />
            <Button
              icon={<ClearNodes dimension={20} />}
              title={'CLear nodes'}
              onClick={() => toolkit.clearNodes()}
              className="max-w-34"
            />
          </div>
        </div>
        <div className="h-full">
          <button
            type="button"
            className="grid place-items-center duration-300 hover:opacity-75 scale-90 active:scale-80 disabled:opacity-50 rotate-z-180"
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
            className="grid place-items-center duration-300 hover:opacity-75 scale-90 active:scale-80 disabled:opacity-50"
            onClick={() => setToolbarCount(prev => {
              if(prev >= (toolbarCountMax - 1)) return prev
              return prev + 1
            })}
            disabled={toolbarDisable}
          >
            <ScrollDown dimension={14} color="#347CE9" />
          </button>
        </div>
      </div>
      {preferences && !preferences.editor.autosave && (
        <div className="hidden md:block bg-[var(--blue-5)] h-10 aspect-square rounded-l-sm rounded-r-xl md:rounded-br-sm overflow-clip">
          <button
            type="button"
            className="h-full aspect-square rounded-sm rounded-tr-xl grid place-items-center duration-300 hover:scale-94 active:scale-80 disabled:hover:scale-100 disabled:active:scale-100 disabled:opacity-50"
            disabled={toolbarDisable}
            onClick={save}
          >
          <Save dimension={22} color="#347CE9" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ToolBox