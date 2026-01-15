import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const register = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          placeholder="Name"
          className="w-full mb-3 p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={register}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
