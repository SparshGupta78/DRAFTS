import type { ReactNode } from "react"

type props = {
  children: ReactNode,
  preStyle: boolean,
  contentStyle: string,
  align: "left" | "right",
  position: "top" | "bottom",
  open: boolean
}

const DropDownContent = ({
    children,
    preStyle,
    contentStyle,
    align,
    position,
    open
  }: props) => {
  return (
    <div 
      className={`
        absolute z-10 duration-300
        ${preStyle ? 'min-w-20 max-w-50 max-h-[min(200px,40vh)] bg-[var(--white-1)] p-2 rounded-sm overflow-x-hidden overflow-y-auto flex flex-col gap-1 text-sm' : ''} 
        ${align == 'left' ? 'left-0' : 'right-0'} 
        ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}
        ${contentStyle}
        ${open ? 'pointer-events-auto scale-100 opacity-100 translate-y-0' : 'pointer-events-none scale-98 opacity-0 -translate-y-1'}
      `}>
      {children}
    </div>
  )
}

export default DropDownContent