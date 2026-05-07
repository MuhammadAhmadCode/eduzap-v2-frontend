import TaskAddition from "../components/Tasks/TaskAddition";
import TasksMapping from "../components/Tasks/TasksMapping";
import { motion } from "motion/react";
const Tasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-10">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-emerald-300 uppercase tracking-[0.3em] font-semibold mb-2">
              Task Center
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Tasks
            </h1>
            <p className="mt-2 text-slate-400 max-w-2xl text-sm md:text-base">
              Track{" "}
              <span className="text-slate-200 font-semibold">completed</span>,{" "}
              <span className="text-slate-200 font-semibold">deadlines</span>{" "}
              and <span className="text-slate-200 font-semibold">priority</span>{" "}
              like a Premium dashboard.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Tip: double-click a task to edit the title.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <TaskAddition title="Create a task" />
          <TasksMapping />
        </div>
      </div>
    </motion.div>
  );
};

export default Tasks;
