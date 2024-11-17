import React, { useReducer } from "react"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import AddPassword from "./pages/AddPassword"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import "./index.css"

function passwordReducer(passwords, action) {
  switch (action.type) {
    case "added":
      return [...passwords, action.payload]
    case "deleted":
      return passwords.filter((_, index) => index !== action.id)
    case "toggled": {
      return passwords.map((password, index) =>
        index === action.payload
          ? { ...password, visible: !password.visible }
          : password
      )
    }
    default:
      return passwords
  }
}

function Popup() {
  const [passwords, dispatch] = useReducer(passwordReducer, [], () => {
    const saved = localStorage.getItem("passwords")
    return saved ? JSON.parse(saved) : []
  })
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Auth />} />
        <Route
          path="/home"
          element={<Home password={passwords} dispatch={dispatch} />}
        />
        <Route
          path="/add-password"
          element={<AddPassword dispatch={dispatch} />}></Route>
      </Routes>
    </Router>
  )
}

export default Popup
