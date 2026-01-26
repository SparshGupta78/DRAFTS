import { useEffect, useState } from "react"
import { ArrowDown } from "../../../assets/Icons"
import DropDown from "../../DropDown/DropDown"
import DropDownItem from "../../DropDown/DropDownItem"
import Switch from "../../Switch/Switch"
import { usePreferencesContext } from "../../../contexts/preferences.context"

const EditorPanel = () => {

  const [spellCheck, setSpellCheck] = useState(true)
  const [autosave, setAutosave] = useState(true)
  const [editorWidth, setEditorWidth] = useState<'Default' | 'Full'>('Default')
  const [autosaveInterval, setAutosaveInterval] = useState<'2.5' | '5' | '10' | '15'>('2.5')
  const [visibility, setVisibility] = useState<'Private' | 'Public'>('Private')

  const editorWidths = ['Default', 'Full']
  const autosaveIntervals = ['2.5', '5', '10', '15']
  const visibilities = ['Private', 'Public']

  const { preferences, updatePreference } = usePreferencesContext()

  const editorWidthHandler = () => {
    updatePreference('editor.editorWidth', editorWidth === 'Default' ? 'Full' : 'Default')
  }

  const spellCheckHandler = () => {
    const status = updatePreference('editor.spellCheck', !spellCheck)
    if(status) setSpellCheck(prev => !prev)
  }

  const autosaveHandler = () => {
    const status = updatePreference('editor.autosave', !autosave)
    if(status) setAutosave(prev => !prev)
  }

  useEffect(() => {
    if(!preferences) return
    setEditorWidth(preferences.editor.editorWidth)
    setSpellCheck(preferences.editor.spellCheck)
    setAutosave(preferences.editor.autosave)
  }, [preferences])

  return (
    <div className="w-full p-2.5">
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Spell Check</div>
          <div className='text-xs text-[var(--black-2)]'>Highlight misspelled words as you type.</div>
        </div>
        <Switch
          state={spellCheck}
          onClick={spellCheckHandler} 
        />
      </div>
      <hr className="mx-2.5 w-[calc(100%-20px)] border-[var(--black-4)]" />
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Autosave</div>
          <div className='text-xs text-[var(--black-2)]'>Automatically save changes while you edit.</div>
        </div>
        <Switch 
          state={autosave}
          onClick={autosaveHandler}
        />
      </div>
      <hr className="mx-2.5 w-[calc(100%-20px)] border-[var(--black-4)]" />
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div className={`duration-300 ${!autosave ? 'opacity-50' : ''}`}>
          <div className='text-sm text-[var(--black-3)] font-normal'>Autosave Interval</div>
          <div className='text-xs text-[var(--black-2)]'>Set how often changes are automatically saved.</div>
        </div>
        <DropDown
        trigger={
          <button className={`px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 ${!autosave ? 'opacity-50' : 'hover:opacity-75 active:opacity-60'}`}>
            <span className='text-[13px] text-nowrap'>{autosaveInterval + ' sec'}</span>
            <ArrowDown dimension={10} />
          </button>
        }
        preStyle={false}
        contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
        align='right'
        onContentClickClose={true}
        disabled={!autosave}
      >
        {autosaveIntervals && autosaveIntervals.map((ew => {
          return (
            <DropDownItem
              key={ew}
              setValue={setAutosaveInterval}
              data={ew}
              preStyle={false}
              className={`text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200 ${autosaveInterval === ew ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'}`}
            >
              {ew + ' sec'}
            </DropDownItem>
          )
        }))}
      </DropDown>
      </div>
      <hr className="mx-2.5 w-[calc(100%-20px)] border-[var(--black-4)]" />
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Default Visibility</div>
          <div className='text-xs text-[var(--black-2)]'>Define who can view notes across the platform.</div>
        </div>
        <DropDown
        trigger={
          <button className="px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 hover:opacity-75 active:opacity-60">
            <span className='text-[13px] text-nowrap'>{visibility}</span>
            <ArrowDown dimension={10} />
          </button>
        }
        preStyle={false}
        contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
        align='right'
        onContentClickClose={true}
      >
        {visibilities && visibilities.map((ew => {
          return (
            <DropDownItem
              key={ew}
              setValue={setVisibility}
              data={ew}
              preStyle={false}
              className={`text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200 ${visibility === ew ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'}`}
            >
              {ew}
            </DropDownItem>
          )
        }))}
      </DropDown>
      </div>
      <hr className="mx-2.5 w-[calc(100%-20px)] border-[var(--black-4)]" />
      <div className="p-2.5 flex items-center justify-between gap-2.5">
        <div>
          <div className='text-sm text-[var(--black-3)] font-normal'>Editor Width</div>
          <div className='text-xs text-[var(--black-2)]'>Choose the width of the editor on the screen.</div>
        </div>
        <DropDown
          trigger={
            <button className="px-2.5 py-1 rounded-sm border-1 border-[var(--black-1)] flex items-center gap-2 duration-150 hover:opacity-75 active:opacity-60">
              <span className='text-[13px] text-nowrap'>{editorWidth}</span>
              <ArrowDown dimension={10} />
            </button>
          }
          preStyle={false}
          contentStyle="min-w-23 p-1 bg-[var(--black-6)] rounded-lg"
          align='right'
          onContentClickClose={true}
        >
          {editorWidths && editorWidths.map((ew => {
            return (
              <DropDownItem
                key={ew}
                setValue={setEditorWidth}
                data={ew}
                preStyle={false}
                className={`text-[13px] text-nowrap px-2.25 py-1 rounded-md text-[var(--black-3)] cursor-default duration-200 ${editorWidth === ew ? 'bg-[var(--black-4)]' : 'hover:opacity-75 active:scale-96'}`}
                onClick={editorWidthHandler}
              >
                {ew}
              </DropDownItem>
            )
          }))}
        </DropDown>
      </div>
    </div>
  )
}

export default EditorPanel