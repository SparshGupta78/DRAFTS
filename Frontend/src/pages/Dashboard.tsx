import { useEffect, useState } from 'react'
import SideBar from '../components/Dashboard/SideBar';
import Editor from '../components/Dashboard/Editor';
import NewNote from '../components/Dashboard/NewNote';
import { AllNotesAPI, dashboardAPI, EditorFetchAPI, loggedUserAPI, sideBarNotesAPI } from '../services/user.service';
import { useNotificationContext } from '../contexts/notification.context';
import type { Content } from '../types/tiptap.type';
import { useParams } from 'react-router-dom';
import type { UserType } from '../types/user.type';
import AllNotes from '../components/Dashboard/AllNotes';
import type { NoteType } from '../types/note.type';
import type { TagType } from '../types/tag.type';

type SideBarNotesType = {
  noteID: string,
  title: string
}

const Dashboard = () => {

  const {username} = useParams()
  const { createNotification } = useNotificationContext()

  const [user, setUser] = useState<UserType>()
  const [loggedUser, setLoggedUser] = useState<UserType>()
  const [isUserDashboard, setIsUserDashboard] = useState(false)
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [newNoteOpen, setNewNoteOpen] = useState(false)
  const [noteTitles, setNoteTitles] = useState<SideBarNotesType[]>([])
  const [noteTitlesFetchStatus, setNoteTitlesFetchStatus] = useState<-1 | 0 | 1>(0)
  const [fetchingStatus, setFetchingStatus] = useState<-1 | 0 | 1>(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState<Content>(null)
  const [tags, setTags] = useState<TagType[]>([])
  const [visibility, setVisibiility] = useState<'public' | 'private'>('private')
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [allNotesOpen, setAllNotesOpen] = useState(false)
  const [allNotes, setAllNotes] = useState<NoteType[]>([])
  const [allNotesFetchingStatus, setAllNotesFetchingStatus] = useState<-1 | 0 | 1>(1)

  const userFetch = async () => {
    try {
      if (!username) return
      const res = await dashboardAPI(username)
      if (!res) {
        createNotification({
          title: "Unable to Fetch User Details",
          message: "We couldn't retrieve your account information. Please try again.",
          type: "error"
        })
        return
      }
      setUser(res.data as UserType)
    } catch(err: any) {
      if (err?.response?.status === 404) {
        createNotification({
          title: "User Not Found",
          message: "No account exists with this username.",
          type: "default"
        })
        return
      }
      createNotification({
        title: "Unable to Fetch User Details",
        message: "We couldn't retrieve account information. Please try again.",
        type: "error"
      })
    }
  }

  const loggedUserFetch = async () => {
    try {
      const res = await loggedUserAPI()
      if (!res) {
        createNotification({
          title: "Unable to Fetch User Details",
          message: "We couldn't retrieve your account information. Please try again.",
          type: "error"
        })
        return
      }
      setLoggedUser(res.data as UserType)
    } catch (error) {
      createNotification({
        title: "Unable to Fetch User Details",
        message: "We couldn't retrieve your account information. Please try again.",
        type: "error"
      })
    }
  }

  const fetchNotesTitle = async () => {
    if (!username) return
    try {
      setNoteTitlesFetchStatus(0)
      const fetchedNotes = await sideBarNotesAPI(username)
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

  const editorFetch = async (noteId: string) => {
    try {
      setFetchingStatus(0)
      const res = await EditorFetchAPI(noteId)
      if (!res) {
        createNotification({
          title: "Unable to Load Note",
          message: "Could not fetch this note. Please try again.",
          type: "error"
        })
        return setFetchingStatus(-1)
      }
      const note = res as NoteType
      setTitle(note.title)
      setContent(note.content)
      setTags(note.tags)
      setVisibiility(note.visibility)
      if (note.createdAt) setCreatedAt(note.createdAt)
      if (note.updatedAt) setUpdatedAt(note.updatedAt)
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

  const notesFetch = async () => {
    setAllNotesFetchingStatus(0)
    try {
      if (!username) return setAllNotesFetchingStatus(-1)
      const res = await AllNotesAPI(username)
      setAllNotes(res.data)
      setAllNotesFetchingStatus(1)
    } catch {
      createNotification({
        title: "Unable to Fetch Notes",
        message: "We couldn't retrieve your notes. Please try again.",
        type: "error"
      })
      setAllNotesFetchingStatus(-1)
    }
  }

  useEffect(() => {
    loggedUserFetch()
  }, [])

  useEffect(() => {
    userFetch()
  }, [username])

  useEffect(() => {
    if (username === loggedUser?.username) {
      setIsUserDashboard(true)
    } else {
      setIsUserDashboard(false)
    }
  }, [username, loggedUser])

  if (!user) {
    return (
      <div className="w-screen min-h-screen sm:h-screen bg-[var(--blue-1)] flex items-center justify-center">
        <span>No user found.</span>
      </div>
    )
  }

  return (
    <div className="w-screen min-h-screen sm:h-screen bg-[var(--blue-1)] flex">
      <SideBar
        loggedUser={loggedUser}
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
        setNewNoteOpen={setNewNoteOpen}
        noteTitles={noteTitles}
        fetchNotesTitle={fetchNotesTitle}
        noteTitlesFetchStatus={noteTitlesFetchStatus}
        editorFetch={editorFetch}
        setAllNotesOpen={setAllNotesOpen}
        notesFetch={notesFetch}
      />
      <Editor
        loggedUser={loggedUser}
        setSideNavOpen={setSideNavOpen}
        setNewNoteOpen={setNewNoteOpen}
        editorFetch={editorFetch}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        fetchingStatus={fetchingStatus}
        isUserDashboard={isUserDashboard}
        tags={tags}
        visibility={visibility}
        createdAt={createdAt}
        updatedAt={updatedAt}
        setAllNotesOpen={setAllNotesOpen}
        notesFetch={notesFetch}
        fetchNotesTitle={fetchNotesTitle}
      />
      <NewNote
        newNoteOpen={newNoteOpen}
        setNewNoteOpen={setNewNoteOpen}
        fetchNotesTitle={fetchNotesTitle}
      />
      <AllNotes
        allNotesOpen={allNotesOpen}
        setAllNotesOpen={setAllNotesOpen}
        setNewNoteOpen={setNewNoteOpen}
        allNotes={allNotes}
        allNotesFetchingStatus={allNotesFetchingStatus}
        notesFetch={notesFetch}
      />
    </div>
  )
}

export default Dashboard