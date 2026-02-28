import React, { useContext } from 'react'
import { TaskContext } from '../context/TaskContext'
import TaskCard from '../components/Dashboard/TaskCard'
import TaskAddition from '../components/Tasks/TaskAddition'
import LatestTasks from '../components/Dashboard/LatestTasks'




const Dashboard = () => {
  const { tasks } = useContext(TaskContext)

  const totalTasks = tasks.length
  const CompletedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - CompletedTasks


  return (
    <>
      <div className='mt-7 pb-6'>
        <h1 className='text-center text-white text-3xl font-bold'>Your Tasks Info</h1>
        <div className='text-white gap-6 mt-10 grid grid-cols-1 md:grid-cols-3 place-items-center'>
          <TaskCard value={totalTasks} color={"bg-blue-900"} title={"Total Tasks"} />
          <TaskCard value={CompletedTasks} color={"text-emerald-400"} title={"Completed Tasks"} />
          <TaskCard value={pendingTasks} color={"text-amber-400"} title={"Pending Tasks"} />
        </div>

        <TaskAddition title={"Add a quick Task"} animate={true} style={"font-semibold mt-10 text-2xl"} />

        <LatestTasks />

      </div>
    </>
  )
}

export default Dashboard