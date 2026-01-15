import { useState } from "react"
import { Account, AccountEdit, Edit } from "../../../assets/Icons"
import type { userTypeExtended } from "../../../types/userExtended.type"
import DropDown from "../../DropDown/DropDown"
import useUserAPI from "../../../services/user.service"

type props = {
  loggedUser: userTypeExtended | undefined
}

const AccountPanel = ({loggedUser}: props) => {

  const { DeleteAccount } = useUserAPI()

  const [accountConfirm, setAccountConfirm] = useState(false)
  const [confirmBtnDisable, setConfirmBtnDisable] = useState(false)
  const [password, setPassword] = useState('')
  const [incorrectPasswordField, setIncorrectPasswordField] = useState(false)

  const confirmHandler = async () => {
    setConfirmBtnDisable(true)
    const status = await DeleteAccount(password)
    setIncorrectPasswordField(!status)
    setConfirmBtnDisable(false)
  }

  return (
    <div className="w-full p-2.5 flex flex-col gap-2.5">
      <div className="w-full">
        <div className="text-sm font-normal text-[var(--black-2)]">
          User profile
        </div>
        <hr className="my-1.5 w-full border-[var(--black-1)]" />
      </div>
      <div className="p-2.5 flex flex-col sm:flex-row sm:justify-evenly items-center gap-2.5">
        <div className="w-fit flex flex-col items-center">
          <div className="h-44 aspect-square rounded-full bg-[var(--black-6)] flex items-center justify-center">
            <Account dimension={74} />
          </div>
          <button
            type="button"
            className='mt-2.5 flex items-center gap-1.25 hover:opacity-75 duration-300'
          >
            <AccountEdit dimension={14} color='#347CE9' />
            <span className='text-sm text-[var(--blue-2)]'>Edit profile</span>
          </button>
        </div>
        <div className="p-4 w-full max-w-120 flex flex-col gap-2 border-1 border-[var(--black-4)] rounded-lg">
          <div className="w-full flex">
            <div className="w-1/2 truncate text-sm text-[var(--black-2)]">First name</div>
            <div className="w-1/2 truncate text-sm text-[var(--black-3)]">{loggedUser ? loggedUser.firstName : '-'}</div>
          </div>
          <hr className="w-full border-[var(--black-1)]" />
          <div className="w-full flex">
            <div className="w-1/2 truncate text-sm text-[var(--black-2)]">Middle name</div>
            <div className="w-1/2 truncate text-sm text-[var(--black-3)]">{loggedUser ? loggedUser.middleName : '-'}</div>
          </div>
          <hr className="w-full border-[var(--black-1)]" />
          <div className="w-full flex">
            <div className="w-1/2 truncate text-sm text-[var(--black-2)]">Last name</div>
            <div className="w-1/2 truncate text-sm text-[var(--black-3)]">{loggedUser ? loggedUser.lastName : '-'}</div>
          </div>
          <hr className="w-full border-[var(--black-1)]" />
          <div className="w-full flex">
            <div className="w-1/2 truncate text-sm text-[var(--black-2)]">Username</div>
            <div className="w-1/2 truncate text-sm text-[var(--black-3)]">{loggedUser ? loggedUser.username : '-'}</div>
          </div>
          <hr className="w-full border-[var(--black-1)]" />
          <div className="w-full flex">
            <div className="w-1/2 truncate text-sm text-[var(--black-2)]">Email</div>
            <div className="w-1/2 truncate text-sm text-[var(--black-3)]">{loggedUser ? loggedUser.email : '-'}</div>
          </div>
          <hr className="w-full border-[var(--black-1)]" />
          <div className="w-full flex">
            <div className="w-1/2 truncate text-sm text-[var(--black-2)]">Password</div>
            <div className="w-1/2 truncate text-sm text-[var(--blue-2)]">
              <button type="button" className='flex items-center gap-1.25 hover:opacity-75 duration-300'>
                <Edit dimension={14} color='#347CE9' />
                Edit password
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-sm font-normal text-[var(--black-2)]">
          Account deletion
        </div>
        <hr className="my-1.5 w-full border-[var(--black-1)]" />
      </div>
      <div className="w-full p-2.5 bg-[var(--red-2)] rounded-lg">
        <div className="text-sm text-[var(--red-5)] font-normal">
          Permanently delete your Drafts account and all associated data. This action cannot be undone after the grace period.
        </div>
        <div className="mt-1 text-sm text-[var(--red-1)] font-normal">
          <div>- All your notes, tags, and metadata will be permanently deleted</div>
          <div>- Any shared or bookmarked links to your notes will stop working</div>
          <div>- Active sessions and integrations will be revoked</div>
          <div>- You will not be able to recover your data after the deletion period</div>
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <input
            type="checkbox"
            name=""
            id="author"
            className="scale-125 translate-y-0.25 accent-[var(--red-5)]"
            checked={accountConfirm}
            onChange={() => setAccountConfirm(prev => !prev)}
            disabled={confirmBtnDisable}
          />
          <label htmlFor="author" className="text-sm font-normal text-[var(--red-4)] duration-300 hover:opacity-65">I confirm that I have reviewed the information above and agree to permanently delete my account.</label>
        </div>
        <div className="mt-2.5 flex justify-end">
          <DropDown
            trigger={
              <button
                type="button"
                className="px-3 py-1.5 w-fit text-sm text-[var(--white-2)] font-normal bg-[var(--red-5)] rounded-md whitespace-nowrap duration-300 hover:opacity-75 active:scale-98 disabled:opacity-60 disabled:active:scale-100"
                disabled={!accountConfirm || confirmBtnDisable}
              >
                Delete account
              </button>
            }
            align="right"
            position="top"
            preStyle={false}
            contentStyle="mb-2.5"
            disabled={!accountConfirm}
          >
            <div className="p-2.5 w-65 sm:w-85 bg-[var(--black-6)] rounded-lg shadow-[var(--shadow-1)]">
              <div className={`w-full h-fit text-sm text-[var(--red-5)] text-center font-normal  border-[var(--red-6)] overflow-hidden duration-300 ${incorrectPasswordField ? 'max-h-10 pb-2.5 mb-2 border-b-1' : 'max-h-0'}`}>Incorrect password</div>
              <div className="text-sm font-normal text-[var(--black-2)]">Enter your password</div>
              <input
                type="password"
                className="mt-1.5 px-2.5 py-1 bg-[var(--white-2)] text-sm w-full rounded-md border-1 duration-100 border-[var(--black-4)] outline-0 outline-[var(--black-4)] hover:outline-2 active:outline-2 focus:outline-3 focus:border-[var(--black-1)] disabled:opacity-60 disabled:hover:outline-0 disabled:active:outline-0 disabled:focus:outline-0"
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                disabled={confirmBtnDisable}
              />
              <button
                type="button"
                className='mt-2.5 w-full text-sm bg-[var(--red-5)] rounded-md text-center p-1 text-[var(--white-2)] font-normal select-none duration-300 hover:opacity-70 active:scale-96 disabled:opacity-60 disabled:active:scale-100'
                onClick={confirmHandler}
                disabled={confirmBtnDisable}
              >
                Confirm
              </button>
            </div>
          </DropDown>
        </div>
      </div>
    </div>
  )
}

export default AccountPanel