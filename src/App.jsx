import Notes from './pages/Notes'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'
import { useContext } from 'react'
import AuthContext from './context/AuthContext'

const App = () => {
  const{user} = useContext(AuthContext)

  return (
    <div className='w-full pb-13 h-screen bg-slate-900'>
      {/* <Navbar /> */}
      <AppRoutes/>
      {user && <Footer />}
    </div>
  )
}

export default App