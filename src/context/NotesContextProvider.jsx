import React, { useContext, useEffect, useState } from 'react'
import { NotesContext } from './NotesContext'
import AuthContext from './AuthContext'
import axios from 'axios'

const NotesContextProvider = ({ children }) => {
    const[filterText,setFilterText] = useState("")

    const {user} = useContext(AuthContext)

    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        if(!user) return
        const fetchNotes = async()=>{
            try {
                const res = await axios.get("http://localhost:3000/api/notes/allnotes",{withCredentials:true})
                setNotes(res.data.notes)
            } catch (err) {
                console.log(err)

            }
        }

        fetchNotes()
    }, [user,notes])
    
    return (
        <NotesContext.Provider value={{notes,setNotes,filterText,setFilterText}}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider