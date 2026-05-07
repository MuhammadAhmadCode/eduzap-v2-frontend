import React, { useEffect, useState } from "react";
import TaskCard from "../components/Dashboard/TaskCard";
import TaskAddition from "../components/Tasks/TaskAddition";
import LatestTasks from "../components/Dashboard/LatestTasks";
import { api, endpoints } from "../api/api";
import { motion } from "motion/react";

const Dashboard = () => {
  const [totalTasks, settotalTasks] = useState(0);
  const [CompletedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setpendingTasks] = useState(0);
  const [productivityScore, setProdcutvityScore] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState({});
  const [highPriorityTasks, setHighPriorityTasks] = useState([]);
  const [tasksCompletedToday, setTasksCompletedToday] = useState([]);
  const [tasksCreatedToday, setTasksCreatedToday] = useState([]);

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
              {/* Overdue Tasks */}
              <div className="bg-slate-800/50 backdrop-blur border border-red-500/30 rounded-xl p-6 hover:border-red-500/60 transition">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">👉</span>
                  <h3 className="text-xl font-semibold text-white">
                    Overdue Tasks
                  </h3>
                  <span className="ml-auto bg-red-500/20 text-red-400 text-sm font-bold px-3 py-1 rounded-full">
                    {overdueTasks?.count || 0}
                  </span>
                </div>
                {overdueTasks?.tasks && overdueTasks.tasks.length > 0 ? (
                  <div className="space-y-3">
                    {overdueTasks.tasks.map((task, index) => (
                      <div
                        key={index}
                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 hover:bg-red-500/20 transition"
                      >
                        <p className="text-white font-medium text-sm">
                          {task.title || task}
                        </p>
                        <p className="text-red-400 text-xs mt-1">
                          ⚠️ Past due date
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm py-4">
                    No overdue tasks. Great job! 🎉
                  </p>
                )}
              </div>

              {/* High Priority Tasks */}
              <div className="bg-slate-800/50 backdrop-blur border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 transition">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🔥</span>
                  <h3 className="text-xl font-semibold text-white">
                    High Priority
                  </h3>
                  <span className="ml-auto bg-orange-500/20 text-orange-400 text-sm font-bold px-3 py-1 rounded-full">
                    {highPriorityTasks?.length || 0}
                  </span>
                </div>
                {highPriorityTasks && highPriorityTasks.length > 0 ? (
                  <div className="space-y-3">
                    {highPriorityTasks.map((task, index) => (
                      <div
                        key={index}
                        className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 hover:bg-orange-500/20 transition"
                      >
                        <p className="text-white font-medium text-sm">
                          {task.title || task}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              task.completed
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-orange-500/20 text-orange-400"
                            }`}
                          >
                            {task.completed ? "✔️ Completed" : "⏳ In Progress"}
                          </span>
                          {task.priority && (
                            <span className="text-xs text-slate-400">
                              Priority: {task.priority}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm py-4">
                    No high priority tasks. Nice! 🚀
                  </p>
                )}
              </div>
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
              <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-500/60 transition">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">✅</span>
                  <h3 className="text-xl font-semibold text-white">
                    Completed today
                  </h3>
                  <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-sm font-bold px-3 py-1 rounded-full">
                    {tasksCompletedToday?.count ?? 0}
                  </span>
                </div>
                {tasksCompletedToday && tasksCompletedToday.count > 0 ? (
                  <div className="space-y-3">
                    {tasksCompletedToday.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 hover:bg-emerald-500/15 transition"
                      >
                        <p className="text-white font-medium text-sm">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">
                            ✔️ Done today
                          </span>
                          {task.priority && (
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded border ${priorityBadgeClass(task.priority)}`}
                            >
                              {task.priority}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm py-4">
                    Nothing checked off yet today — you&apos;ve got this.
                  </p>
                )}
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-sky-500/30 rounded-xl p-6 hover:border-sky-500/60 transition">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">✨</span>
                  <h3 className="text-xl font-semibold text-white">
                    Created today
                  </h3>
                  <span className="ml-auto bg-sky-500/20 text-sky-400 text-sm font-bold px-3 py-1 rounded-full">
                    {tasksCreatedToday?.count ?? 0}
                  </span>
                </div>
                {tasksCreatedToday && tasksCreatedToday.count > 0 ? (
                  <div className="space-y-3">
                    {tasksCreatedToday.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-3 hover:bg-sky-500/15 transition"
                      >
                        <p className="text-white font-medium text-sm">
                          {task.title}
                        </p>
                        <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
                          <span className="text-[11px] font-semibold px-2 py-1 rounded-full border border-slate-600 bg-slate-950/20 text-slate-200">
                            Due: {formatDeadline(task.deadline)}
                          </span>
                          {task.priority && (
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded border ${priorityBadgeClass(task.priority)}`}
                            >
                              {task.priority}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm py-4">
                    No new tasks created today.
                  </p>
                )}
              </div>
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
