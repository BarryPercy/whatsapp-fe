import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import { useEffect } from "react";

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
      <BrowserRouter>
        <Sidebar />
        <Register />
        <Routes>
          <Route path="/session" element={<Login />} />
          <Route path="/account" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
