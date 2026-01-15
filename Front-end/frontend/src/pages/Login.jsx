import { useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", form);
      dispatch(setUser(res.data));
      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md border border-gray-200">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to GigFlow
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                     font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}
