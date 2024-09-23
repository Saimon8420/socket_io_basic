import { useEffect, useState } from 'react'
import './App.css'
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000")

const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    // console.log(e);
    e.preventDefault();
    socket.emit("chat", { message, userName })
    setMessage("");
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      // console.log(payload);
      setChat([...chat, payload])
    })
  }, [])

  // console.log(chat);

  return (
    <div>
      <h1>Chat app</h1>
      <hr />
      {
        chat?.map((payload, i) => {
          return (
            <p key={i}>{payload?.message}: <span style={{ backgroundColor: "orange", padding: "5px" }}>id: {payload?.userName}</span></p>
          )
        })
      }
      <hr />
      <form onSubmit={sendChat}>
        <div className='msg-input'>
          <input type="text" name="chat" placeholder='send text'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />

          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default App
