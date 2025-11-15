import { useState } from 'react'
import SideBar from '../components/Dashboard/SideBar';
import Editor from '../components/Dashboard/Editor';
import NewNote from '../components/Dashboard/NewNote';
import { EditorFetchAPI, sideBarNotesAPI } from '../services/user.service';
import { useNotificationContext } from '../contexts/notification.context';
import type { Content } from '../types/tiptap.type';

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
  
  const [title, setTitle] = useState('')
  const [fetchingStatus, setFetchingStatus] = useState<-1 | 0 | 1>(0)
  const [content, setContent] = useState<Content>({
    type: "doc",
    content: []
  })

  const editorFetch = async (noteId: string) => {
    try {
      const res = await EditorFetchAPI(noteId)
      if (!res) {
        createNotification({
          title: "Unable to Load Note",
          message: "Could not fetch this note. Please try again.",
          type: "error"
        })
        return setFetchingStatus(-1)
      }
      console.log(res)
      setTitle(res.title)
      setContent(res.content)
      setFetchingStatus(1)
    } catch (error) {
      createNotification({
        title: "Unable to Load Note",
        message: "Could not fetch this note. Please try again.",
        type: "error"
      })
      setFetchingStatus(-1)
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
        editorFetch={editorFetch}
      />
      <Editor
        setSideNavOpen={setSideNavOpen}
        setNewNoteOpen={setNewNoteOpen}
        editorFetch={editorFetch}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        fetchingStatus={fetchingStatus}
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