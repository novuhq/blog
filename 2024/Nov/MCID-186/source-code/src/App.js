import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Homepage from "./components/Homepage";
import Register from "./components/Register";

const socket = new WebSocket("ws://localhost:8080");

function App() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Register
            firstName={firstName}
            setFirstName={setFirstName}
            email={email}
            setEmail={setEmail}
            socket={socket}
          />
        }
      />
      <Route
        path="/home"
        element={
          <Homepage firstName={firstName} email={email} webSocket={socket} />
        }
      />
    </Routes>
  );
}
export default App;
