import type { CreateNewNote } from "../types/CreateNewNote.type";
import type { TagType } from "../types/tag.type";
import type { Content } from "../types/tiptap.type";
import api from "./axios.config";
import { useNotificationContext } from "../contexts/notification.context";
import type { UserType } from "../types/user.type";
import { useNavigate } from "react-router-dom";
import type { NoteType } from "../types/note.type";
import type { userTypeExtended } from "../types/userExtended.type";

const useUserAPI = () => {

  let navigate = useNavigate()
  let { createNotification } = useNotificationContext()

  const dashboardAPI = async (
    username: string
  ) => {
    try {
      const res = await api.get(`/user/dashboard?username=${username}`)
      if (!res) {
        createNotification({
          title: "Unable to Fetch User Details",
          message: "We couldn't retrieve your account information. Please try again.",
          type: "error"
        })
        return
      }
      return res.data as UserType
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

  const newNoteAPI = async (
    payload: CreateNewNote,
    username: string,
    clearDialog: () => void,
    fetchNotesTitle: () => void) => {
    try {
      const newNoteId = await api.post('/user/newnote', payload)
      if (!newNoteId) {
        createNotification({
          title: "Failed to Create Note",
          message: "An error occurred while creating the note. Please try again.",
          type: "error"
        })
      } else {
        navigate(`/${username}/${newNoteId.data.noteID}`)
        clearDialog()
        fetchNotesTitle()
      }
    } catch (error) {
      return createNotification({
        title: "Failed to Create Note",
        message: "An error occurred while creating the note. Please try again.",
        type: "error"
      })
    }
  }

  const sideBarNotesAPI = async (
    username: string,
    setNoteTitlesFetchStatus: (value: React.SetStateAction<0 | 1 | -1>) => void
  ) => {
    try {
        setNoteTitlesFetchStatus(0)
        const res = await api.get(`/user/findAllTitle?username=${username}`)
        const fetchedNotes = res.data.notes
        if (!fetchedNotes || !Array.isArray(fetchedNotes)) {
          createNotification({
            title: "Unable to Fetch Notes",
            message: "We encountered an issue retrieving your notes. Please try again shortly.",
            type: "error"
          })
          setNoteTitlesFetchStatus(-1)
          return
        }
        setNoteTitlesFetchStatus(1)
        return fetchedNotes
      } catch(error) {
        createNotification({
          title: "Unable to Fetch Notes",
          message: "We encountered an issue retrieving your notes. Please try again shortly.",
          type: "error"
        })
        setNoteTitlesFetchStatus(-1)
      }
  }

  const EditorFetchAPI = async (
    noteId: string,
    setFetchingStatus: (value: React.SetStateAction<0 | 1 | -1>) => void
  ) => {
    try {
      setFetchingStatus(0)
      const response = await api.get(`/user/editorFetch?noteId=${noteId}`)
      const res = response.data
      if (!res) {
        createNotification({
          title: "Unable to Load Note",
          message: "Could not fetch this note. Please try again.",
          type: "error"
        })
        setFetchingStatus(-1)
        return
      }
      setFetchingStatus(1)
      return res as NoteType
    } catch (error) {
      createNotification({
        title: "Unable to Load Note",
        message: "Could not fetch this note. Please try again.",
        type: "error"
      })
      setFetchingStatus(-1)
    }
  }

  const EditorContentSaveAPI = async (
    noteId: string,
    content: Content,
    signal: AbortSignal,
    prevContentRef: React.RefObject<Content>,
  ) => {
    try {
      await api.post('/user/editorSave',{ noteId, content },{ signal })
      prevContentRef.current = content
      return 1
    } catch {
      return -1
    }
  }

  const EditorTitleUpdateAPI = async (
    noteId: string,
    title: string
  ) => {
    try {
      const res = await api.post('/user/editorTitleUpdate', {noteId, title})
      if (res.status === 200) {
      createNotification({
        title: "Heading updated",
        message: "The heading is updated successfully.",
        type: "default"
      })
      } else {
        createNotification({
          title: "Heading updation Failed",
          message: "Unable to update heading. Please try again.",
          type: "error"
        })
      }
    } catch (error) {
      createNotification({
          title: "Heading updation Failed",
          message: "Unable to update heading. Please try again.",
          type: "error"
        })
    }
  }

  const AllNotesAPI = async (
    username: string,
    setAllNotesFetchingStatus: (value: React.SetStateAction<0 | 1 | -1>) => void
  ) => {
    try {
      const res = await api.get(`/user/allNotes?username=${username}`)
      setAllNotesFetchingStatus(1)
      return res.data as NoteType[]
    } catch {
      createNotification({
        title: "Unable to Fetch Notes",
        message: "We couldn't retrieve your notes. Please try again.",
        type: "error"
      })
      setAllNotesFetchingStatus(-1)
    }
  }

  const loggedUserAPI = async () => {
    try {
      const res = await api.get(`/user/loggedUser`)
      if (!res) {
        createNotification({
          title: "Unable to Fetch User Details",
          message: "We couldn't retrieve your account information. Please try again.",
          type: "error"
        })
        return
      }
      return res.data as userTypeExtended
    } catch (error) {
      createNotification({
        title: "Unable to Fetch User Details",
        message: "We couldn't retrieve your account information. Please try again.",
        type: "error"
      })
    }
  }

  const DeleteNoteAPI = async (
    username: string,
    noteId: string,
    fetchNotesTitle: () => Promise<void>
  ) => {
    try {
      const res = await api.get(`/user/deleteNote?username=${username}&noteId=${noteId}`)
      if (res.status === 204) {
        createNotification({
          title: "Deletion Successful",
          message: "Your note has been deleted successfully.",
          type: "default"
        })
        navigate(`/${username}`)
        fetchNotesTitle()
      } else {
        createNotification({
          title: "Deletion Failed",
          message: "The note could not be deleted. Please try again.",
          type: "error"
        })
      }
    } catch (error) {
      createNotification({
        title: "Deletion Failed",
        message: "The note could not be deleted. Please try again.",
        type: "error"
      })
    }
  }

  const ToggleVisibilityStatusAPI = async (
    username: string,
    noteId: string,
    status: ('private' | 'public')
  ): Promise<'public' | 'private' | undefined> => {
    try {
      const response = await api.get<{status: 'public' | 'private'}>(`/user/toggleVisibilityStatus?username=${username}&noteId=${noteId}&status=${status}`)
      if (!response.data?.status) {
        createNotification({
          title: "Visibility Update Failed",
          message: "Unable to change note visibility. Please try again.",
          type: "error"
        })
        return undefined
      }
      return response.data.status
    } catch (error) {
      createNotification({
        title: "Visibility Update Failed",
        message: "Unable to change note visibility. Please try again.",
        type: "error"
      })
      return undefined
    }
  }

  const AddTagAPI = async (
    username: string,
    noteId: string,
    tags: TagType[]
  ) => {
    try {
      const res = await api.post('/user/addTag', {username,noteId,tags})
      if (!res) {
        createNotification({
          title: "Tag Update Failed",
          message: "Unable to set the tag for this note. Please try again.",
          type: "error"
        })
        return
      }
      return res.data as TagType[]
    } catch (error) {
      createNotification({
        title: "Tag Update Failed",
        message: "Unable to set the tag for this note. Please try again.",
        type: "error"
      })
    }
  }

  const DeleteTagAPI = async (
    username: string,
    noteId: string,
    tagId: string,
    editorFetch: (noteId: string) => Promise<void>
  ) => {
    try {
      const res = await api.get(`/user/deleteTag?username=${username}&noteId=${noteId}&tagId=${tagId}`)
      if (!res) {
        createNotification({
          title: "Tag Removal Failed",
          message: "Unable to remove the tag. Please try again.",
          type: "error"
        })
        return
      }
      editorFetch(noteId)
    } catch (error) {
      createNotification({
        title: "Tag Removal Failed",
        message: "Unable to remove the tag. Please try again.",
        type: "error"
      })
    }
  }

  const DeleteAccount = async (password: string) => {
    try {
      if(password === '') {
        createNotification({
          title: "Password Required",
          message: "Please enter your password to proceed with account deletion.",
          type: "error"
        })
        return false
      }
      await api.post('/user/deleteAccount', { password })
      createNotification({
        title: "Account Deleted",
        message: "The account has been deleted successfully.",
        type: "default"
      })
      localStorage.removeItem('preferences')
      localStorage.removeItem('token')
      navigate('/signin')
      return true
    } catch(error: any) {
        if(error?.response.status === 401) {
          createNotification({
            title: "Incorrect Password",
            message: "The password entered is incorrect. Account deletion was not completed.",
            type: "error"
          })
          return false
        }
      createNotification({
        title: "Account Deletion Failed",
        message: "The account could not be deleted. Please try again.",
        type: "error"
      })
      return true
    }
  }

  return {
    dashboardAPI,
    newNoteAPI,
    loggedUserAPI,
    sideBarNotesAPI,
    EditorFetchAPI,
    EditorContentSaveAPI,
    EditorTitleUpdateAPI,
    DeleteNoteAPI,
    ToggleVisibilityStatusAPI,
    AllNotesAPI,
    AddTagAPI,
    DeleteTagAPI,
    DeleteAccount
  }
  
}

export default useUserAPI