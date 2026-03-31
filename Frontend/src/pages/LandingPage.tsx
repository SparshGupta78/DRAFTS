import { useEffect, useState } from "react"
import Bg from "../assets/Bg"
import { useWindowWidthContext } from "../contexts/windowWidth.context"
import { cn } from "../utils/cn"

const Card = ({title, imgSrc}: {title: string, imgSrc: string}) => {
  return (
    <div className="w-full max-w-100 sm:w-60 lg:w-70 h-fit border-8 border-[var(--white-1)] flex flex-col items-center rounded-xl">
      <div className="w-fit max-w-full flex">
        <div className="w-3 h-3 bg-[var(--white-1)]">
          <div className="w-full h-full bg-[var(--black-6)] rounded-tr-xl" />
        </div>
        <div className="px-3 pb-1.5 w-full max-w-[calc(100%-24px)] text-xs font-normal text-[var(--black-2)] bg-[var(--white-1)] rounded-b-xl whitespace-nowrap truncate">
          {title}
        </div>
        <div className="w-3 h-3 bg-[var(--white-1)]">
          <div className="w-full h-full bg-[var(--black-6)] rounded-tl-xl" />
        </div>
      </div>
      <div className="p-2.5">
        <img
          src={imgSrc}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  )
}

const LandingPage = () => {

  const windowWidth = useWindowWidthContext()

  const [sec3Pos, setSec3Pos] = useState<1 | 2 | 3 | 4>(1)
  const [sec3Progress, setSec3Progress] = useState(0)

  const updateSec3Pos = (pos: 1 | 2 | 3 | 4) => {
    if(sec3Pos === pos) return
    setSec3Pos(pos)
    setSec3Progress(0)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSec3Progress(prev => {
        if (prev >= 100) {
          setSec3Pos(p => (p === 4 ? 1 : (p + 1) as 2 | 3 | 4))
          return 0
        }
        return prev + 0.1
      })
    }, 10)
    return () => clearInterval(interval)
  }, [])

  const sec3Info = {
    1: {
      imgSrc: "/images/sec-3-i1.png",
      title: "Simple, Focused Editor",
      content: "A clean interface designed to keep your attention on writing, not controls. Everything stays out of the way until you need it, so you can focus on your content without distractions. Write naturally without worrying about formatting — your notes stay clear, readable, and easy to shape as they grow."
    },
    2: {
      imgSrc: "/images/sec-3-i2.png",
      title: "Everything Stays Organized",
      content: "Keep all your notes in one place with a structure that stays easy to navigate as your content grows. Whether it's quick ideas or detailed documents, everything remains accessible and easy to manage. Find what you need quickly, revisit your work effortlessly, and keep your writing environment clean over time."
    },
    3: {
      imgSrc: "/images/sec-3-i3.png",
      title: "Export Your Notes, Your Way",
      content: "Convert your notes into organized files with support for multiple formats and optional data inclusion. Generate structured outputs that fit your workflow and can be used across different contexts."
    },
    4: {
      imgSrc: "/images/sec-3-i4.png",
      title: "Help When You Need It",
      content: "Subtle assistance is always available to support your writing without getting in the way. Whether you're refining a sentence or expanding an idea, help is there when you need it — and stays out when you don't. Everything works in the background, so your writing experience remains smooth and uninterrupted."
    }
  }

  return (
    <div className="w-fdull h-dvh p-3 sm:p-5 bg-[var(--white-1)]">
      <div className="fixed top-0 left-0 z-10">
        <div className="flex">
          <div className="bg-[var(--white-1)] px-4 py-3 text-lg font-[550] tracking-[3px] rounded-br-xl">DRAFTS</div>
          <div className="mt-3 sm:mt-5 w-3 h-3 bg-[var(--white-1)]">
            <div className="w-full h-full bg-[var(--blue-1)] rounded-tl-xl"></div>
          </div>
        </div>
        <div className="ml-3 sm:ml-5 w-3 h-3 bg-[var(--white-1)]">
          <div className="w-full h-full bg-[var(--blue-1)] rounded-tl-xl"></div>
        </div>
      </div>
      <div className="fixed top-0 right-0 z-10 flex flex-col items-end">
        <div className="flex">
          <div className="mt-3 sm:mt-5 w-3 h-3 bg-[var(--white-1)]">
            <div className="w-full h-full bg-[var(--blue-1)] rounded-tr-xl"></div>
          </div>
          <div className="bg-[var(--white-1)] px-4 py-3 rounded-bl-xl">
            <div className="rounded-full bg-[var(--blue-1)] flex items-center">
              <div className="text-sm pl-4 pr-3.5 font-normal text-[var(--black-2)] cursor-default hover:opacity-75 duration-300">Login</div>
              <div className="bg-[var(--blue-2)] text-[var(--white-5)] text-sm px-3.5 py-1 rounded-full font-normal cursor-default hover:scale-96 duration-300">Start Writing</div>
            </div>
          </div>
        </div>
        <div className="mr-3 sm:mr-5 w-3 h-3 bg-[var(--white-1)]">
          <div className="w-full h-full bg-[var(--blue-1)] rounded-tr-xl"></div>
        </div>
      </div>
      <div className="w-full h-full overflow-x-hidden overflow-y-scroll rounded-xl">
        <div className="rounded-xl bg-[var(--blue-1)] relative">
          <div className="z-5">
            <div className="px-4 sm:px-8 pb-10 pt-60">
              <div className="text-2xl sm:text-3xl md:text-4xl font-normal">
                Write, Improve, and Organize Your Ideas
              </div>
              <div className="mt-6 sm:mt-3 text-sm sm:text-lg text-[var(--black-2)]">
                Capture your thoughts, improve your writing with AI, and keep everything organized in one clean workspace.
              </div>
            </div>
            <div className="px-2.5 sm:px-4 pt-15 pb-10">
              <div className="flex flex-col items-center">
                <div className="w-fit flex items-end">
                  <div className="w-3 h-3 bg-[var(--white-1)]">
                    <div className="w-full h-full rounded-br-xl bg-[var(--blue-1)]"></div>
                  </div>
                  <div className="px-4 py-1.5 rounded-t-xl bg-[var(--white-1)] text-sm font-normal">
                    AI-Powered Writing Workspace
                  </div>
                  <div className="w-3 h-3 bg-[var(--white-1)]">
                    <div className="w-full h-full rounded-bl-xl bg-[var(--blue-1)]"></div>
                  </div>
                </div>
                <div className="w-full max-w-100 sm:max-w-300 p-2.5 sm:p-4 bg-[var(--white-1)] rounded-2xl duration-100">
                  <img
                    src={cn(windowWidth > 640 ? '/images/hero-i1.png' : '/images/hero-i2.png')}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute z-0 top-0 right-0 -mr-18 sm:mr-10 my-20 ml-auto w-full min-w-220 max-w-300 pointer-events-none">
            <Bg />
          </div>
        </div>
        <div className="w-full px-4 py-8 sm:px-6 sm:py-10 bg-[var(--white-1)] flex justify-center">
          <div className="p-4 sm:p-6 w-full max-w-300 h-full rounded-xl shadow-[var(--shadow-1)] border-8 border-[var(--white-1)] bg-[var(--black-6)] flex flex-col gap-4 sm:gap-6">
            <div className="w-full flex not-lg:flex-col items-center justify-evenly gap-4 sm:gap-6">
              <div className="not-sm:py-8 p-4 w-fit flex flex-col items-center justify-center gap-2 text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-normal">
                  Writing Shouldn't Feel This Hard
                </div>
                <div className="text-xs sm:text-sm md:text-base text-[var(--black-2)]">
                  Most tools help you store notes — not improve them.
                </div>
              </div>
              <div className="w-fit flex not-sm:flex-col justify-evenly gap-4 sm:gap-6">
                <Card
                  title={"Limited Tools, Limited Expression"}
                  imgSrc="/images/sec-2-i1.png"
                />
                <Card
                  title={"Unorganized Notes"}
                  imgSrc="/images/sec-2-i2.png"
                />
              </div>
            </div>
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-fit max-w-full flex not-sm:flex-col gap-6 lg:-translate-x-1/4">
                <Card
                  title="Struggling to Start Writing"
                  imgSrc="/images/sec-2-i3.png"
                />
                <Card
                  title="No Built-in Intelligence"
                  imgSrc="/images/sec-2-i4.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-xl bg-[var(--blue-1)] p-4">
          <div className="w-full max-w-150 not-lg:mx-auto p-4 not-lg:text-center">
            <div className="text-2xl md:text-3xl font-normal">
              Meet Drafts
            </div>
            <div className="mt-2.5 text-[var(--black-2)] text-sm md:text-base">
              A writing experience that brings structure, clarity, and intelligent assistance into one place — so you can focus on what matters.
            </div>
          </div>
          <div className="py-8 w-full flex justify-center">
            <div className="w-full max-w-175 lg:max-w-320">
              <div className="w-full h-fit lg:max-h-100 flex not-lg:flex-col-reverse items-end">
                <div className="w-full lg:w-47/100 flex not-lg:flex-col-reverse h-fit lg:h-37">
                  <div className="w-full lg:w-[calc(100%-12px)] h-fit lg:h-full bg-[var(--white-1)] rounded-xl p-2.5 sm:p-4 flex flex-col justify-center">
                    <div className="text-sm sm:h-6 font-normal whitespace-nowrap truncate">
                      {sec3Info[sec3Pos].title || ""}
                    </div>
                    <div className="w-full h-[calc(100%-24px)] mt-1 text-xs sm:text-sm text-[var(--black-2)] overflow-y-scroll">
                      <div className="w-full h-fit">
                        {sec3Info[sec3Pos].content || ""}
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-3 h-3 lg:h-full flex lg:flex-col justify-between bg-[var(--white-1)]">
                    <div className="bg-[var(--blue-1)] w-2/10 lg:w-full h-full lg:h-3/10 not-lg:rounded-r-xl lg:rounded-b-xl"></div>
                    <div className="bg-[var(--blue-1)] w-2/10 lg:w-full h-full lg:h-3/10 not-lg:rounded-l-xl lg:rounded-t-xl"></div>
                  </div>
                </div>
                <div className="w-full lg:w-53/100 h-fit lg:h-full bg-[var(--white-1)] rounded-2xl p-1.5 sm:p-2.5">
                  <img
                    src={sec3Info[sec3Pos].imgSrc}
                    alt="Image 1"
                    className="w-full h-full object-cover rounded-xl aspect-2/1"
                  />
                </div>
              </div>
              <div className="mt-3 w-full h-fit lg:flex">
                <div className="w-full lg:w-47/100 px-1.5">
                  <div className="w-full lg:w-[calc(100%-12px)] bg-[var(--white-1)] h-1.5 rounded-xl">
                    <div
                      className="w-60/100 h-full bg-[var(--blue-2)] rounded-xl"
                      style={{width: sec3Progress + "%"}}
                    />
                  </div>
                </div>
                <div className="w-full not-lg:mt-3 lg:w-53/100 px-1.5">
                  <div className="w-full grid grid-cols-4 gap-3">
                    <div
                      className={cn(
                        "aspect-auto bg-[var(--white-1)] rounded-md sm:rounded-xl p-0.25 sm:p-0.75 border-2 duration-500",
                        sec3Pos === 1 ? ' border-[var(--blue-2)]' : ' border-[var(--white-1)] hover:scale-96 active:scale-92'
                      )}
                      onClick={() => updateSec3Pos(1)}
                    >
                      <img
                        src="/images/sec-3-i1.png"
                        className="w-full h-full object-cover rounded-md sm:rounded-md"
                      />
                    </div>
                    <div
                      className={cn(
                        "aspect-auto bg-[var(--white-1)] rounded-md sm:rounded-xl p-0.25 sm:p-0.75 border-2 duration-500",
                        sec3Pos === 2 ? ' border-[var(--blue-2)]' : ' border-[var(--white-1)] hover:scale-96 active:scale-92'
                      )}
                      onClick={() => updateSec3Pos(2)}
                    >
                      <img
                        src="/images/sec-3-i2.png"
                        className="w-full h-full object-cover rounded-md sm:rounded-md"
                      />
                    </div>
                    <div
                      className={cn(
                        "aspect-auto bg-[var(--white-1)] rounded-md sm:rounded-xl p-0.25 sm:p-0.75 border-2 duration-500",
                        sec3Pos === 3 ? ' border-[var(--blue-2)]' : ' border-[var(--white-1)] hover:scale-96 active:scale-92'
                      )}
                      onClick={() => updateSec3Pos(3)}
                    >
                      <img
                        src="/images/sec-3-i3.png"
                        className="w-full h-full object-cover rounded-md sm:rounded-md"
                      />
                    </div>
                    <div
                      className={cn(
                        "aspect-auto bg-[var(--white-1)] rounded-md sm:rounded-xl p-0.25 sm:p-0.75 border-2 duration-500",
                        sec3Pos === 4 ? ' border-[var(--blue-2)]' : ' border-[var(--white-1)] hover:scale-96 active:scale-92'
                      )}
                      onClick={() => updateSec3Pos(4)}
                    >
                      <img
                        src="/images/sec-3-i4.png"
                        className="w-full h-full object-cover rounded-md sm:rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage