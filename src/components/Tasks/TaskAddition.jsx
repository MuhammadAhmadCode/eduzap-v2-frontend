import { useState, useContext } from 'react'
import { TaskContext } from '../../context/TaskContext'
import { motion } from 'motion/react';
import axios from 'axios';

const TaskAddition = ({ title = "Add Your Tasks", style, animate=false }) => {

    const [task, setTask] = useState("")

    const handleAdd = async() => {
        await axios.post("http://localhost:3000/api/tasks/create-task",{ title: task, completed: false},{withCredentials:true})
        setTask("")
    }

    const handleEnter = (e) => {
        if (e.key == "Enter" && task.trim().length > 3) {
            handleAdd()
        }
    }

    return (
        <>
            <motion.div
                animate={animate?{ y: [0, -15, 0] }:{ y:0 }}
                transition={{
                    duration: 3,
                    repeat: animate?Infinity:false,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
                className='w-full flex text-white gap-4 mt-9 justify-center flex-col items-center'>
                <h1 className={`text-center text-gray-100 ${style ? style : "font-bold text-3xl"}`}>{title}</h1>

                <input onKeyDown={handleEnter} value={task} onChange={(e) => setTask(e.target.value)} className='md:w-1/2 w-[90%] border py-2 bg-gray-700/60 rounded-2xl px-3 border-slate-400' type="text" name="" id="" />

                <button disabled={task.trim().length <= 3} onClick={handleAdd} className='bg-cyan-800 disabled:bg-cyan-900 md:w-[10%] font-semibold w-20 px-2 py-2 rounded-xl cursor-pointer disabled:hover:w-[10%] disabled:hover:py-2 hover:w-[11%] transition-all hover:py-3 border border-slate-400'>Add</button>

            </motion.div>

        </>
    )
}

export default TaskAddition