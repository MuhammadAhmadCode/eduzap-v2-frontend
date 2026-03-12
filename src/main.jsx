import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskContextProvider from './context/TaskContextProvider.jsx'
import NotesContextProvider from './context/NotesContextProvider.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthContextProvider>
    <NotesContextProvider>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    </NotesContextProvider>
  </AuthContextProvider>
  // {/* </StrictMode>, */}
)
