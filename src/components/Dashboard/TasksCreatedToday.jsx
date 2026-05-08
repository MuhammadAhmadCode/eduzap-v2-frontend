import React from "react";

const TasksCreatedToday = ({
  tasksCreatedToday,
  CreatedTodayvisible,
  formatDeadline,
  setCreatedTodayvisible,
  priorityBadgeClass,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-sky-500/30 rounded-xl  p-6 hover:border-sky-500/60 transition">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">✨</span>
        <h3 className="text-xl font-semibold text-white">Created today</h3>
        <span className="ml-auto bg-sky-500/20 text-sky-400 text-sm font-bold px-3 py-1 rounded-full">
          {tasksCreatedToday?.count ?? 0}
        </span>
      </div>
      {tasksCreatedToday && tasksCreatedToday.count > 0 ? (
        <div className="space-y-3 h-80 overflow-auto">
          {tasksCreatedToday.tasks.slice(0, CreatedTodayvisible).map((task) => (
            <div
              key={task.id}
              className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-3 hover:bg-sky-500/15 transition"
            >
              <p className="text-white font-medium text-sm">{task.title}</p>
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
          {tasksCreatedToday.tasks.length > CreatedTodayvisible && (
            <button
              onClick={() =>
                setCreatedTodayvisible(tasksCreatedToday.tasks.length)
              }
              className="text-sky-400 m-auto hover:text-sky-300 text-sm font-medium"
            >
              View All
            </button>
          )}
          {CreatedTodayvisible > 4 && (
            <button
              onClick={() => setCreatedTodayvisible(4)}
              className="text-sky-400 m-auto hover:text-sky-300 text-sm font-medium"
            >
              View Less
            </button>
          )}
        </div>
      ) : (
        <p className="text-slate-400 text-sm py-4">
          No new tasks created today.
        </p>
      )}
    </div>
  );
};

export default TasksCreatedToday;
