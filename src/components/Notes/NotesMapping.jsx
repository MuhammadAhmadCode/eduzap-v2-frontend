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
    const c = confirm("Do you really want to delete the task?");
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

  // const handleCopy = (text) => {
  //     navigator.clipboard.writeText(text)
  // }

  return (
    <div className="w-[90%] md:w-1/2 items-center gap-3 flex flex-col mt-20 md:mt-0">
      <h1 className="text-3xl text-center font-bold">Your Notes</h1>
      <div className="text-white mt-5 w-full flex gap-5 justify-center items-center">
        <input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="border-gray-600 text-sm font-semibold py-2  border rounded-2xl px-3  bg-gray-800/60 w-[50%]"
          type="text"
          placeholder="Search Notes by title"
        />
      </div>
      <div className="ml-4 flex mt-7 justify-center flex-wrap gap-3">
        {displayNotes.length === 0 && <div>No Notes to display</div>}

        {displayNotes.map((note) => {
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              key={note._id}
              className="bg-[#141d34] rounded-2xl shadow-md hover:bg-slate-800 transition shadow-black hover:shadow-lg hover:shadow-black/85 flex items-center flex-col justify-between gap-14 min-w-[95%] p-3"
            >
              <div className="flex flex-col gap-3">
                {editingId !== note._id && (
                  <h3 className="text-2xl">{note.title}</h3>
                )}
                {editingId !== note._id && (
                  <p className="text-sm">{note.description}</p>
                )}
                {editingId == note._id && (
                  <input
                    className={`${note.description.length > 20 ? "py-4" : ""} outline-none text-xl`}
                    placeholder="Enter Edit Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    type="text"
                  />
                )}
                {editingId == note._id && (
                  <input
                    className="outline-none text-sm"
                    placeholder="Enter Edit Description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    type="text"
                  />
                )}
              </div>
              <div className="flex gap-2">
                {note._id !== editingId && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleEdit(note._id)}
                    className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer"
                  >
                    {<FaEdit />}
                  </motion.button>
                )}
                {note._id !== editingId && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleDelete(note._id)}
                    className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer"
                  >
                    {<AiFillDelete />}
                  </motion.button>
                )}
                {note._id == editingId && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleSave(note._id)}
                    className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer"
                  >
                    {<BiSave />}
                  </motion.button>
                )}
                {note._id == editingId && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={handleCancel}
                    className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer"
                  >
                    {<GiCancel />}
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    alert("Description Copied");
                    return navigator.clipboard.writeText(note.description);
                  }}
                  className="bg-gray-900 shadow shadow-white/25 border border-gray-600 hover:bg-gray-800 hover:shadow-white/65 p-3 rounded-2xl cursor-pointer"
                >
                  {<BiCopy />}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesMapping;
