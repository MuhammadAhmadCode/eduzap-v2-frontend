import { useContext } from "react"
import { TaskContext } from "../../context/TaskContext"
import { AiFillDelete } from 'react-icons/ai'
import { motion } from "motion/react"


const LatestTasks = () => {
    const { tasks} = useContext(TaskContext)

    const TaskDelete = async (id) => {
        const c = confirm("Do you really want to delete the task?")
        if (c) {
          await fetch(`http://localhost:3000/api/tasks/deltetask/${id}`,{ method: "DELETE", headers: { "Content-Type": "application/json" }})
        }
      }

    return (
        <div className='mt-6 ml-14 text-white'>

            <h2 className='text-3xl font-semibold text-shadow-lg text-shadow-gray-800'>Your Latest Tasks</h2>

            <div className={`flex ${tasks.lenth == 0 ? "" : "md:ml-10"} flex-col gap-4 mt-7`}>
                {tasks.length == 0 && <div className='text-lg text-center'>No Tasks To Display</div>}
                {tasks.slice(0, 3).map((task) => {
                    return (
                        <motion.div
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            whileHover={{scale:1.03}}
                            key={task._id}
                            className='md:w-[60%] w-[90%] p-3 px-9 rounded-2xl hover:bg-slate-700 bg-slate-800 border border-slate-700 flex items-center font-semibold justify-between'>
                            <h2 className='text-xl'>{task.title}</h2>
                            <motion.button whileHover={{scale:1.08}} className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer" onClick={() => TaskDelete(task._id)}>{<AiFillDelete />}</motion.button>
                        </motion.div>
                    )
                })}
            </div>

        </div>
    )
}

export default LatestTasks