import { useState } from "react";
import logo from "../../assets/bh.png";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaQrcode,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "./CartContext";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const { cartItems = [] } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />

          <h1 className="text-xl sm:text-2xl font-bold text-red-700">
            𝘽𝙪𝙧𝙜𝙚𝙧 𝙃𝙤𝙪𝙨𝙚
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-gray-700 font-semibold">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Menu</Link></li>
          <li><Link to="/offers">Offers</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-5">

          <Link to="/cart" className="relative">
            <FaShoppingCart size={22} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/qr"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
          >
            <FaQrcode size={18} />
            <span>Scan QR</span>
          </Link>
          {token ? (
  <button
    onClick={handleLogout}
    className="bg-gray-800 text-white px-5 py-2 rounded-full"
  >
    Logout
  </button>
) : (
  <Link
    to="/login"
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold transition"
  >
    Login
  </Link>
)}

          

        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center gap-5">

          <Link to="/cart" className="relative">
            <FaShoppingCart size={22} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button onClick={() => setOpen(!open)}>
            {open ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>

        </div>

      </nav>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"
          }`}
      >
        <div className="bg-white border-t shadow-md">

          <ul className="flex flex-col p-6 gap-5 font-semibold">

            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/categories" onClick={() => setOpen(false)}>
                Menu
              </Link>
            </li>

            <li>
              <Link to="/offers" onClick={() => setOpen(false)}>
                Offers
              </Link>
            </li>

            <li>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/qr"
                onClick={() => setOpen(false)}
                className="flex justify-center items-center gap-2 bg-red-600 text-white py-3 rounded-full"
              >
                <FaQrcode />
                Scan QR
              </Link>
            </li>
            <li>
              {token ? (
                <button
                  onClick={handleLogout}
                  className="bg-gray-800 text-white px-5 py-2 rounded-full"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-red-600 text-white px-5 py-2 rounded-full"
                >
                  Login
                </Link>
              )}
            </li>
            <li>
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full font-semibold transition"
              >
                Register
              </Link>
            </li>

            

          </ul>

        </div>
      </div>
    </header>
  );
};