import { useState, type FormEvent } from "react"
import { NavLink } from "react-router-dom"
import ai from '../assets/ai.svg'
import useAuthAPI from "../services/auth.service"
import useDraftsAPI from "../services/drafts.service"
import { useNotificationContext } from "../contexts/notification.context"
import { cn } from "../utils/cn"
import { Arrow2 } from "../assets/Icons"
import Input from "../components/Input/Input"

export const authGuidelines = [
  "First name and last name must be at least 2 characters long.",
  "First name, middle name and last name must contain only letters and spaces.",
  "Username must be unique, 3 to 12 characters long, and include only letters, numbers and underscore(_).",
  "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character. (e.g., !@#$%^&*()_+-=)"
]

const SignUp = () => {

  const { signUpAPI } = useAuthAPI()

  const { usernameCheckerAPI } = useDraftsAPI()

  const { createNotification } = useNotificationContext()

  const [guidelinesOpen, setGuidelinesOpen] = useState(true)
  const guidelinesHandler = () => {
    setGuidelinesOpen(prev => !prev)
  }
  const [aiOpen, setAiOpen] = useState(true)
  const aiHandler = () => {
    setAiOpen(prev => !prev)
  }

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
    rePassword: false,
    passwordNotMatch: false,
    usernameStatus: false
  })

  const [usernameStatus, setUsernameStatus] = useState< 0 | 1 | 2 | 3 | 4 >(0)
  // 0 - Empty | 1 - Available | 2 - Not available | 3 - Error | 4 - Invalid
  const usernameHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentUsername = e.target.value
    setUsername(currentUsername)
    setFormErrors({...formErrors, username: false})
    if (currentUsername === '') {
      setUsernameStatus(0)
      return
    }
    const usernameRegex = /^[A-Za-z0-9_]{3,12}$/
    if (!usernameRegex.test(currentUsername)) {
      setUsernameStatus(4)
      return
    }
    const status = await usernameCheckerAPI(currentUsername)
    setUsernameStatus(status)
  }

  const [btnsDisable, setBtnsDisable] = useState(false)
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBtnsDisable(true)
    const nameRegex = /^[A-Za-z\s]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const usernameRegex = /^[A-Za-z0-9_]{3,12}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=]).+$/
    const errors = {
      firstName: firstName.trim().length < 2 || !nameRegex.test(firstName.trim()),
      middleName: middleName.trim() !== '' && !nameRegex.test(middleName.trim()),
      lastName: lastName.trim().length < 2 || !nameRegex.test(lastName.trim()),
      email: !emailRegex.test(email.trim()),
      username: username.trim().length < 3 || username.trim().length > 12 || !usernameRegex.test(username.trim()),
      password: password.trim().length < 8 || !passwordRegex.test(password.trim()),
      rePassword: rePassword.trim().length < 8 || !passwordRegex.test(rePassword.trim()),
      passwordNotMatch: password !== rePassword,
      usernameStatus: usernameStatus === 1 ? false : true
    }
    setFormErrors(errors)
    const hasError = Object.values(errors).some(v => v)
    if (!hasError) {
      await signUpAPI({ firstName, middleName, lastName, email, username, password })
    } else {
      createNotification({
        title: "Invalid Input",
        message: "Please check your entered details and try again.",
        type: "error"
      })
    }
    setBtnsDisable(false)
  }

  const AIFeatures = [
    "Turn long notes into clear summaries with Summarization.",
    "Add more depth and detail to your ideas through Expansion and Extension.",
    "Refine and polish your writing with better wording and flow.",
    "Translate your notes instantly into different languages.",
    "Keep your content accurate and error-free with Grammar & Spell Check.",
    "Adjust the tone of your writing to suit the context: Formal, Casual, Professional, Academic, or Creative."
  ]

  return (
    <div className="min-h-screen sm:h-screen w-full bg-[var(--blue-1)] p-4 sm:p-6 flex items-center justify-end sm:justify-center flex-col-reverse sm:flex-row gap-4 sm:gap-6">
      <div className="bg-[var(--white-2)] h-fit sm:h-[calc(100vh-48px)] max-h-200 w-full sm:max-w-[min(520px,50%)] rounded-xl">
        <form
          action="#"
          onSubmit={submitHandler}
          className="w-full h-full rounded-xl p-6 flex justify-between flex-col gap-6 overflow-auto"
        >
          <div className="w-full">
            <div className="text-2xl sm:text-3xl">Sign up</div>
            <div className="text-sm mt-1.5 flex gap-x-1 flex-wrap">
              Already have an account?
              <NavLink
                to='/signin'
                className='text-[var(--blue-2)]'
              >
                Sign In
              </NavLink>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-wrap gap-4">
                <div className="w-full md:max-w-[calc(50%-8px)]">
                  <Input
                    value={firstName}
                    setValue={setFirstName}
                    placeholder="First Name"
                    type="text"
                    errorClassConditioner={formErrors.firstName}
                    disabled={btnsDisable}
                    resetter={() => setFormErrors({...formErrors, firstName: false})}
                  />
                </div>
                <div className="w-full md:max-w-[calc(50%-8px)]">
                  <Input
                    value={middleName}
                    setValue={setMiddleName}
                    placeholder="Middle Name"
                    type="text"
                    errorClassConditioner={formErrors.middleName}
                    disabled={btnsDisable}
                    resetter={() => setFormErrors({...formErrors, middleName: false})}
                  />
                </div>
                <div className="w-full md:max-w-[calc(50%-8px)]">
                  <Input
                    value={lastName}
                    setValue={setLastName}
                    placeholder="Last Name"
                    type="text"
                    errorClassConditioner={formErrors.lastName}
                    disabled={btnsDisable}
                    resetter={() => setFormErrors({...formErrors, lastName: false})}
                  />
                </div>
              </div>
              <Input
                value={email}
                setValue={setEmail}
                placeholder="Email Address"
                type="text"
                errorClassConditioner={formErrors.email}
                disabled={btnsDisable}
                resetter={() => setFormErrors({...formErrors, email: false})}
              />
              <div>
                <Input
                  value={username}
                  setValue={setUsername}
                  placeholder="Create your username"
                  type="text"
                  errorClassConditioner={formErrors.username}
                  disabled={btnsDisable}
                  resetter={() => setFormErrors({...formErrors, username: false})}
                />
                <div
                  className={cn(
                    'w-full h-fit overflow-hidden px-2.5 duration-500',
                    usernameStatus === 0 ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
                  )}
                >
                  {usernameStatus === 1 && (
                    <span className="text-xs font-normal text-[var(--green-1)]">Username available</span>
                  )}
                  {usernameStatus === 2 && (
                    <span className="text-xs font-normal text-[var(--red-4)]">Username already taken</span>
                  )}
                  {usernameStatus === 3 && (
                    <span className="text-xs font-normal text-[var(--red-3)]">Can't get username status</span>
                  )}
                  {usernameStatus === 4 && (
                    <span className="text-xs font-normal text-[var(--red-4)]">Invalid username</span>
                  )}
                </div>
              </div>
              <Input
                value={password}
                setValue={setPassword}
                placeholder="Create password"
                type="password"
                errorClassConditioner={formErrors.password || formErrors.passwordNotMatch}
                disabled={btnsDisable}
                resetter={() => setFormErrors({...formErrors, password: false, passwordNotMatch: false})}
              />
              <Input
                value={rePassword}
                setValue={setRePassword}
                placeholder="Re-enter your password"
                type="password"
                errorClassConditioner={formErrors.rePassword || formErrors.passwordNotMatch}
                disabled={btnsDisable}
                resetter={() => setFormErrors({...formErrors, rePassword: false, passwordNotMatch: false})}
              />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-[var(--blue-2)] text-[var(--white-1)] rounded-full px-4.5 py-2 cursor-pointer outline-0 outline-[var(--blue-1)] hover:outline-6 active:scale-96 duration-250 disabled:hover:outline-0  disabled:active:scale-100 disabled:opacity-75"
              disabled={btnsDisable}
            >
              {btnsDisable ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full sm:w-[calc(100%-min(544px,50%))] sm:max-w-[min(600px,50%)] sm:h-[calc(100vh-48px)] flex flex-col">
        <div className="w-full h-11 flex items-end justify-end">
          <div className="h-3 w-3 bg-[var(--white-2)] sm:bg-[var(--white-3)]">
            <div className="h-full w-full bg-[var(--blue-1)] rounded-br-xl"></div>
          </div>
          <div className="w-fit h-hull bg-[var(--white-2)] sm:bg-[var(--white-3)] px-5 py-2 rounded-tl-xl rounded-tr-xl text-lg font-[500] tracking-[3px]">
            DRAFTS
          </div>
        </div>
        <div className="h-fit sm:h-[calc(100%-44px)] bg-[var(--white-2)] sm:bg-[var(--white-3)] p-2.5 sm:p-3 rounded-tl-xl rounded-b-xl flex flex-col overflow-hidden">
          <div className="w-full sm:h-[calc(50%-20px)]">
            <div
              className="w-full flex items-center gap-2.5 p-1 rounded-lg select-none duration-300"
              onClick={guidelinesHandler}
            >
              <div className="text-base sm:text-lg font-[400]">Sign Up Guidelines</div>
              <div className="flex justify-center items-center p-1 rounded-full bg-[var(--blue-1)] sm:hidden">
                <div className={`duration-300 ${guidelinesOpen ? 'rotate-x-180' : ''}`}>
                  <Arrow2 color="#347CE9"/>
                </div>
              </div>
            </div>
            <div className="w-full h-full max-h-[calc(100%-40px)] px-3 relative duration-300">
              <div className={cn(
                'overflow-auto duration-400',
                guidelinesOpen ? 'pt-0.5 pb-2 max-h-85 sm:max-h-full opacity-100' : 'max-h-0 opacity-0'
              )}>
                {authGuidelines.map((g, i) => (
                  <div
                    key={i}
                    className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl"
                  >
                    {g}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="w-9/10 mx-auto border-[var(--black-1)] opacity-30 my-2" />
          <div className="w-full max-h-[calc(50%-20px)] flex flex-col">
            <div
              className="w-full flex items-center gap-2.5 p-1 rounded-lg select-none duration-300"
              onClick={aiHandler}
            >
              <span className="text-base sm:text-lg font-[400] bg-[linear-gradient(to_right,#dc2626_0%,#f97316_20%,#facc15_40%,#4ade80_60%,#3b82f6_80%,#6366f1_100%)] bg-clip-text text-transparent">Introducing AI features</span>
              <img
                className="w-6.5 h-6.5 aspect-square"
                src={ai}
                alt="ai"
              />
              <div className="flex justify-center items-center p-1 rounded-full bg-[var(--blue-1)] sm:hidden">
                <div className={cn(
                  'duration-300',
                  aiOpen && 'rotate-x-180'
                )}>
                  <Arrow2 color="#347CE9"/>
                </div>
              </div>
            </div>
            <div className={cn(
              'overflow-auto w-full h-full px-3 relative duration-300',
              aiOpen ? 'mt-3 max-h-85 sm:max-h-full opacity-100' : 'max-h-0 opacity-0'
            )}>
              <div className={cn(
                'w-full overflow-auto duration-300 flex gap-2.5 flex-col-reverse lg:flex-row',
                aiOpen ? 'pt-0.5 max-h-[calc(100%-28px)] sm:max-h-full opacity-100' : 'max-h-0 opacity-0'
              )}>
                <div className="w-full lg:w-1/2">
                  {AIFeatures.map((a, i) => (
                    <div
                      key={i}
                      className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl"
                    >
                      {a}
                    </div>
                  ))}
                </div>
                <div className="max-w-full lg:w-1/2 lg:sticky top-0 rounded-xl">
                  <img 
                    className="w-full h-full max-h-[30vh] sm:max-h-[50vh] object-cover rounded-xl"
                    src="/images/aiShow.png" 
                    alt="Side Banner" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp