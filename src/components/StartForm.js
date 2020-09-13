import React, { useState } from "react"
import axios from "axios"

const StartForm = ({ storeToken }) => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()
    const result = await axios({
      method: "POST",
      url: "https://topaz-hippopotamus-3814.twil.io/create-token",
      data: {
        identity: name,
      },
    })
    const jwt = result.data
    storeToken(jwt)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Display name: <br />
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label htmlFor="room">Room to join:</label>
      <br />
      <input
        id="room"
        name="room"
        type="text"
        value={room}
        onChange={e => setRoom(e.target.value)}
      />
      <br />
      <br />
      <button type="submit">Join chat</button>
    </form>
  )
}

export default StartForm
