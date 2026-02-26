import { useState, useEffect } from 'react'
import { TaskContext } from './TaskContext'


const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const stored = localStorage.getItem("tasks")
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider