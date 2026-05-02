import axios from "axios";

export const BASE_URL = "http://localhost:3000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const endpoints = {
  auth: {
    register: "/auth/user/register",
    login: "/auth/user/login",
    logout: "/auth/user/logout",
    me: "/auth/user/me",
  },
  tasks: {
    createTask: "/tasks/create-task",
    allTasks: "/tasks/alltasks",
    latest: "/tasks/latest",
    stats: "/tasks/stats",
    deleteTask: (id) => `/tasks/deltetask/${id}`,
    updateTask: (id) => `/tasks/updatetask/${id}`,
    updateTaskCompleted: (id) => `/tasks/updateTaskCompleted/${id}`,
  },
  notes: {
    createNote: "/notes/create-note",
    allNotes: "/notes/allnotes",
    deleteNote: (id) => `/notes/deletenote/${id}`,
    updateNote: (id) => `/notes/updatenote/${id}`,
  },
};
