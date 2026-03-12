import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import axios from 'axios'


const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const checkUser = async()=>{
            try {
                const res = await axios.get("http://localhost:3000/api/auth/user/me",{withCredentials:true})

                setUser(res.data)
            } catch (err) {
                console.log(err)
                setUser(null)
            }finally{
                setLoading(false)
            }
        }


        checkUser()
    }, [])
    
    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider