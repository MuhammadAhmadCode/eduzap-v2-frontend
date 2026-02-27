import React, { useEffect, useState } from 'react'
import { NotesContext } from './NotesContext'

const NotesContextProvider = ({ children }) => {
    const[filterText,setFilterText] = useState("")

    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:3000/api/notes/allnotes")
        .then((res)=>res.json())
        .then((data)=>setNotes(data.notes))
    }, [notes])
    
    return (
        <NotesContext.Provider value={{notes,setNotes,filterText,setFilterText}}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider