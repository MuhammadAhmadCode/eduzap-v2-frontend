import { useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthContext from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`w-full bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen ${user ? "pt-20" : ""} bg-slate-900`}
    >
      <AppRoutes />
    </div>
  );
};

export default App;
