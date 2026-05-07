import { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import { AiFillDelete } from "react-icons/ai";
import { BiCopy, BiSave, BiSearch } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { motion } from "motion/react";
import { api, endpoints } from "../../api/api";

const NotesMapping = () => {
  const { notes, filterText, setFilterText } = useContext(NotesContext);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const displayNotes =
    filterText.length > 0
      ? notes.filter((note) =>
          note.title.toLowerCase().includes(filterText.toLowerCase()),
        )
      : notes;

  const handleDelete = async (id) => {
    const c = confirm("Do you really want to delete this note?");
    if (c) {
      await api.delete(endpoints.notes.deleteNote(id));
    }
  };

  const handleEdit = (id) => {
    const note = notes.find((note) => {
      return note._id == id;
    });
    setEditTitle(note.title);
    setEditDescription(note.description);

    setEditingId(id);
  };

  const handleSave = async (id) => {
    await api.patch(endpoints.notes.updateNote(id), {
      title: editTitle,
      description: editDescription,
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-[90%] md:w-1/2 flex flex-col gap-6"
    >
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50 shadow-2xl shadow-slate-900/50">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Your Notes
        </h1>

        <div className="relative mb-6">
          <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
          <input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/60"
            type="text"
            placeholder="Search notes by title..."
          />
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {displayNotes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-slate-400"
            >
              <div className="text-4xl mb-4">📝</div>
              <p className="text-lg">No notes to display</p>
              <p className="text-sm">Create your first note to get started!</p>
            </motion.div>
          )}

          {displayNotes.map((note, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                key={note._id}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-slate-900/50 border border-slate-700/50 p-6 transition-all duration-300 group"
              >
                <div className="flex flex-col gap-4">
                  {editingId !== note._id && (
                    <>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                        {note.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {note.description}
                      </p>
                    </>
                  )}

                  {editingId === note._id && (
                    <div className="space-y-3">
                      <input
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Edit title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        type="text"
                      />
                      <textarea
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        placeholder="Edit description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="3"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 justify-end">
                  {note._id !== editingId && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(note._id)}
                        className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200 border border-blue-600/30"
                        title="Edit note"
                      >
                        <FaEdit size={16} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(note._id)}
                        className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 border border-red-600/30"
                        title="Delete note"
                      >
                        <AiFillDelete size={16} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          navigator.clipboard.writeText(note.description);
                          // You could add a toast notification here
                        }}
                        className="p-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 hover:text-green-300 rounded-lg transition-all duration-200 border border-green-600/30"
                        title="Copy description"
                      >
                        <BiCopy size={16} />
                      </motion.button>
                    </>
                  )}

                  {note._id === editingId && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSave(note._id)}
                        className="p-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 hover:text-green-300 rounded-lg transition-all duration-200 border border-green-600/30"
                        title="Save changes"
                      >
                        <BiSave size={16} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="p-2 bg-gray-600/20 hover:bg-gray-600/40 text-gray-400 hover:text-gray-300 rounded-lg transition-all duration-200 border border-gray-600/30"
                        title="Cancel editing"
                      >
                        <GiCancel size={16} />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default NotesMapping;
