import { useEffect, useState } from 'react'
import SideBar from '../components/Dashboard/SideBar';
import Editor from '../components/Dashboard/Editor';
import NewNote from '../components/Dashboard/NewNote';
import useUserAPI from '../services/user.service';
import type { Content } from '../types/tiptap.type';
import { useParams } from 'react-router-dom';
import type { UserType } from '../types/user.type';
import AllNotes from '../components/Dashboard/AllNotes';
import type { NoteType } from '../types/note.type';
import type { TagType } from '../types/tag.type';
import Account from '../components/Dashboard/Account';

type SideBarNotesType = {
  noteID: string,
  title: string
}

const Dashboard = () => {

  const { AllNotesAPI, dashboardAPI, EditorFetchAPI, loggedUserAPI, sideBarNotesAPI } = useUserAPI()

  const {username} = useParams()

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
  const [accountOpen, setAccountOpen] = useState(false)
  const [allNotesFetchingStatus, setAllNotesFetchingStatus] = useState<-1 | 0 | 1>(1)

  const userFetch = async () => {
    if(!username) return
    const res = await dashboardAPI(username)
    setUser(res)
  }

  const loggedUserFetch = async () => {
    const user = await loggedUserAPI()
    if (user) setLoggedUser(user)
  }

  const fetchNotesTitle = async () => {
    if (!username) return
    const fetchedNotes = await sideBarNotesAPI(username, setNoteTitlesFetchStatus)
    if (fetchedNotes) setNoteTitles(fetchedNotes)
  }

  const editorFetch = async (noteId: string) => {
    const note = await EditorFetchAPI(noteId, setFetchingStatus)
    if(note) {
      setTitle(note.title)
      setContent(note.content)
      setTags(note.tags)
      setVisibiility(note.visibility)
      if (note.createdAt) setCreatedAt(note.createdAt)
      if (note.updatedAt) setUpdatedAt(note.updatedAt)
    }
  }

  const notesFetch = async () => {
    if (!username) return setAllNotesFetchingStatus(-1)
    setAllNotesFetchingStatus(0)
    const notes = await AllNotesAPI(username, setAllNotesFetchingStatus)
    if (notes) setAllNotes(notes)
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
        setAccountOpen={setAccountOpen}
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
        setTags={setTags}
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
      <Account
        accountOpen={accountOpen}
        setAccountOpen={setAccountOpen}
      />
    </div>
  )
}

export default Dashboard