import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      await api.post("/gigs", form);
      alert("Gig posted successfully");
      navigate("/");
    } catch {
      alert("Login required");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Post a Job</h2>

        <input
          placeholder="Title"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Budget"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Post Job
        </button>
      </div>
    </div>
  );
}
