import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LandingPage from './pages/LandingPage.tsx'
import Dashboard from './pages/Dashboard.tsx'
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<LandingPage />} />
      <Route path=':username/dashboard/:noteId?' element={<Dashboard />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='signin' element={<SignIn />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
