import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Gigs from "./pages/Gigs";
import GigDetails from "./pages/GigDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateGig from "./pages/CreateGig";

import socket from "./socket"; // 🔥 socket client

export default function App() {
  const user = useSelector((state) => state.auth.user);

  // 🔥 Join socket room after login
  useEffect(() => {
    if (user) {
      socket.emit("join", user._id);
      console.log("Joined socket room:", user._id);
    }
  }, [user]);

  // 🔔 Listen for hire notification
  useEffect(() => {
    socket.on("hired", (message) => {
      alert(message); // simple demo notification
    });

    return () => {
      socket.off("hired");
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-gig" element={<CreateGig />} />
      </Routes>
    </BrowserRouter>
  );
}
