import type { ReactNode } from "react"

type props = {
  children: ReactNode,
  preStyle: boolean,
  triggerStyle: string,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  disabled: boolean
}

const DropDownTrigger = ({children, preStyle, triggerStyle, setOpen, disabled }: props) => {
  return (
    <div 
      className={`${preStyle ? 'min-w-20 max-w-50 bg-[var(--white-1)] px-1.5 py-0.5 text-sm rounded-sm overflow-hidden truncate' : ''} ${triggerStyle}`}
      onClick={() => {
        if (!disabled) setOpen(prev => !prev)
      }}
    >
      {children}
    </div>
  )
}

export default DropDownTrigger