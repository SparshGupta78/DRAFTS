import { useState } from 'react'
import SideBar from '../components/Dashboard/SideBar';
import Editor from '../components/Dashboard/Editor';
import { useParams } from 'react-router-dom';
import NewNote from '../components/NewNote/NewNote';
import type { NoteType } from '../types/note.type';

const Dashboard = () => {

  const { username } = useParams()
  
  const notes: NoteType[] = []
  
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [newNoteOpen, setNewNoteOpen] = useState(false)

  const [currentNoteID, setCurrentNoteID] = useState('1001')

  return (
    <div className="w-screen min-h-screen sm:h-screen bg-[var(--blue-1)] flex">
      <SideBar 
        notes={notes} 
        currentNoteID={currentNoteID} 
        setCurrentNoteID={setCurrentNoteID} 
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
        setNewNoteOpen={setNewNoteOpen}
      />
      <Editor setSideNavOpen={setSideNavOpen} />
      <NewNote newNoteOpen={newNoteOpen} setNewNoteOpen={setNewNoteOpen} />
    </div>
  )
}

export default Dashboard