import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { AiFillDelete } from "react-icons/ai";
import { api, endpoints } from "../../api/api";
import { GiThumbUp } from "react-icons/gi";
import { motion } from "motion/react";

const LatestTasks = () => {
  const { tasks } = useContext(TaskContext);

  const formatDeadline = (deadline) => {
    if (!deadline) return "—";
    const d = new Date(deadline);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
  };

  const priorityMeta = (p) => {
    const v = (p || "medium").toLowerCase();
    if (v === "high")
      return {
        label: "High",
        cls: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      };
    if (v === "low")
      return {
        label: "Low",
        cls: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      };
    return {
      label: "Medium",
      cls: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    };
  };

  const TaskDelete = async (id) => {
    const c = confirm("Do you really want to delete the task?");
    if (c) {
      await api.delete(endpoints.tasks.deleteTask(id));
    }
  };

  return (
    <div className="mt-6 ml-14 text-white">
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        📝Your Latest Tasks
      </h2>

      <div
        className={`flex ${tasks.length == 0 ? "" : "md:ml-10"} flex-col gap-4 mt-7`}
      >
        {tasks.length == 0 && (
          <div className="text-lg text-center">No Tasks To Display</div>
        )}
        {tasks.slice(0, 3).map((task) => {
          const p = priorityMeta(task.priority);
          return (
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              whileHover={{ scale: 1.03 }}
              key={task._id}
              className="md:w-[60%] w-[90%] p-4 rounded-2xl hover:bg-slate-700/70 bg-slate-800/70 border border-slate-700 flex items-center font-semibold justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="text-lg flex items-center gap-2 break-words">
                  <span
                    className={
                      task.completed
                        ? "line-through text-slate-300"
                        : "text-white"
                    }
                  >
                    {task.title}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      task.completed
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-slate-500/10 text-slate-300 border-slate-500/20"
                    }`}
                  >
                    {task.completed ? (
                      <>
                        <GiThumbUp className="text-base" />
                        Completed
                      </>
                    ) : (
                      "In progress"
                    )}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-1 rounded-full border ${p.cls}`}
                  >
                    {p.label}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-1 rounded-full border border-slate-600 bg-slate-950/20 text-slate-200">
                    Due: {formatDeadline(task.deadline)}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer"
                onClick={() => TaskDelete(task._id)}
              >
                {<AiFillDelete />}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestTasks;
