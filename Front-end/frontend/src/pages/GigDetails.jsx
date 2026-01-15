import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";

export default function GigDetails() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [bid, setBid] = useState({ message: "", price: "" });

  // ================= FETCH GIG + BIDS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gigRes = await api.get(`/gigs/${id}`);
        setGig(gigRes.data);

        const bidsRes = await api.get(`/bids/${id}`);
        setBids(bidsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // ================= OWNER CHECK =================
  const isOwner = user && gig && gig.ownerId === user._id;

  // ================= SUBMIT BID (FREELANCER) =================
  const submitBid = async () => {
    try {
      await api.post("/bids", { ...bid, gigId: id });

      const res = await api.get(`/bids/${id}`);
      setBids(res.data);

      setBid({ message: "", price: "" });
      alert("Bid submitted successfully");
    } catch (err) {
      alert("Please login to submit a bid");
    }
  };

  // ================= HIRE FREELANCER (OWNER) =================
  const hire = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);

      const res = await api.get(`/bids/${id}`);
      setBids(res.data);

      alert("Freelancer hired");
    } catch (err) {
      alert("You are not authorized");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* ================= GIG INFO ================= */}
        {gig && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {gig.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {gig.description}
            </p>

            <p className="text-green-600 font-bold mt-2">
              Budget: ₹{gig.budget}
            </p>

            {gig.status === "assigned" && (
              <span className="inline-block mt-3 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                Assigned
              </span>
            )}
          </div>
        )}

        {/* ================= OWNER VIEW ================= */}
        {isOwner && (
          <>
            <h3 className="text-xl font-semibold mb-4">
              Freelancer Bids
            </h3>

            {bids.length === 0 && (
              <p className="text-gray-500">No bids yet</p>
            )}

            <div className="space-y-4">
              {bids.map((b) => (
                <div
                  key={b._id}
                  className="bg-white p-5 rounded-xl shadow border"
                >
                  {/* BIDDER NAME */}
                  <p className="text-sm text-gray-500 mb-1">
                    Bidder:{" "}
                    <span className="font-medium text-gray-700">
                      {b.freelancerId?.name}
                    </span>
                  </p>

                  {/* MESSAGE */}
                  <p className="text-gray-700 mb-2">
                    {b.message}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">
                      ₹ {b.price}
                    </span>

                    {b.status === "pending" && (
                      <button
                        onClick={() => hire(b._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Hire
                      </button>
                    )}

                    {b.status === "hired" && (
                      <span className="text-green-700 font-semibold">
                        Hired
                      </span>
                    )}

                    {b.status === "rejected" && (
                      <span className="text-red-500 font-semibold">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= FREELANCER VIEW ================= */}
        {user && !isOwner && (
          <div className="bg-white p-6 rounded-xl shadow mt-10">
            <h3 className="text-xl font-bold mb-4">
              Submit a Bid
            </h3>

            <input
              placeholder="Your message"
              value={bid.message}
              className="w-full mb-3 p-3 border rounded-lg"
              onChange={(e) =>
                setBid({ ...bid, message: e.target.value })
              }
            />

            <input
              placeholder="Your price"
              value={bid.price}
              className="w-full mb-4 p-3 border rounded-lg"
              onChange={(e) =>
                setBid({ ...bid, price: e.target.value })
              }
            />

            <button
              onClick={submitBid}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Submit Bid
            </button>
          </div>
        )}

        {/* ================= NOT LOGGED IN ================= */}
        {!user && (
          <p className="text-center text-gray-500 mt-10">
            Please login to submit or review bids
          </p>
        )}
      </div>
    </div>
  );
}
