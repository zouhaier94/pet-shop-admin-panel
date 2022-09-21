import React from "react"
import Login from "../src/components/Login";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "../src/components/Add";
import Delete from "../src/components/Delete";
import Messages from "../src/components/Messages";
import Home from "../src/components/Home";
import { AuthContext } from "./context/AuthContext";

export default function App(props) {

  const { currentUser } = React.useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  console.log(currentUser)
  return (
    <div >
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/home" element={<><RequireAuth><Home /><Add /></RequireAuth></>} />

          <Route path="/add" element={<><RequireAuth><Home /><Add /></RequireAuth></>} />

          <Route path="/delete" element={<> <RequireAuth> <Home /><Delete /></RequireAuth></>} />

          <Route path="/messages" element={<><RequireAuth><Home /><Messages /></RequireAuth></>} />

        </Routes>
      </BrowserRouter>

    </div>
  )
}