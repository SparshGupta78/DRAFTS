import { CLoseCicle } from "../../assets/Icons"
import { cn } from "../../utils/cn"

type props = {
  name?: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  placeholder: string,
  type: string,
  errorClassConditioner: boolean,
  disabled?: boolean,
  resetter?: () => void
}

const Input = ({
  name='',
  value,
  setValue,
  placeholder,
  type='text',
  errorClassConditioner,
  disabled=false,
  resetter
}: props) => {

  const inputClass = (conditioner: boolean) => (
    conditioner?
    'border-[var(--red-1)] outline-4 outline-[var(--red-2)]':
    'border-[var(--black-1)] outline-0 outline-[var(--blue-1)] hover:outline-4 active:outline-4 focus:outline-6 focus:border-[var(--blue-2)] disabled:hover:outline-0 disabled:active:outline-0'
  )

  return (
    <div className="relative">
      <input 
        className={cn(
          'w-full border-1 rounded-full pl-4.5 pr-9 py-2 duration-100 placeholder:text-[var(--black-2)] text-[15px] disabled:opacity-60',
          inputClass(errorClassConditioner)
        )}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if(resetter) resetter()
        }}
        disabled={disabled}
      />
      <div 
        className={cn(
          'absolute right-[8px] top-1/2 translate-y-[-50%] items-center justify-center rounded-full',
          value != '' && !disabled ? 'flex' : 'hidden'
        )}
        onClick={() => {
          setValue('')
          if(resetter) resetter()
        }}
      >
        <CLoseCicle dimension={22} />
      </div>
    </div>
  )
}

export default Input