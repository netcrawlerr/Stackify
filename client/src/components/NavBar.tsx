import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-4 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-stone-900 text-5xl font-extrabold">
          Stackify 💼
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-stone-900 text-lg px-4 py-2 hover:border-b hover:border-b-red-600 transition duration-200"
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/add"
              className="text-stone-900 text-lg px-4 py-2 hover:border-b hover:border-b-red-600 transition duration-200"
            >
              Add Product
            </Link>
          )}

          {isLoggedIn && (
            <Link
              to="/edit"
              className="text-stone-900 text-lg px-4 py-2 hover:border-b hover:border-b-red-600 transition duration-200"
            >
              View
            </Link>
          )}

          {isLoggedIn ? (
            <button
              // this to be changed when i connect backedn here
              onClick={() => setIsLoggedin((prev) => !prev)}
              className="px-4 py-2 text-lg text-red-700 font-semibold hover:border-b hover:border-b-red-600"
            >
              "Logout"
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-lg text-red-700 font-semibold hover:border-b hover:border-b-red-600"
            >
              Login
            </Link>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden text-stone-900 focus:outline-none"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2">
          <Link
            to="/"
            className="text-stone-900 text-lg px-4 py-2 hover:border-b hover:border-b-red-600 transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/add"
            className="text-stone-900 text-lg px-4 py-2 hover:border-b hover:border-b-red-600 transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Add Product
          </Link>
          <Link
            to="/edit"
            className="text-stone-900 text-lg px-4 py-2 hover:border-b hover:border-b-red-600 transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            View
          </Link>
          <button
            onClick={() => {
              setIsLoggedin((prev) => !prev);
              setIsMenuOpen(false);
            }}
            className="px-4 py-2 text-lg text-red-700 font-semibold hover:border-b hover:border-b-red-600"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
