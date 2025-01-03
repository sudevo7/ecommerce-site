import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-blue-400">Lap</span>
            <span className="text-gray-200">Topia</span>
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 transition duration-300 text-lg"
          >
            Home
          </Link>
          {/* <Link
            to="/about"
            className="text-gray-300 hover:text-blue-400 transition duration-300 text-lg"
          >
            About
          </Link> */}
          {/* <Link
            to="/contact"
            className="text-gray-300 hover:text-blue-400 transition duration-300 text-lg"
          >
            Contact
          </Link> */}

          {/* Cart Link */}
          <Link
            to="/cart"
            className="relative text-gray-300 hover:text-blue-400 transition duration-300 flex items-center space-x-1"
          >
            <FaShoppingCart className="text-xl" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {totalQuantity}
              </span>
            )}
            <span className="text-lg">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
