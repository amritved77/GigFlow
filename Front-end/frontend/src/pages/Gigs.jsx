import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/gigs?search=${search}`);
        setGigs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Box */}
      <input
        placeholder="Search gigs..."
        className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔄 LOADING SKELETON */}
      {loading && (
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-200 animate-pulse"
            >
              <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ❌ EMPTY STATE (AFTER LOADING) */}
      {!loading && gigs.length === 0 && (
        <p className="text-center text-gray-500">
          No gigs found
        </p>
      )}

      {/* ✅ GIGS LIST */}
      {!loading && (
        <div className="grid gap-4">
          {gigs.map((gig) => (
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

                  {/* STATUS BADGE */}
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
      )}
    </div>
  );
}
