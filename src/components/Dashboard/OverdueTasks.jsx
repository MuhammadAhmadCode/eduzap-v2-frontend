import React from "react";

const OverdueTasks = ({ overdueTasks }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-red-500/30 rounded-xl p-6 hover:border-red-500/60 transition">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">👉</span>
        <h3 className="text-xl font-semibold text-white">Overdue Tasks</h3>
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
              <p className="text-red-400 text-xs mt-1">⚠️ Past due date</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-sm py-4">
          No overdue tasks. Great job! 🎉
        </p>
      )}
    </div>
  );
};

export default OverdueTasks;
