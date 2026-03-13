import React, { useState, type ReactNode } from 'react'
import { ArrowDown, Info } from '../../assets/Icons'
import DialogWrapper from '../DialogWrapper/DialogWrapper'
import { AI as AiIcon } from "../../assets/Icons"
import DropDown from '../DropDown/DropDown'
import DropDownItem from '../DropDown/DropDownItem'
import { cn } from '../../utils/cn'
import type { Content } from '../../types/tiptap.type'
import { extractHTML } from '../../utils/tiptapHTMLExtractor'
import type { JSONContent } from '@tiptap/core'

type btnProps = {
  type: string,
  value?: actionType,
  content: ReactNode,
  options?: string[]
}

type actionType = '' | 'Generate Heading' | 'Extract Tags' | 'Summarize' | 'Expand' | 'Rephrase' | 'Grammar & Spell Check' | 'Formal' | 'Casual' | 'Professional' | 'Academic' | 'Creative'

type ButtonProps = {
  btn: btnProps,
  selected?: boolean,
  onClick?: () => void
}

const Button = ({
  btn,
  selected=false,
  onClick
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'border-2 border-[var(--white-3)] bg-[var(--blue-1)] px-2.5 py-1.5 rounded-lg text-[13px] text-[var(--black-2)] font-normal whitespace-nowrap duration-200',
        selected ? 'border-[var(--blue-2)]' : 'border-[var(--white-3)] hover:opacity-75 active:scale-96'
      )}
      onClick={() => {
        if(onClick) onClick()
      }}
    >
      {btn.content}
    </button>
  )
}

type props = {
  aiOpen: boolean,
  setAiOpen: React.Dispatch<React.SetStateAction<boolean>>
  content: Content
}

