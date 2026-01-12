import { useEffect, useRef, useState, type ReactNode } from "react"
import DropDownTrigger from "./DropDownTrigger"
import DropDownContent from "./DropDownContent"

type props = {
  children: ReactNode,
  trigger: ReactNode,
  preStyle?: boolean,
  triggerStyle?: string,
  contentStyle?: string,
  align?: "left" | "right",
  position?: "top" | "bottom"
  onContentClickClose?: boolean
  disabled?: boolean
}

const DropDown = ({
    trigger,
    children,
    preStyle = true,
    triggerStyle = '',
    contentStyle = '',
    align = "left",
    position = "bottom",
    onContentClickClose = false,
    disabled = false
  }: props) => {

  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const clickHandler = (e: MouseEvent) => {
    if (ref.current && !(ref.current as HTMLElement).contains(e.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <DropDownTrigger
        preStyle={preStyle}
        triggerStyle={triggerStyle}
        setOpen={setOpen}
        disabled={disabled}
      >
        {trigger}
      </DropDownTrigger>
      <DropDownContent
        preStyle={preStyle}
        contentStyle={contentStyle}
        align={align}
        position={position}
        open={open}
        onClick={() => {
          if (onContentClickClose) {
            setOpen(false)
          }
        }}
      >
        {children}
      </DropDownContent>
    </div>
  )
}

export default DropDown