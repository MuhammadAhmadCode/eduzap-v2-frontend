import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { api, endpoints } from "../../api/api";

const TaskAddition = ({ title = "Add Your Tasks", style, animate=false }) => {

    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("medium");
    const [deadline, setDeadline] = useState("");
    const [completed, setCompleted] = useState(false);

    const canSubmit = useMemo(() => task.trim().length > 3, [task]);

    const handleAdd = async() => {
        await api.post(endpoints.tasks.createTask, {
            title: task.trim(),
            completed,
            priority,
            deadline: deadline ? new Date(deadline).toISOString() : null,
        });
        setTask("");
        setPriority("medium");
        setDeadline("");
        setCompleted(false);
    }

    const handleEnter = (e) => {
        if (e.key === "Enter" && canSubmit) {
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
                className="w-full text-white mt-9"
            >
                <div className="bg-slate-900/40 backdrop-blur border border-slate-800 rounded-2xl p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className={`text-gray-100 ${style ? style : "font-bold text-2xl md:text-3xl"}`}>
                                {title}
                            </h1>
                            <p className="text-slate-400 text-sm mt-1">
                                Title, priority, deadline and status in one place.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-6">
                            <label className="text-xs text-slate-400">Title</label>
                            <input
                                onKeyDown={handleEnter}
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder="e.g. Prepare lesson plan for Monday"
                                className="mt-1 w-full border border-slate-700 bg-slate-950/40 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                                type="text"
                            />
                        </div>

                        <div className="md:col-span-3">
                            <label className="text-xs text-slate-400">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="mt-1 w-full border border-slate-700 bg-slate-950/40 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        <div className="md:col-span-3">
                            <label className="text-xs text-slate-400">Deadline</label>
                            <input
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="mt-1 w-full border border-slate-700 bg-slate-950/40 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                                type="date"
                            />
                        </div>

                        <div className="md:col-span-9 flex items-center gap-3">
                            <label className="flex items-center gap-2 text-sm text-slate-300 select-none">
                                <input
                                    checked={completed}
                                    onChange={(e) => setCompleted(e.target.checked)}
                                    type="checkbox"
                                    className="accent-emerald-500"
                                />
                                Mark as completed
                            </label>
                        </div>

                        <div className="md:col-span-3">
                            <button
                                disabled={!canSubmit}
                                onClick={handleAdd}
                                className="w-full bg-emerald-600 disabled:bg-emerald-900/50 disabled:text-slate-400 font-semibold px-3 py-2 rounded-xl cursor-pointer hover:bg-emerald-500 transition border border-emerald-500/30 disabled:hover:bg-emerald-900/50"
                            >
                                Add task
                            </button>
                        </div>
                    </div>
                </div>

            </motion.div>

        </>
    )
}

export default TaskAddition