import { useState } from 'react'
import SideBar from '../components/Dashboard/SideBar';
import Editor from '../components/Dashboard/Editor';
import { useParams } from 'react-router-dom';

const Dashboard = () => {

  const { username } = useParams()
  
  const notes = [
    { _id: 0, noteID: 1001, title: "Podcast Episode Ideas" },
    { _id: 1, noteID: 1002, title: "Language Learning Notes" },
    { _id: 2, noteID: 1003, title: "Birthday Reminders" },
    { _id: 8, noteID: 1004, title: "Note with a non-sequential ID" },
    { _id: 9, noteID: 1005, title: "Meeting ideas" },
    { _id: 10, noteID: 1006, title: "Project Plan" },
    { _id: 11, noteID: 1007, title: "Design Discussion" },
    { _id: 12, noteID: 1008, title: "Shopping List" },
    { _id: 13, noteID: 1009, title: "Weekend Trip Itinerary" },
    { _id: 14, noteID: 1010, title: "Team Feedback" },
    { _id: 15, noteID: 1011, title: "Client Requirements" },
    { _id: 16, noteID: 1012, title: "Code Snippets" },
    { _id: 17, noteID: 1013, title: "Travel Blog Ideas" },
    { _id: 18, noteID: 1014, title: "Goals for the Year" },
    { _id: 19, noteID: 1015, title: "Meeting Agenda" },
    { _id: 20, noteID: 1016, title: "Personal Notes" },
    { _id: 21, noteID: 1017, title: "Marketing Strategy" },
    { _id: 22, noteID: 1018, title: "Research Notes" },
    { _id: 23, noteID: 1019, title: "Code Review Checklist" },
    { _id: 24, noteID: 1020, title: "Weekly Reflection" },
    { _id: 25, noteID: 1021, title: "Brainstorming Ideas" },
    { _id: 26, noteID: 1022, title: "Book Summary" },
    { _id: 27, noteID: 1023, title: "Workout Plan" },
    { _id: 28, noteID: 1024, title: "Meal Prep Schedule" },
    { _id: 29, noteID: 1025, title: "Daily Journal" },
    { _id: 30, noteID: 1026, title: "Work Goals" },
    { _id: 31, noteID: 1027, title: "Ideas for App" },
    { _id: 32, noteID: 1028, title: "Tech Conference Notes" },
    { _id: 33, noteID: 1029, title: "Daily Affirmations" },
    { _id: 34, noteID: 1030, title: "Budget Planning" },
    { _id: 35, noteID: 1031, title: "Home Renovation Ideas" },
    { _id: 36, noteID: 1032, title: "Gift List" },
    { _id: 37, noteID: 1033, title: "Social Media Plan" },
    { _id: 38, noteID: 1034, title: "Content Calendar" },
    { _id: 39, noteID: 1035, title: "Study Schedule" },
    { _id: 40, noteID: 1036, title: "Learning Roadmap" },
    { _id: 41, noteID: 1037, title: "Hobby Projects" },
    { _id: 42, noteID: 1038, title: "Career Milestones" },
    { _id: 43, noteID: 1039, title: "Event Planning" },
    { _id: 44, noteID: 1040, title: "Pet Care Log" },
    { _id: 45, noteID: 1041, title: "Gardening Notes" },
    { _id: 46, noteID: 1042, title: "Volunteering Schedule" },
    { _id: 47, noteID: 1043, title: "Health Tracker" },
    { _id: 48, noteID: 1044, title: "Dream Journal" },
    { _id: 49, noteID: 1045, title: "Movie Watchlist" }
  ];
  
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [currentNoteID, setCurrentNoteID] = useState(1001)

  return (
    <div className="w-screen min-h-screen sm:h-screen bg-[var(--blue-1)] flex">
      <SideBar 
        notes={notes} 
        currentNoteID={currentNoteID} 
        setCurrentNoteID={setCurrentNoteID} 
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />
      <Editor setSideNavOpen={setSideNavOpen} />
    </div>
  )
}

export default Dashboard