import React, { useState,useContext } from 'react'
import { NotesContext } from '../../context/NotesContext'
import axios from 'axios';


const NotesAdding = () => {
    const [title, setTitle] = useState("")
    const [noteDescription, setNoteDescription] = useState("")
    const {notes,setNotes} = useContext(NotesContext)

    const handleAdd = async() => {
        await axios.post("http://localhost:3000/api/notes/create-note",{ title: title, description: noteDescription},{withCredentials:true})
        setTitle("")
        setNoteDescription("")
    }

    return (
        <div className='w-[90%] flex flex-col gap-3 md:w-1/2'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-lg font-semibold'>Note Title:</h3>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} className='border-gray-600 ml-6 font-bold  border rounded-2xl py-2 px-3 w-[70%] bg-gray-800/60' type="text" />
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-lg font-semibold'>Note Description:</h3>
                <textarea value={noteDescription} onChange={(e)=>setNoteDescription(e.target.value)} className='border-gray-600 font-bold ml-6 border rounded-2xl py-2 px-3 w-[70%] bg-gray-800/60' name="" id="" cols="30" rows="10"></textarea>
                <button disabled={title.trim().length <=3 || noteDescription.trim().length <=5} onClick={handleAdd} className='w-[70%] p-2 rounded-2xl ml-6 disabled:drop-shadow-none hover:drop-shadow-md disabled:p-2 disabled:bg-gray-600 hover:drop-shadow-white cursor-pointer transition-all hover:p-3 bg-blue-700'>Add Note</button>
            </div>
        </div>
    )
}

export default NotesAdding