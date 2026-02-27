import { useState, useContext } from 'react'
import { TaskContext } from '../../context/TaskContext';
import { AiFillDelete } from 'react-icons/ai';
import { BiCopy, BiSave } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { GiCancel, GiThumbUp } from 'react-icons/gi';
import { complex, motion } from 'motion/react';





const TasksMapping = () => {

  const [editingID, setEditingId] = useState(null)
  const [edit, setEdit] = useState("")
  const [showCompleted, setShowCompleted] = useState(true)
  const { tasks, setTasks } = useContext(TaskContext);
  const [taskCompleted,setTaskCompleted] = useState(false)

  const handleCheckBox = async(e) => {
    let id = e.target.name
    setTaskCompleted(!taskCompleted)
    await fetch(`http://localhost:3000/api/tasks/updateTaskCompleted/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({completed: taskCompleted}) })

    // let index = tasks.findIndex((task) => {
    //   return task._id == id
    // })

    // let newTasks = [...tasks]
    // newTasks[index].completed = !newTasks[index].completed
    // setTasks(newTasks)
  }


  const TaskEdit = (id) => {
    const task = tasks.find((item) => {
      return item._id == id
    })
    setEdit(task.title)
    setEditingId(id)
  }

  const handleSave = async(id) => {
    await fetch(`http://localhost:3000/api/tasks/updatetask/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({edit:edit}) })
    setEditingId(null)
  }

  const handleCancel = () => {
    setEdit("")
    setEditingId(null)
  }

  const TaskDelete = async (id) => {
    const c = confirm("Do you really want to delete the task?")
    if (c) {
      await fetch(`http://localhost:3000/api/tasks/deltetask/${id}`,{ method: "DELETE", headers: { "Content-Type": "application/json" }})
    }
  }

  
  const handleKeyDownSave = (e, id) => {
    if (e.key === "Enter" && edit.trim().length > 3) {
      handleSave(id)
    }
  }

  const handleCompleteCheckbox = () => {
    setShowCompleted(!showCompleted)
  }

  return (
    <div className='md:w-1/2 w-[90%] pb-8  flex gap-8 justify-self-center flex-col mt-9 '>

      <div className='ml-4 text-white flex gap-4'>
        <input checked={showCompleted} onChange={handleCompleteCheckbox} className='justify-self-start' type="checkbox" name="finished" id="" />
        <label className='text-md font-semibold' htmlFor="fiished">Show Completed</label>
      </div>

      {tasks.length === 0 && <div className='text-center text-white text-xl'>No Tasks To show</div>}

      {tasks.map((task) => {
        return (showCompleted || !task.completed) && (
          <motion.div key={task._id} whileHover={{ scale: 1.04 }} className='bg-[#191928] hover:bg-[#212131] hover:shadow hover:shadow-gray-600 shadow shadow-gray-500 border border-slate-800 flex items-center flex-wrap gap-3 md:flex-nowrap justify-between p-3  rounded-2xl text-white'>

            <div className='flex gap-3 justify-center items-center'>

              <input checked={task.completed} onChange={handleCheckBox} type="checkbox" name={task._id} />

              {editingID == task._id && <input onKeyDown={(e) => handleKeyDownSave(e, task._id)} className='text-lg w-full outline-none font-bold"' value={edit} onChange={(e) => setEdit(e.target.value)} type='text' />}

              {editingID !== task._id && <div className={task.completed ? "line-through flex items-center md:gap-2 gap-1 text-wrap text-lg font-semibold" : "text-lg font-semibold text-wrap"}>{task.title}{task.completed ? <GiThumbUp className='md:text-2xl text-xl' /> : ""}</div>}

            </div>

            <div className='flex gap-3'>
              {editingID !== task._id && <motion.button whileHover={{ scale: 1.04 }} className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer" onClick={() => TaskEdit(task._id)}>{<FaEdit />}</motion.button>}

              {editingID !== task._id && <motion.button whileHover={{ scale: 1.04 }} className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer" onClick={() => TaskDelete(task._id)}>{<AiFillDelete />}</motion.button>}

              {editingID == task._id && <motion.button whileHover={{ scale: 1.04 }} className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer" onClick={() => handleCancel(task._id)}>{<GiCancel />}</motion.button>}

              {editingID == task._id && <motion.button whileHover={{ scale: 1.04 }} disabled={edit.trim().length <= 4} className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer" onClick={() => handleSave(task._id)}>{<BiSave />}</motion.button>}
              <motion.button whileHover={{ scale: 1.04 }} onClick={() => {
                alert("Task Copied")
                return navigator.clipboard.writeText(task.title)
              }} className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer">{<BiCopy />}</motion.button>
            </div>

          </motion.div>
        )

      })}

    </div>
  )
}

export default TasksMapping