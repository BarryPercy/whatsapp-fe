import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";

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
        <Route path="/" element={<Sidebar show={true} />} />
        <Route path="/session" element={<Login />} />
        <Route path="/account" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
