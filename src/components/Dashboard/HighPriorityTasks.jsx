import React from "react";

const HighPriorityTasks = ({ highPriorityTasks }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 transition">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🔥</span>
        <h3 className="text-xl font-semibold text-white">High Priority</h3>
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
  );
};

export default HighPriorityTasks;
