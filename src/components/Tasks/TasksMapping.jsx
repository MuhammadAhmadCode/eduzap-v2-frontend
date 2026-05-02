import { useMemo, useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { AiFillDelete } from "react-icons/ai";
import { BiCopy, BiSave } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { GiCancel, GiThumbUp } from "react-icons/gi";
import { motion } from "motion/react";
import { api, endpoints } from "../../api/api";

const TasksMapping = () => {
  const [editingID, setEditingId] = useState(null);
  const [edit, setEdit] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { tasks } = useContext(TaskContext);
  const handleCheckBox = async (e) => {
    const id = e.target.name;
    const completed = e.target.checked;
    await api.patch(endpoints.tasks.updateTaskCompleted(id), {
      completed,
    });
  };

  const TaskEdit = (id) => {
    const task = tasks.find((item) => item._id == id);
    setEdit(task.title);
    setEditingId(id);
  };

  const handleSave = async (id) => {
    await api.patch(endpoints.tasks.updateTask(id), { edit: edit });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEdit("");
    setEditingId(null);
  };

  const TaskDelete = async (id) => {
    const c = confirm("Do you really want to delete the task?");
    if (c) {
      await api.delete(endpoints.tasks.deleteTask(id));
    }
  };

  const handleKeyDownSave = (e, id) => {
    if (e.key === "Enter" && edit.trim().length > 3) {
      handleSave(id);
    }
  };

  const handleCompleteCheckbox = () => {
    setShowCompleted(!showCompleted);
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return "—";
    const d = new Date(deadline);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  };

  const priorityMeta = (p) => {
    const v = (p || "medium").toLowerCase();
    if (v === "high") return { label: "High", cls: "bg-rose-500/15 text-rose-300 border-rose-500/30" };
    if (v === "low") return { label: "Low", cls: "bg-sky-500/15 text-sky-300 border-sky-500/30" };
    return { label: "Medium", cls: "bg-amber-500/15 text-amber-300 border-amber-500/30" };
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (tasks || [])
      .filter((t) => (showCompleted ? true : !t.completed))
      .filter((t) => {
        if (priorityFilter === "all") return true;
        return (t.priority || "medium").toLowerCase() === priorityFilter;
      })
      .filter((t) => {
        if (!q) return true;
        return (t.title || "").toLowerCase().includes(q);
      });
  }, [tasks, showCompleted, priorityFilter, query]);

  return (
    <div className="w-full pb-8 flex gap-6 justify-self-center flex-col mt-2">
      <div className="bg-slate-900/40 backdrop-blur border border-slate-800 rounded-2xl p-4 md:p-5 text-white">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-[220px]">
            <div className="text-sm font-semibold text-slate-200">Tasks</div>
            <div className="text-xs text-slate-400 mt-0.5">
              {filtered.length} shown • {tasks?.length || 0} total
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title…"
              className="w-[240px] max-w-full border border-slate-700 bg-slate-950/40 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
              type="text"
            />

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-slate-700 bg-slate-950/40 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
            >
              <option value="all">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-slate-300 select-none">
              <input
                checked={showCompleted}
                onChange={handleCompleteCheckbox}
                type="checkbox"
                className="accent-emerald-500"
              />
              Show completed
            </label>
          </div>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-slate-200 text-base bg-slate-900/30 border border-slate-800 rounded-2xl p-10">
          No tasks to show.
        </div>
      )}

      {filtered.map((task) => {
        const p = priorityMeta(task.priority);
        return (
          <motion.div
            onDoubleClick={() => {
              TaskEdit(task._id);
            }}
            key={task._id}
            whileHover={{ scale: 1.01 }}
            className="bg-slate-900/40 backdrop-blur border border-slate-800 hover:border-slate-700 rounded-2xl text-white"
          >
            <div className="p-4 md:p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3 min-w-[240px]">
                  <input
                    checked={task.completed}
                    onChange={handleCheckBox}
                    type="checkbox"
                    name={task._id}
                    className="mt-1 accent-emerald-500"
                  />

                  <div className="min-w-0">
                    {editingID == task._id ? (
                      <input
                        onKeyDown={(e) => handleKeyDownSave(e, task._id)}
                        className="w-full text-base md:text-lg outline-none font-semibold bg-slate-950/40 border border-slate-700 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                        value={edit}
                        onChange={(e) => setEdit(e.target.value)}
                        type="text"
                      />
                    ) : (
                      <div
                        className={
                          task.completed
                            ? "line-through text-slate-400 text-base md:text-lg font-semibold break-words"
                            : "text-slate-100 text-base md:text-lg font-semibold break-words"
                        }
                      >
                        {task.title}
                      </div>
                    )}

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

                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.cls}`}>
                        Priority: {p.label}
                      </span>

                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700 bg-slate-950/30 text-slate-300">
                        Deadline: {formatDeadline(task.deadline)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {editingID !== task._id && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="bg-slate-950/40 border border-slate-700 hover:border-slate-600 hover:bg-slate-950/60 p-3 rounded-xl cursor-pointer"
                      onClick={() => TaskEdit(task._id)}
                      title="Edit title"
                    >
                      {<FaEdit />}
                    </motion.button>
                  )}

                  {editingID !== task._id && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="bg-slate-950/40 border border-slate-700 hover:border-slate-600 hover:bg-slate-950/60 p-3 rounded-xl cursor-pointer"
                      onClick={() => TaskDelete(task._id)}
                      title="Delete"
                    >
                      {<AiFillDelete />}
                    </motion.button>
                  )}

                  {editingID == task._id && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="bg-slate-950/40 border border-slate-700 hover:border-slate-600 hover:bg-slate-950/60 p-3 rounded-xl cursor-pointer"
                      onClick={() => handleCancel(task._id)}
                      title="Cancel"
                    >
                      {<GiCancel />}
                    </motion.button>
                  )}

                  {editingID == task._id && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      disabled={edit.trim().length <= 4}
                      className="bg-emerald-600/30 disabled:bg-slate-900/40 disabled:text-slate-500 border border-emerald-500/30 hover:bg-emerald-600/40 p-3 rounded-xl cursor-pointer"
                      onClick={() => handleSave(task._id)}
                      title="Save"
                    >
                      {<BiSave />}
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      navigator.clipboard.writeText(task.title || "");
                    }}
                    className="bg-slate-950/40 border border-slate-700 hover:border-slate-600 hover:bg-slate-950/60 p-3 rounded-xl cursor-pointer"
                    title="Copy title"
                  >
                    {<BiCopy />}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TasksMapping;
