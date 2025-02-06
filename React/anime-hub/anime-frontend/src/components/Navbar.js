import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { toggleDarkMode } from "../store/uiSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          AnimeHub
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={handleToggleDarkMode} className="text-white hover:text-gray-300">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {user ? (
            <>
              <Link to="/profile" className="text-white hover:underline">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
