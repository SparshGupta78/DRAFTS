import { useState } from 'react'
import SideBar from '../components/Dashboard/SideBar';
import Editor from '../components/Dashboard/Editor';
import NewNote from '../components/Dashboard/NewNote';
import { sideBarNotesAPI } from '../services/user.service';
import { useNotificationContext } from '../contexts/notification.context';

type SideBarNotesType = {
  noteID: string,
  title: string
}

const Dashboard = () => {

  const { createNotification } = useNotificationContext()
  
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [newNoteOpen, setNewNoteOpen] = useState(false)
  
  const [noteTitles, setNoteTitles] = useState<SideBarNotesType[]>([])

  const fetchNotesTitle = async () => {
      try {
        const fetchedNotes = await sideBarNotesAPI()
        if (!fetchedNotes || !Array.isArray(fetchedNotes)) {
          createNotification({
            title: "Unable to Fetch Notes",
            message: "We encountered an issue retrieving your notes. Please try again shortly.",
            type: "error"
          })
          return
        }
        setNoteTitles(fetchedNotes)
      } catch(error) {
        createNotification({
          title: "Unable to Fetch Notes",
          message: "We encountered an issue retrieving your notes. Please try again shortly.",
          type: "error"
        })
      }
    }

  return (
    <div className="w-screen min-h-screen sm:h-screen bg-[var(--blue-1)] flex">
      <SideBar 
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
        setNewNoteOpen={setNewNoteOpen}
        noteTitles={noteTitles}
        fetchNotesTitle={fetchNotesTitle}
      />
      <Editor setSideNavOpen={setSideNavOpen} />
      <NewNote 
        newNoteOpen={newNoteOpen} 
        setNewNoteOpen={setNewNoteOpen} 
        fetchNotesTitle={fetchNotesTitle}
      />
    </div>
  )
}

export default Dashboard