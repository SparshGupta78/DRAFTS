import { useState, type FormEvent } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import ai from '../assets/ai.svg'
import type { AuthResponseType } from "../types/authResponse.type"
import { signInAPI } from "../services/auth.service"
import { useNotificationContext } from "../contexts/notification.context"

const SignIn = () => {

  const navigate = useNavigate()

  const { createNotification } = useNotificationContext()

  const [aiOpen, setAiOpen] = useState(true)
  const aiHandler = () => {
    setAiOpen(prev => !prev)
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [formErrors, setFormErrors] = useState({
    username: false,
    password: false
  })

  const [btnsDisable, setBtnsDisable] = useState(false)
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBtnsDisable(true)

    const usernameRegex = /^[A-Za-z0-9_]{3,12}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=]).+$/

    const errors = {
      username: username.trim().length < 3 || username.trim().length > 12 || !usernameRegex.test(username.trim()),
      password: password.trim().length < 8 || !passwordRegex.test(password.trim())
    }

    setFormErrors(errors)

    const hasError = Object.values(errors).some(v => v)
    if (hasError) {
      createNotification({
        title: "Invalid Input",
        message: "Please check your entered details and try again.",
        type: "error"
      })
      setBtnsDisable(false)
      return
    }

    try {
      const res = await signInAPI({ username, password })
      const response: AuthResponseType | null = res.data

      if (!response?.token) {
        createNotification({
          title: "Something Went Wrong",
          message: "Signin could not be completed at this moment. Please try again shortly.",
          type: "error"
        })
        setBtnsDisable(false)
        return
      }
      localStorage.setItem('token', JSON.stringify({token: response.token, createdAt: Date.now()}))
      navigate(`/${username}`)
    } catch (err: any) {
      createNotification({
        title: "Invalid Credentials",
        message: err.response?.data?.error || "The username or password you entered is incorrect.",
        type: "error"
      })
    }

    setBtnsDisable(false)
  }

  return (
    <div className="min-h-screen sm:h-screen w-full bg-[var(--blue-1)] p-4 sm:p-6 flex items-center justify-end sm:justify-center flex-col-reverse sm:flex-row gap-4 sm:gap-6">
      <div className="bg-[var(--white-2)] h-fit max-h-200 sm:h-[calc(100vh-48px)] w-full sm:max-w-[min(520px,50%)] rounded-xl">
        <form action="#" onSubmit={submitHandler} className="w-full h-full min-h-100 rounded-xl p-6 flex justify-between flex-col gap-6 overflow-auto">
          <div className="w-full">
            <div className="text-2xl sm:text-3xl">Sign in</div>
            <div className="text-sm mt-1.5 flex gap-x-1 flex-wrap">Don't have an account?<NavLink to='/signup' className='text-[var(--blue-2)]'>Sign Up</NavLink></div>
          </div>
          <div className="w-full flex flex-col gap-4">
              <div className="relative">
                <input 
                  className={`w-full border-1 rounded-full pl-4.5 pr-9 py-2 duration-100 placeholder:text-[var(--black-2)] text-[15px] ${formErrors.username ? 'border-[var(--red-1)] outline-4 outline-[var(--red-2)]' : 'border-[var(--black-1)] outline-0 outline-[var(--blue-1)] hover:outline-4 active:outline-4 focus:outline-6 focus:border-[var(--blue-2)] disabled:hover:outline-0 disabled:active:outline-0 disabled:opacity-60'}`} 
                  type="text" 
                  name="username" 
                  placeholder="Enter username" 
                  value={username} 
                  onChange={
                    (e) => {
                      setUsername(e.target.value)
                      setFormErrors({...formErrors, username: false})
                    }
                  } 
                  disabled={btnsDisable}
                />
                <div 
                  className={`absolute right-[8px] top-1/2 translate-y-[-50%] items-center justify-center rounded-full ${(username != '' && !btnsDisable) ? 'flex' : 'hidden'}`}
                  onClick={() => setUsername('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_4418_6158)">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#4c4c4c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <g opacity="0.4">
                        <path d="M9.16992 14.8299L14.8299 9.16992" stroke="#4c4c4c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.8299 14.8299L9.16992 9.16992" stroke="#4c4c4c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_6158">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="relative">
                <input 
                  className={`w-full border-1 rounded-full pl-4.5 pr-9 py-2 duration-100 placeholder:text-[var(--black-2)] text-[15px] ${formErrors.password ? 'border-[var(--red-1)] outline-4 outline-[var(--red-2)]' : 'border-[var(--black-1)] outline-0 outline-[var(--blue-1)] hover:outline-4 active:outline-4 focus:outline-6 focus:border-[var(--blue-2)] disabled:hover:outline-0 disabled:active:outline-0 disabled:opacity-60'}`}
                  type="password" 
                  name="password" 
                  placeholder="Enter password" 
                  value={password} 
                  onChange={
                    (e) => {
                      setPassword(e.target.value)
                      setFormErrors({...formErrors, password: false})
                    }
                  } 
                  disabled={btnsDisable}
                  />
                <div 
                  className={`absolute right-[8px] top-1/2 translate-y-[-50%] items-center justify-center rounded-full ${(password != '' && !btnsDisable) ? 'flex' : 'hidden'}`}
                  onClick={() => setPassword('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_4418_6158)">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#4c4c4c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <g opacity="0.4">
                        <path d="M9.16992 14.8299L14.8299 9.16992" stroke="#4c4c4c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.8299 14.8299L9.16992 9.16992" stroke="#4c4c4c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_6158">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
          </div>
          <div className="w-full">
            <button type="submit" className="w-full bg-[var(--blue-2)] text-[var(--white-1)] rounded-full px-4.5 py-2 cursor-pointer outline-0 outline-[var(--blue-1)] hover:outline-6 active:scale-96 duration-250
            disabled:hover:outline-0 disabled:active:scale-100 disabled:opacity-75" disabled={btnsDisable}>
              {btnsDisable ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full sm:w-[calc(100%-min(544px,50%))] sm:max-w-[min(600px,50%)] max-h-200 sm:h-[calc(100vh-48px)] flex flex-col">
        <div className="w-full h-11 flex items-end justify-end">
          <div className="h-3 w-3 bg-[var(--white-2)] sm:bg-[var(--white-3)]">
            <div className="h-full w-full bg-[var(--blue-1)] rounded-br-xl"></div>
          </div>
          <div className="w-fit h-hull bg-[var(--white-2)] sm:bg-[var(--white-3)] px-5 py-2 rounded-tl-xl rounded-tr-xl text-lg font-[500] tracking-[3px]">DRAFTS</div>
        </div>
        <div className="h-fit sm:h-[calc(100%-44px)] bg-[var(--white-2)] sm:bg-[var(--white-3)] p-2.5 sm:p-3 rounded-tl-xl rounded-b-xl flex flex-col overflow-hidden w-full">
          <div className="w-full flex items-center gap-2.5 p-1 rounded-lg select-none duration-300 cursor-pointer" onClick={aiHandler}>
            <span className="text-base sm:text-lg font-[400] bg-[linear-gradient(to_right,#dc2626_0%,#f97316_20%,#facc15_40%,#4ade80_60%,#3b82f6_80%,#6366f1_100%)] bg-clip-text text-transparent">Introducing AI features</span>
            <img className="w-6.5 h-6.5 aspect-square" src={ai} alt="ai" />
            <div className="flex justify-center items-center p-1 rounded-full bg-[var(--blue-1)] sm:hidden">
                <div className={`duration-300 ${aiOpen ? 'rotate-x-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#347ce9">
                      <path d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z" fill="white" style={{ fill: "var(--fillg)" }} />
                      <path opacity="0.4" d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z" fill="white" style={{ fill: "var(--fillg)" }} />
                  </svg>
                </div>
            </div>
          </div>
          <div className={`overflow-auto w-full h-full px-3 relative duration-300 ${aiOpen ? 'mt-3 max-h-85 sm:max-h-full opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className={`w-full overflow-auto duration-300 flex gap-2.5 flex-col-reverse ${aiOpen ? 'pt-0.5 max-h-[calc(100%-28px)] sm:max-h-full opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="w-full">
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Turn long notes into clear summaries with Summarization.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Add more depth and detail to your ideas through Expansion and Extension.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Refine and polish your writing with better wording and flow.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Translate your notes instantly into different languages.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Keep your content accurate and error-free with Grammar & Spell Check.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Adjust the tone of your writing to suit the context: Formal, Casual, Professional, Academic, or Creative.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Turn long notes into clear summaries with Summarization.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Add more depth and detail to your ideas through Expansion and Extension.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Refine and polish your writing with better wording and flow.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Translate your notes instantly into different languages.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Keep your content accurate and error-free with Grammar & Spell Check.
                </div>
                <div className="text-[15px] before:content-['•\00a0'] before:color-[var(--black-1)] before:text-xl">
                  Adjust the tone of your writing to suit the context: Formal, Casual, Professional, Academic, or Creative.
                </div>
              </div>
              <div className="w-full rounded-xl">
                <img 
                  className="w-full max-h-[30vh] sm:max-h-[40vh] object-cover rounded-xl"
                  src="/images/sideBanner.webp" 
                  alt="Side Banner" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn