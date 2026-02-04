import { useState } from "react"
import { Account, Close } from "../../assets/Icons"
import { cn } from "../../utils/cn"
import DialogWrapper from "../DialogWrapper/DialogWrapper"
import DropDown from "../DropDown/DropDown"
import { authGuidelines } from "../../pages/SignUp"
import { useWindowWidthContext } from "../../contexts/windowWidth.context"

type props = {
  editProfileOpen: boolean,
  setEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type InputProps = {
  title: string,
  type: string,
  className?: string,
  placeholder?: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input = ({
  title,
  type,
  className,
  placeholder,
  value,
  setValue
}: InputProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
      <div className="w-full text-sm text-[var(--black-2)]">{title}</div>
      <div className="relative w-full lg:w-fit">
        <input
          type={type}
          className={cn(
            "w-full lg:w-fit lg:min-w-60 pl-2 pr-6 py-1 border border-[var(--black-4)] rounded-sm duration-100 outline-0 outline-[var(--blue-1)] text-sm hover:outline-1 focus:border-[var(--blue-2)] focus:outline-4 placeholder:text-[var(--black-7)]",
            className
          )}
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button
          className={cn(
            "absolute top-1/2 right-0 -translate-x-1.5 -translate-y-1/2 duration-300",
            value === '' && 'scale-0 opacity-0'
          )}
          onClick={() => {
            setValue('')
          }}
        >
          <Close
            color="#4C4C4C"
            dimension={16}
          />
        </button>
      </div>
    </div>
  )
}

const EditProfile = ({
  editProfileOpen,
  setEditProfileOpen
}: props) => {

  const windowWidth = useWindowWidthContext()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <DialogWrapper
      open={editProfileOpen}
      setOpen={setEditProfileOpen}
      header="Edit Profile"
    >
      <div className="h-full w-full p-2.5 overflow-auto">
        <div className="h-fit md:h-full md:min-h-full w-full flex flex-col md:flex-row gap-2.5">
          <div className="w-full md:w-fit h-fit md:min-h-full md:h-full px-2.5 py-2 flex flex-col justify-between">
            <div>
              <div>
                <div className="text-sm font-normal text-[var(--black-2)]">
                  Profile picture
                </div>
                <hr className="my-1.5 mx-auto w-full border-[var(--black-4)]" />
              </div>
              <div className="p-6 flex flex-col items-center gap-6">
                <div className="h-40 aspect-square rounded-full bg-[var(--black-6)] flex items-center justify-center">
                  <Account dimension={64} />
                </div>
                <div className="h-fit w-full flex justify-center gap-2.5">
                  <button
                    type="button"
                    className="px-4 py-1.5 bg-[var(--black-4)] rounded-sm text-sm whitespace-nowrap truncate"
                  >
                    Choose file
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1.5 bg-[var(--blue-2)] text-[var(--white-1)] rounded-sm text-sm whitespace-nowrap truncate"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <DropDown
              trigger={
                <button className="w-full text-[15px] font-normal text-[var(--blue-2)] duration-300 hover:opacity-75 active:scale-96">
                  Sign Up Guidelines
                </button>
              }
              preStyle={false}
              triggerStyle="w-fit"
              contentStyle="w-full max-w-100 max-h-80 bg-[var(--white-4)] rounded-lg p-3 md:mb-2.5 overflow-auto"
              align="left"
              position={windowWidth > 768 ? "top" : "bottom"}
            >
              <div className="w-full">
                {authGuidelines.map((g, i) => (
                  <div
                    key={i}
                    className="text-sm text-[var(--black-2)] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl"
                  >
                    {g}
                  </div>
                ))}
              </div>
            </DropDown>
          </div>
          <div className="w-full md:w-fit h-fit grow">
            <div className="w-full rounded-lg border border-[var(--black-4)] px-2.5 py-2">
              <div>
                <div className="text-sm font-normal text-[var(--black-2)]">
                  Details
                </div>
                <hr className="my-1.5 mx-auto w-full border-[var(--black-4)]" />
                <div className="p-1 flex flex-col gap-3 sm:gap-2.5">
                  <Input
                    title={"First name"}
                    type={"text"}
                    value={firstName}
                    setValue={setFirstName}
                    placeholder="First name"
                  />
                  <Input
                    title={"Middle name"}
                    type={"text"}
                    value={middleName}
                    setValue={setMiddleName}
                    placeholder="Middle name"
                  />
                  <Input
                    title={"Last name"}
                    type={"text"}
                    value={lastName}
                    setValue={setLastName}
                    placeholder="Last name"
                  />
                  <div className="w-full flex justify-end">
                  <button
                    type="button"
                    className="px-3.5 py-1.5 bg-[var(--blue-2)] text-[var(--white-1)] rounded-sm text-sm"
                  >
                    Update
                  </button>
                </div>
                </div>
              </div>
            </div>
            <div className="mt-2.5 w-full rounded-lg border border-[var(--black-4)] px-2.5 py-2">
              <div>
                <div className="text-sm font-normal text-[var(--black-2)]">
                  Password
                </div>
                <hr className="my-1.5 mx-auto w-full border-[var(--black-4)]" />
              </div>
              <div className="p-1 flex flex-col gap-3 sm:gap-2.5">
                <Input
                  title={"Enter old password"}
                  type={"password"}
                  value={oldPassword}
                  setValue={setOldPassword}
                  placeholder="***"
                />
                <Input
                  title={"Enter new password"}
                  type={"password"}
                  value={password}
                  setValue={setPassword}
                  placeholder="***"
                />
                <Input
                  title={"Re-enter new password"}
                  type={"password"}
                  value={rePassword}
                  setValue={setRePassword}
                  placeholder="***"
                />
                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    className="px-3.5 py-1.5 bg-[var(--blue-2)] text-[var(--white-1)] rounded-sm text-sm"
                  >
                    Change password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  )
}

export default EditProfile