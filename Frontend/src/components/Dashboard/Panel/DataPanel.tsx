import React, { useEffect, useState } from "react"
import type { SideBarNotesType } from "../../../types/titles.type"
import DropDown from "../../DropDown/DropDown"
import { ArrowDown, Export } from "../../../assets/Icons"
import DropDownItem from "../../DropDown/DropDownItem"

type props = {
  noteTitles: SideBarNotesType[]
}

type NotesSelectionType = SideBarNotesType & {
  selected: boolean
}

const DataPanel = ({noteTitles}: props) => {

  const [formatType, setFormatType] = useState<'Text' | 'JSON'>('Text')
  const [deleteVisibility, setDeleteVisibility] = useState<'Public' | 'Private'>('Public')

  const formatTypes = ['Text', 'JSON']
  const deleteVisibilities = ['Public', 'Private']
  
  const [notesSelection, setNotesSelection] = useState<NotesSelectionType[]>([])

  useEffect(() => {
    setNotesSelection(
      noteTitles.map(n => ({
        ...n,
        selected: false,
      }))
    )
  }, [noteTitles])

  const updateNoteSelection = (noteID: string) => {
    setNotesSelection(prev => (
      prev.map(n => n.noteID === noteID ? {...n, selected: !n.selected} : n)
    ))
  }

  const selectAllHandler = () => {
    setNotesSelection(prev => prev.map(n => (
      {...n, selected: true}
    )))
  }

  return (
    <div className="w-full p-2.5">
      <div className="w-full">
        <div className="text-sm font-normal text-[var(--black-2)]">
          Export notes
        </div>
        <hr className="my-1.5 w-full border-[var(--black-1)]" />
      </div>
      <div className="w-full p-2.5">
        <div className="text-[var(--black-3)] text-sm">
          Select notes and export them with the chosen format and options.
        </div>
        <div className="mt-3.5 mb-2.5 p-2.5 w-full border-1 border-[var(--black-4)] rounded-lg">
          <div className="w-full flex items-center justify-between gap-2.5">
            <div className="text-sm text-[var(--black-2)]">
              0 Notes selected
            </div>
            <button
              type="button"
              className="text-sm text-[var(--blue-2)] duration-300 hover:opacity-75"
              onClick={selectAllHandler}
            >
              Select all notes
            </button>
          </div>
          <div className="mt-2.5 w-full max-h-50 bg-[var(--black-6)] rounded-md overflow-x-hidden overflow-y-auto">
            <div className="w-full h-fit p-2.5 flex flex-col gap-2.5">
              {notesSelection.length > 0 ? (
                notesSelection.map((note, i) => {
                  return (
                    <React.Fragment key={note.noteID}>
                      <div
                        className="px-1.5 flex items-center gap-2.5"
                      >
                        <div className="">
                          <input
                            type="checkbox"
                            name=""
                            id={note.noteID}
                            className="scale-125 translate-y-0.25 accent-[var(--blue-3)]"
                            checked={note.selected}
                            onChange={() => updateNoteSelection(note.noteID)}
                          />
                        </div>
                        <label htmlFor={note.noteID} className="w-fit text-sm whitespace-nowrap truncate">
                          {note.title}
                        </label>
                      </div>
                      {i !== (noteTitles.length - 1) && (<hr className="w-full border-[var(--black-4)]" />)}
                    </React.Fragment>
                  )
                })
              ) : (
                <div className="px-2.5 py-4 w-full text-sm text-[var(--black-5)] text-center">No note found</div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2.5 flex items-center justify-between gap-2.5">
          <div>
            <div className='text-sm text-[var(--black-3)] font-normal'>Format Type</div>
            <div className='text-xs text-[var(--black-2)]'>Choose the format used for exporting data.</div>
          </div>
          <DropDown
            trigger={
              <button className="px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 hover:opacity-75 active:opacity-60">
                <span className='text-[13px] whitespace-nowrap'>{formatType}</span>
                <ArrowDown dimension={10} />
              </button>
            }
            preStyle={false}
            contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
            align='right'
            onContentClickClose={true}
          >
            {formatTypes && formatTypes.map((sp => {
              return (
                <DropDownItem
                  key={sp}
                  setValue={setFormatType}
                  data={sp}
                  preStyle={false}
                  className={`text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200 ${formatType === sp ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'}`}
                >
                  {sp}
                </DropDownItem>
              )
            }))}
          </DropDown>
        </div>
        <div className="px-2.5 w-full flex flex-wrap">
            <div className="py-2.5 w-full sm:w-1/2 flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="author"
                className="scale-125 translate-y-0.25 accent-[var(--blue-3)]"
              />
              <label htmlFor="author" className="w-fit text-sm whitespace-nowrap truncate">
                Include author info
              </label>
            </div>
            <div className="py-2.5 w-full sm:w-1/2 flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="includeTags"
                className="scale-125 translate-y-0.25 accent-[var(--blue-3)]"
              />
              <label htmlFor="includeTags" className="w-fit text-sm whitespace-nowrap truncate">
                Include tags
              </label>
            </div>
            <div className="py-2.5 w-full sm:w-1/2 flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="includeTimestamps"
                className="scale-125 translate-y-0.25 accent-[var(--blue-3)]"
              />
              <label htmlFor="includeTimestamps" className="w-fit text-sm whitespace-nowrap truncate">
                Include timestamps
              </label>
            </div>
            <div className="py-2.5 w-full sm:w-1/2 flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="visibility"
                className="scale-125 translate-y-0.25 accent-[var(--blue-3)]"
              />
              <label htmlFor="visibility" className="w-fit text-sm whitespace-nowrap truncate">
                Include visibility
              </label>
            </div>
            <div className="py-2.5 w-full sm:w-1/2 flex items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="pinned"
                className="scale-125 translate-y-0.25 accent-[var(--blue-3)]"
              />
              <label htmlFor="pinned" className="w-fit text-sm whitespace-nowrap truncate">
                Include pinned status
              </label>
            </div>
        </div>
        <div className="w-full flex justify-end">
          <button type="button" className="mt-2.5 pl-3 pr-4 py-1.5 bg-[var(--blue-2)] text-sm text-[var(--white-2)] rounded-md flex items-center gap-2 duration-300 hover:opacity-75 active:opacity-75">
            <Export dimension={18} color="#fff" />
            Export
          </button>
        </div>
      </div>
      <div className="mt-2.5 w-full">
        <div className="text-sm font-normal text-[var(--black-2)]">
          Storage usage
        </div>
        <hr className="my-1.5 w-full border-[var(--black-1)]" />
      </div>
      <div className="w-full p-2.5">
        <div className="flex items-center justify-between gap-2.5">
          <div className='text-sm text-[var(--black-3)]'>Total notes count</div>
          <div className="w-fit min-w-16 px-2.5 py-1 text-sm text-right text-[var(--black-2)] font-normal rounded-sm border-1 border-[var(--black-1)]">2</div>
        </div>
        <hr className="mt-2.5 w-full border-[var(--black-4)]" />
        <div className="mt-2.5 flex items-center justify-between gap-2.5">
          <div className='text-sm text-[var(--black-3)]'>Total storage used</div>
          <div className="w-fit min-w-16 px-2.5 py-1 text-sm text-right text-[var(--black-2)] font-normal rounded-sm border-1 border-[var(--black-1)]">32 kb</div>
        </div>
      </div>
      <div className="mt-2.5 w-full">
        <div className="text-sm font-normal text-[var(--black-2)]">
          Data deletion
        </div>
        <hr className="my-1.5 w-full border-[var(--black-1)]" />
      </div>
      <div className="mt-2.5 w-full bg-[var(--red-2)] rounded-lg">
        <div className="w-full p-2.5 flex items-center justify-between gap-2.5">
          <div>
            <div className='text-sm text-[var(--black-3)] font-normal'>Notes deletion</div>
            <div className='text-xs text-[var(--black-2)]'>This action cannot be undone and the notes cannot be restored.</div>
          </div>
          <DropDown
            trigger={
              <button
                type="button"
                className="px-3 py-1.5 text-sm text-[var(--white-2)] font-normal bg-[var(--red-5)] rounded-md whitespace-nowrap duration-300 hover:opacity-75 active:opacity-75"
              >
                Delete All
              </button>
            }
            preStyle={false}
            align="right"
            position="top"
            contentStyle="mb-2.5"
          >
            <div className="p-2.5 w-65 bg-[var(--black-6)] rounded-lg shadow-[var(--shadow-1)]">
              <div className="text-center p-2">
                <div className="text-sm font-normal text-[var(--red-5)]">Are you sure to delete all notes?</div>
                <div className="mt-1 text-[13px] text-[var(--black-5)]">This action cannot be undone and the notes cannot be restored.</div>
              </div>
              <button
                type="button"
                className='mt-1.5 w-full text-sm bg-[var(--red-5)] rounded-md text-center p-0.75 text-[var(--white-2)] font-normal select-none duration-300 hover:opacity-70 active:scale-96'
              >
                Delete All
              </button>
            </div>
          </DropDown>
        </div>
        <hr className="mx-2.5 w-[calc(100%-20px)] border-[var(--red-6)]" />
        <div className="w-full p-2.5 flex items-center justify-between gap-2.5">
          <div>
            <div className='text-sm text-[var(--black-3)] font-normal'>Notes Deletion by Visibility</div>
            <div className='text-xs text-[var(--black-2)]'>
              Delete notes based on visibility. This action cannot be undone.
            </div>
          </div>
          <div className="w-fit flex flex-col sm:flex-row items-center gap-2.5">
            <DropDown
              trigger={
                <button className="px-3 py-1.5 rounded-sm bg-[var(--white-2)] flex items-center gap-2 text-[var(--black-2)] font-normal duration-150 hover:opacity-75 active:opacity-60">
                  <span className='text-sm whitespace-nowrap'>{deleteVisibility}</span>
                  <ArrowDown dimension={12} color="#4C4C4C" />
                </button>
              }
              preStyle={false}
              contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
              align='right'
              position="top"
              onContentClickClose={true}
            >
              {deleteVisibilities && deleteVisibilities.map((sp => {
                return (
                  <DropDownItem
                    key={sp}
                    setValue={setDeleteVisibility}
                    data={sp}
                    preStyle={false}
                    className={`text-sm text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200 ${deleteVisibility === sp ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'}`}
                  >
                    {sp}
                  </DropDownItem>
                )
              }))}
            </DropDown>
            <DropDown
              trigger={
                <button
                  type="button"
                  className="w-full sm:w-fit px-3 py-1.5 text-sm text-[var(--white-2)] font-normal bg-[var(--red-5)] rounded-md whitespace-nowrap duration-300 hover:opacity-75 active:opacity-75"
                >
                  Delete
                </button>
              }
              preStyle={false}
              align="right"
              position="top"
              contentStyle="mb-2.5"
            >
              <div className="p-2.5 w-65 bg-[var(--black-6)] rounded-lg shadow-[var(--shadow-1)]">
                <div className="text-center p-2">
                  <div className="text-sm font-normal text-[var(--red-5)]">Are you sure to delete all {deleteVisibility} notes?</div>
                  <div className="mt-1 text-[13px] text-[var(--black-5)]">This action cannot be undone and the notes cannot be restored.</div>
                </div>
                <button
                  type="button"
                  className='mt-1.5 w-full text-sm bg-[var(--red-5)] rounded-md text-center p-0.75 text-[var(--white-2)] font-normal select-none duration-300 hover:opacity-70 active:scale-96'
                >
                  Delete
                </button>
              </div>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataPanel