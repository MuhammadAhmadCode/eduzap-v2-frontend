import React from "react";
import { motion } from "motion/react";

const TaskCard = ({ value, title, color, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 bg-linear-to-r ${color} rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-300`}
      ></div>
      <div className="relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 group-hover:border-opacity-100 transition">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <p className="text-4xl font-bold text-white mt-2">{value}</p>
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
