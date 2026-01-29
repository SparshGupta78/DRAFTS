import { cn } from "../../utils/cn"

type props = {
  state: boolean,
  onClick: () => void
}

const Switch = ({
  state,
  onClick
}: props) => {
  return (
  <div
    className={cn(
      'p-0.5 w-10.5 h-5.5 rounded-full border-2 border-[var(--black-1)] shrink-0 duration-300',
      state ? 'bg-[var(--black-6)]' : 'bg-[var(--white-2)]'
    )}
    onClick={onClick}
  >
    <div className={cn(
      'h-3.75 aspect-square rounded-full duration-300',
      state ? 'bg-[var(--black-5)] translate-x-4.75' : 'bg-[var(--black-1)] translate-x-0'
    )}>
      
    </div>
  </div>
  )
}

export default Switch