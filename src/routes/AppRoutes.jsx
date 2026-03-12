import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import LoginPage from '../pages/Login'
import Notes from '../pages/Notes'
import Tasks from '../pages/Tasks'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>

                    <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path='/tasks' element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                    <Route path='/notes' element={<ProtectedRoute><Notes /></ProtectedRoute>} />
                    
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<LoginPage />}>



                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes