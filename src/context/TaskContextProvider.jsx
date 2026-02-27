import { useState, useEffect } from 'react'
import { TaskContext } from './TaskContext'


const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/tasks/alltasks")
        .then((res)=>res.json())
        .then((data)=>setTasks(data.tasks))
    }, [tasks])

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider