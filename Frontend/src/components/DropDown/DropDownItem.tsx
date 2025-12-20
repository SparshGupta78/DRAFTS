import type { ReactNode } from "react"

type props = {
  children: ReactNode,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  data: string,
  preStyle?: boolean,
  className?: string,
  onClick?: () => void
}

const DropDownItem = ({children, setValue, data, preStyle = true, className = '', onClick}: props) => {

  const clickHandler = () => {
    setValue(data)
    if(onClick) {
      onClick()
    }
  }

  return (
    <div 
      className={`${preStyle ? 'w-full px-1 py-0.5 bg-[var(--black-4)]' : ''} ${className}`} 
      onClick={() => clickHandler()}
    >
      {children}
    </div>
  )
}

export default DropDownItem