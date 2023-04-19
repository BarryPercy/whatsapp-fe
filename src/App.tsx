import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
  Navigate
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import Main from "./components/Main";

function App() {
  const [queryParams] = useSearchParams();
  useEffect(() => {
    if (queryParams.get("accessToken")) {
      localStorage.setItem("token", queryParams.get("accessToken") as string);
      console.log(queryParams.get("accessToken"));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
