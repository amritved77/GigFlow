import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get(`/gigs?search=${search}`).then(res => setGigs(res.data));
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Box */}
      <input
        placeholder="Search gigs..."
        className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Empty State */}
      {gigs.length === 0 && (
        <p className="text-center text-gray-500">
          No gigs found
        </p>
      )}

      {/* Gigs List */}
      <div className="grid gap-4">
        {gigs.map(gig => (
          <Link to={`/gigs/${gig._id}`} key={gig._id}>
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 border border-gray-200">
              
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {gig.title}
              </h2>

              <p className="text-gray-600 mb-3">
                {gig.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-green-600 font-bold">
                  ₹ {gig.budget}
                </span>

                 {/* 🔥 STATUS BADGE (THIS IS THE IMPORTANT PART) */}
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-medium ${
                      gig.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {gig.status}
                  </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
