import { useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthContext from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`${user ? "pb-13" : ""} w-full min-h-screen pt-20 bg-slate-900`}
    >
      <AppRoutes />
    </div>
  );
};

export default App;
