import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // backend clears cookie
      dispatch(logout());             // redux clears user
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        GigFlow
      </Link>
       <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Home
          </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700 font-medium">
              Hi, {user.name || "User"}
            </span>
            <Link
            to="/create-gig"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
             Post Job
            </Link>


            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