const AI = ({
  aiOpen,
  setAiOpen,
  content
}: props) => {

  const [action, setAction] = useState<actionType>('')

  const generalBtns: btnProps[] = [
    {
      type: "button",
      value: "Generate Heading",
      content: "Generate Heading",
    },
    {
      type: "button",
      value: "Extract Tags",
      content: "Extract Tags",
    }
  ]

  const noteBtns: btnProps[] = [
    {
      type: "button",
      value: "Summarize",
      content: "Summarize",
    },
    {
      type: "button",
      value: "Expand",
      content: "Expand",
    },
    {
      type: "button",
      value: "Rephrase",
      content: "Rephrase",
    },
    {
      type: "button",
      value: "Grammar & Spell Check",
      content: "Grammar & Spell Check",
    },
    {
      type: "dropdown",
      content: (
        <div className='flex items-center justify-center gap-2'>
          {action !== '' && ["Formal", "Casual", "Professional", "Academic", "Creative"].includes(action) ? action : "Tone Adjustment"}
          <span className='rotate-z-180'><ArrowDown dimension={12} color='#4C4C4C' /></span>
        </div>
      ),
      options: ["Formal", "Casual", "Professional", "Academic", "Creative"]
    }
  ]

  const contentHTML =
  content && typeof content !== 'string' && !Array.isArray(content)
    ? extractHTML(content as JSONContent)
    : ''

  return (
    <DialogWrapper
      open={aiOpen}
      setOpen={setAiOpen}
      header={"AI Features"}
      onClose={() => setAction('')}
    >
      <div className="h-full w-full overflow-y-scroll">
        <div className="p-2.5 w-full h-fit min-h-full flex flex-col justify-between gap-2.5">
          <div className="w-full flex flex-col gap-2.5">
            <div className="p-2.5 border-1 border-[var(--black-4)] rounded-lg">
              <div className="px-2.5 pb-2.5 w-full flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className='rotate-180'>
                    <Info
                      dimension={16}
                      color='#4C4C4C'
                    />
                  </span>
                  <span className='text-sm'>
                    You can select any specific portion of your note to apply AI only to that section.
                  </span>
                </div>
                <div className='w-full sm:w-fit flex justify-end'>
                  <button
                    type="button"
                    className='w-fit text-sm text-[var(--blue-2)] font-normal whitespace-nowrap duration-300 hover:opacity-75 active:opacity-60'
                  >
                    Select All
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-4 bg-linear-to-b from-[var(--black-6)] to-transparent rounded-t-md"></div>
                <div className="p-2.5 bg-[var(--black-6)] rounded-md min-h-15 max-h-50 overflow-y-scroll">
                  <div
                    dangerouslySetInnerHTML={{__html: contentHTML}}
                    className="tiptap w-full rounded-md text-sm"
                  >
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-4 bg-linear-to-b from-transparent to-[var(--black-6)] rounded-b-md"></div>
              </div>
            </div>
            <div className="p-2.5 w-full border border-[var(--black-4)] rounded-lg">
              <div className="text-xs text-[var(--black-2)] mb-1.5">
                AI Output
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 w-full h-3 bg-gradient-to-b from-[var(--white-1)] to-transparent"></div>
                <div className="w-full min-h-15 max-h-60 overflow-y-scroll py-1.5">
                  <div className="w-full h-fit text-[15px]">
                    Nothing to show now.
                  </div>
                </div>
                <div className="absolute left-0 bottom-0 w-full h-3 bg-gradient-to-b from-transparent to-[var(--white-1)]"></div>
              </div>
            </div>
            <div className="p-2.5 w-full flex flex-col gap-2.5">
              <div className="w-full flex flex-wrap gap-1.5">
                {generalBtns.map((btn, i) => {
                  if(btn.type == "button") {
                    return (
                      <Button
                        key={i}
                        btn={btn}
                        selected={!!btn.value && action === btn.value}
                        onClick={() => btn.value && setAction(btn.value)}
                      />
                    )
                  }
                })}
              </div>
              <hr className='border-[var(--black-6)]' />
              <div className="w-full flex flex-wrap gap-1.5">
                {noteBtns.map((btn, i) => {
                  if(btn.type == "button") {
                    return (
                      <Button
                        key={i}
                        btn={btn}
                        selected={!!btn.value && action === btn.value}
                        onClick={() => btn.value && setAction(btn.value)}
                      />
                    )
                  }
                  else if(btn.type == "dropdown") {
                    return (
                      <DropDown
                      key={i}
                        trigger={
                          <Button
                            btn={btn}
                            selected={btn.options && btn.options.includes(action)}
                          />
                        }
                        preStyle={false}
                        contentStyle="mb-2.5 min-w-fit w-full p-1 bg-[var(--white-2)] shadow-[var(--shadow-1)] rounded-lg duration-300"
                        position='top'
                        onContentClickClose={true}
                      >
                        {btn.options?.map((option, i) => {
                          const l = btn.options?.length
                          return (
                            <React.Fragment key={i}>
                              <DropDownItem
                                setValue={setAction}
                                data={option}
                                preStyle={false}
                                className={cn(
                                  'text-[13px] text-nowrap px-2.25 py-1 rounded-md cursor-default duration-200',
                                  action === option ? 'text-[var(--blue-3)] font-normal' : 'text-[var(--black-3)] hover:opacity-60 active:scale-96'
                                )}
                              >
                                {option}
                              </DropDownItem>
                              { l && i !== (l - 1) && <hr className='w-9/10 mx-auto my-0.25 border-[var(--black-4)]' /> }
                            </React.Fragment>
                          )
                        })}
                      </DropDown>
                    )
                  }
                })}
              </div>
            </div>
          </div>
          <div className="p-2.5 w-full flex flex-col md:flex-row justify-between items-center gap-x-2.5 gap-y-5">
            <div className="flex items-center gap-2.5">
              <span>
                <Info dimension={18} color='#4C4C4C' />
              </span>
              <span className='text-sm text-[var(--black-2)]'>
                By accepting these AI-generated changes, the selected content will be permanently replaced. The previous version cannot be recovered.
              </span>
            </div>
            <div className="w-full md:w-fit flex justify-end">
              <button
                type="button"
                className='px-3 py-1.5 bg-[var(--blue-2)] rounded-lg flex items-center gap-1.5 duration-200 hover:opacity-75 active:scale-94'
              >
                <span>
                  <AiIcon dimension={20} color='#fff' />
                </span>
                <div className="text-[var(--white-1)] font-normal">Create</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  )
}

export default AI