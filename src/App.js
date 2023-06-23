import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddTask from "./components/AddTask";
import Profile from "./components/Profile";
import Navebar from "./components/Navebar";
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import ProtectedRoutes from "./route/ProtectedRoutes";

function App() {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user, "NAVBAR OPEN");

  return (
    <>
      {user && <Navebar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile/:id" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
