import type { url } from "inspector"
import React, { useEffect, useState } from "react"
import { Icon } from "react-icons-kit"
import { eye } from "react-icons-kit/feather/eye"
import { eyeOff } from "react-icons-kit/feather/eyeOff"
import { useNavigate } from "react-router-dom"


interface Passsword {
  website: string
  url: string
  password: string
  user: string
  id: string
  visible: boolean
}

// function passwordReducer(passwords, action) {
//   switch (action.type) {
//     case "added": {
//       return [...passwords, action.payload]
//     }
//     case "deleted": {
//       return passwords.filter((_, index) => index !== action.id)
//     }
//     case "handleToggle": {
//       return [...passwords, !passwords.visible]
//     }
//   }
// }

function Home({ password, dispatch }) {
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(password))
  }, [password])

  const navigate = useNavigate()
  const [type, setType] = useState("password")
  const [icon, setIcon] = useState(eyeOff)
  function handleToggle(_i) {
    dispatch({
      type: "toggled",
      payload: _i
    })
  }
  return (
    <div className="pages-container">
      <header className="main-header">
        <div className="logo-container">
        <img src={require("../assets/log.png")} alt="Logo" className="logo" />
        </div>      
      </header>
      <div className="passwords">
        <ul className="my-password">
          {password.map((password: Passsword, _i: number) => (
            <li key={_i}>
              {password.website} <br />
              {password.url} <br />
              {password.user} <br />
              {password.visible ? password.password : ""}
              <span
                className="flex justify-around items-center"
                onClick={() => handleToggle(_i)}>
                <Icon icon={password.visible ? eye : eyeOff} size={16} />
              </span> 
            </li>
          ))}
        </ul>
      </div>
      <button className="add-btn" onClick={() => navigate("/add-password")}>
        Add Password
      </button>
    </div>
  )
};

export default Home
