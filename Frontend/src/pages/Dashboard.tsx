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
  const [noteTitlesFetchStatus, setNoteTitlesFetchStatus] = useState<-1 | 0 | 1>(0)

  const fetchNotesTitle = async () => {
    try {
      setNoteTitlesFetchStatus(0)
      const fetchedNotes = await sideBarNotesAPI()
      if (!fetchedNotes || !Array.isArray(fetchedNotes)) {
        createNotification({
          title: "Unable to Fetch Notes",
          message: "We encountered an issue retrieving your notes. Please try again shortly.",
          type: "error"
        })
        setNoteTitlesFetchStatus(-1)
        return
      }
      setNoteTitles(fetchedNotes)
      setNoteTitlesFetchStatus(1)
    } catch(error) {
      createNotification({
        title: "Unable to Fetch Notes",
        message: "We encountered an issue retrieving your notes. Please try again shortly.",
        type: "error"
      })
      setNoteTitlesFetchStatus(-1)
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
        noteTitlesFetchStatus={noteTitlesFetchStatus}
      />
      <Editor
        setSideNavOpen={setSideNavOpen}
        setNewNoteOpen={setNewNoteOpen}
      />
      <NewNote
        newNoteOpen={newNoteOpen}
        setNewNoteOpen={setNewNoteOpen}
        fetchNotesTitle={fetchNotesTitle}
      />
    </div>
  )
}

export default Dashboard