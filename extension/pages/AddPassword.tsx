import { url } from "inspector"
import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"

import Home from "./Home"

function AddPassword({ dispatch }) {
  const navigate = useNavigate()
  const webRef = useRef(null)
  const passRef = useRef(null)
  const userRef = useRef(null)
  const urlRef = useRef(null)

  function handleSave() {
    const [website, password, user, url] = [
      webRef.current.value,
      passRef.current.value,
      userRef.current.value,
      urlRef.current.value
    ]

    if (website && password && user && url) {
      dispatch({
        type: "added",
        payload: {
          website,
          password,
          user,
          url,
          id: Date.now(), // başka
          visible: false
        }
      })
      navigate("/home")
    } else {
      // throw Error("Uncomplete Password");
      console.error("An error occured while setting password state.")
    }
  }

  return (
    <>
      <header className="main-header">

      </header>
      <div className="pages-container">
        <label id="website">Website:</label>
        <input type="text" id="website" name="website" ref={webRef} />
        <label id="username">Username:</label>
        <input type="text" name="username" id="username" ref={userRef} />
        <label id="password">Password:</label>
        <input type="password" name="password" id="password" ref={passRef} />
        <label id="url">Website Url:</label>
        <input type="url" name="url" id="url" ref={urlRef} />
        <p>
          <button className="add-btn" onClick={handleSave}>
            Add Passsword
          </button>
        </p>
      </div>
    </>
  )
}

export default AddPassword
