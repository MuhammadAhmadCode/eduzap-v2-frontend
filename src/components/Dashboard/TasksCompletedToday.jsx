import React from "react";

const TasksCompletedToday = ({
  tasksCompletedToday,
  CompletedTodayvisible,
  setCompletedTodayvisible,
  priorityBadgeClass,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-500/60 transition">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">✅</span>
        <h3 className="text-xl font-semibold text-white">Completed today</h3>
        <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-sm font-bold px-3 py-1 rounded-full">
          {tasksCompletedToday?.count ?? 0}
        </span>
      </div>
      {tasksCompletedToday && tasksCompletedToday.count > 0 ? (
        <div className="space-y-3">
          {tasksCompletedToday.tasks
            .slice(0, CompletedTodayvisible)
            .map((task) => (
              <div
                key={task.id}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 hover:bg-emerald-500/15 transition"
              >
                <p className="text-white font-medium text-sm">{task.title}</p>
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
          {tasksCompletedToday.tasks.length > CompletedTodayvisible && (
            <button
              onClick={() =>
                setCompletedTodayvisible(tasksCompletedToday.tasks.length)
              }
              className="text-emerald-400 m-auto hover:text-emerald-300 text-sm font-medium"
            >
              View All
            </button>
          )}
          {CompletedTodayvisible > 4 && (
            <button
              onClick={() => setCompletedTodayvisible(4)}
              className="text-emerald-400 m-auto hover:text-emerald-300 text-sm font-medium"
            >
              View Less
            </button>
          )}
        </div>
      ) : (
        <p className="text-slate-400 text-sm py-4">
          Nothing checked off yet today — you&apos;ve got this.
        </p>
      )}
    </div>
  );
};

export default TasksCompletedToday;
