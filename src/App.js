import React from "react"
import Login from "../src/components/Login";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Add from "../src/components/Add";
import Delete from "../src/components/Delete";
import Messages from "../src/components/Messages";
import Home from "../src/components/Home";
import { LoginContext } from "./context/LoginContext";

export default function App(props) {

  const [currentUser, setCurrentUser] = React.useState(JSON.parse(sessionStorage.getItem("activeUser")))

  if (currentUser) {
    sessionStorage.setItem("activeUser", JSON.stringify(true))
  } else {
    sessionStorage.setItem("activeUser", JSON.stringify(false))
  }

  console.log(currentUser)

  return (
    <div >
      <LoginContext.Provider value={{ currentUser, setCurrentUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={currentUser ? <><Home /><Add /></> : <Login />} />
            <Route path="/add" element={currentUser ? <><Home /><Add /></> : <Login />} />
            <Route path="/delete" element={currentUser ? <>  <Home /><Delete /></> : <Login />} />
            <Route path="/messages" element={currentUser ? <><Home /><Messages /></> : <Login />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  )
}