import React, { useRef, type ReactNode } from 'react'
import { Close } from '../../assets/Icons'
import { cn } from '../../utils/cn'

type props = {
  children: ReactNode,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  header: string,
  widthStyle?: string,
  heightStyle?: string
}

const DialogWrapper = ({
  children,
  open,
  setOpen,
  header,
  widthStyle="w-92/100 sm:max-w-275",
  heightStyle="h-90/100 max-h-full"
}: props) => {

  const dialogRef = useRef(null)

  const outsideClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dialogRef.current && !(dialogRef.current as HTMLElement).contains(e.target as Node)) {
      setOpen(false)
    }
  }

  return (
    <div className={cn(
      'fixed inset-0 z-100 bg-black/15 backdrop-blur-[2px] duration-300',
      open ? 'pointer-events-auto' : 'opacity-0 pointer-events-none'
    )}>
      <div
        className="w-full h-full flex items-center justify-center"
        onClick={(e) => outsideClickHandler(e)}
      >
        <div
          ref={dialogRef}
          className={cn(
            'bg-[var(--white-2)] rounded-xl shadow-[var(--shadow-1)] duration-300',
            widthStyle,
            heightStyle,
            open ? 'scale-100' : 'scale-98'
          )}
        >
          <div className="px-3 py-2 bg-[var(--black-4)] flex items-center justify-between gap-2.5 rounded-t-xl border-b-[1px] border-[var(--black-1)]">
            <span className="pl-1.5 capitalize">
              {header}
            </span>
            <div
              className="duration-150 hover:opacity-70 active:opacity-60"
              onClick={() => {
                setOpen(false)
              }}
            >
              <Close />
            </div>
          </div>
          <div className="w-full h-[calc(100%-41px)] max-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialogWrapper