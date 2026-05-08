import React, { useEffect, useState } from "react";
import TaskCard from "../components/Dashboard/TaskCard";
import TaskAddition from "../components/Tasks/TaskAddition";
import LatestTasks from "../components/Dashboard/LatestTasks";
import { api, endpoints } from "../api/api";
import { motion } from "motion/react";
import TasksCreatedToday from "../components/Dashboard/TasksCreatedToday";
import TasksCompletedToday from "../components/Dashboard/TasksCompletedToday";
import OverdueTasks from "../components/Dashboard/OverdueTasks";
import HighPriorityTasks from "../components/Dashboard/HighPriorityTasks";

const Dashboard = () => {
  const [totalTasks, settotalTasks] = useState(0);
  const [CompletedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setpendingTasks] = useState(0);
  const [productivityScore, setProdcutvityScore] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState({});
  const [highPriorityTasks, setHighPriorityTasks] = useState([]);
  const [tasksCompletedToday, setTasksCompletedToday] = useState({});
  const [tasksCreatedToday, setTasksCreatedToday] = useState({});
  const [CreatedTodayvisible, setCreatedTodayvisible] = useState(4);
  const [CompletedTodayvisible, setCompletedTodayvisible] = useState(4);

  const formatDeadline = (deadline) => {
    if (!deadline) return "—";
    const d = new Date(deadline);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const priorityBadgeClass = (p) => {
    const v = (p || "medium").toLowerCase();
    if (v === "high") return "bg-rose-500/20 text-rose-300 border-rose-500/30";
    if (v === "low") return "bg-sky-500/20 text-sky-300 border-sky-500/30";
    return "bg-amber-500/20 text-amber-300 border-amber-500/30";
  };

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await api.get(endpoints.tasks.stats);
      setProdcutvityScore(stats.data.stats.productivityScore);
      settotalTasks(stats.data.stats.totalTasks);
      setCompletedTasks(stats.data.stats.completedTasks);
      setpendingTasks(stats.data.stats.pendingTasks);
      setOverdueTasks(stats.data.stats.overdueTasks);
      setHighPriorityTasks(stats.data.stats.priority.high);
      setTasksCompletedToday(stats.data.stats.tasksCompletedToday ?? []);
      setTasksCreatedToday(stats.data.stats.tasksCreatedToday ?? []);
    };
    fetchStats();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
      >
        {/* Header Section */}
        <div className="px-6 md:px-12 pt-8 pb-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-lg">
              Here's what's happening with your tasks today
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <TaskCard
              value={totalTasks}
              title="Total Tasks"
              icon="📋"
              color="from-blue-500 to-blue-600"
            />
            <TaskCard
              value={CompletedTasks}
              title="Completed"
              icon="✔️"
              color="from-emerald-500 to-emerald-600"
            />
            <TaskCard
              value={pendingTasks}
              title="Pending"
              icon="⏳"
              color="from-amber-500 to-amber-600"
            />
            <TaskCard
              value={`${productivityScore}%`}
              title="Productivity"
              icon="⚡"
              color="from-purple-500 to-purple-600"
            />
          </div>

          {/* Focus Now Section */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                🎯 Focus Now
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Tasks requiring your immediate attention
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OverdueTasks overdueTasks={overdueTasks} />
              <HighPriorityTasks highPriorityTasks={highPriorityTasks} />
            </div>
          </div>

          {/* Today: completed & created */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                📅 Today
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Tasks you finished and tasks you added today
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TasksCompletedToday
                tasksCompletedToday={tasksCompletedToday}
                CompletedTodayvisible={CompletedTodayvisible}
                setCompletedTodayvisible={setCompletedTodayvisible}
                priorityBadgeClass={priorityBadgeClass}
              />

              {/* Tasks Created Today */}
              <TasksCreatedToday
                tasksCreatedToday={tasksCreatedToday}
                CreatedTodayvisible={CreatedTodayvisible}
                setCreatedTodayvisible={setCreatedTodayvisible}
                formatDeadline={formatDeadline}
                priorityBadgeClass={priorityBadgeClass}
              />
            </div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="px-6 md:px-12 mb-12">
          <TaskAddition
            title={"➕ Add a new task"}
            animate={true}
            style={"font-semibold text-xl md:text-2xl mb-6"}
          />
        </div>

        {/* Latest Tasks */}
        <div className="px-6 md:px-12 pb-12">
          <LatestTasks />
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
