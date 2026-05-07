import React from "react";
import NotesMapping from "../components/Notes/NotesMapping";
import NotesAdding from "../components/Notes/NotesAdding";
import { motion } from "motion/react";

const Notes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between gap-4 flex-wrap"
        >
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-emerald-300 uppercase tracking-[0.3em] font-semibold mb-2"
            >
              Notes Center
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Notes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed"
            >
              Organize your{" "}
              <span className="text-emerald-300 font-semibold">thoughts</span>,{" "}
              <span className="text-blue-300 font-semibold">ideas</span> and{" "}
              <span className="text-purple-300 font-semibold">reminders</span>{" "}
              in one place. Create, edit, and manage your notes with powerful
              tools designed for productivity.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full flex text-white flex-col justify-center md:flex-row p-7 gap-8"
        >
          <NotesAdding />
          <div className="hidden md:block min-h-[75vh] border-r-2 border-gradient-to-b from-transparent via-slate-700/50 to-transparent"></div>
          <NotesMapping />
        </motion.div>
      </div>
    </div>
  );
};

export default Notes;
