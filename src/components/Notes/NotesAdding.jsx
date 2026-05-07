import React, { useState, useContext } from "react";
import { NotesContext } from "../../context/NotesContext";
import { api, endpoints } from "../../api/api";
import { motion } from "motion/react";
import { FaPlus } from "react-icons/fa";

const NotesAdding = () => {
  const [title, setTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const { notes, setNotes } = useContext(NotesContext);

  const handleAdd = async () => {
    await api.post(endpoints.notes.createNote, {
      title: title,
      description: noteDescription,
    });
    setTitle("");
    setNoteDescription("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[90%] flex flex-col gap-6 md:w-1/2 bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-slate-900/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <FaPlus className="text-white text-xl" />
        </div>
        <h2 className="text-2xl font-bold text-white">Create New Note</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Note Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/60"
            type="text"
            placeholder="Enter a catchy title..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Note Description
          </label>
          <textarea
            value={noteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/60 resize-none"
            rows="6"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <motion.button
          disabled={
            title.trim().length <= 3 || noteDescription.trim().length <= 5
          }
          onClick={handleAdd}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 mt-4"
        >
          <span className="flex items-center justify-center gap-2">
            <FaPlus />
            Add Note
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NotesAdding;
