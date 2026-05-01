import { useState, useEffect, useContext } from "react";
import { TaskContext } from "./TaskContext";
import AuthContext from "./AuthContext";
import { api, endpoints } from "../api/api";

const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      try {
        const res = await api.get(endpoints.tasks.allTasks);
        setTasks(res.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [user, tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
