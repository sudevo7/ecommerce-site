import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://6776e01f80a79bf919007780.mockapi.io/laptops"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const enrichedCartItems = cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return {
      ...cartItem,
      image: product?.images[0] || "/default-placeholder.png",
      name: product?.name || cartItem.name,
    };
  });

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    } else {
      alert("Your cart is empty. Add some items before checking out.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-red-800 mb-6">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600">
          Add products to your cart by visiting the{" "}
          <Link to="/" className="text-blue-500 underline">
            Shop
          </Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {enrichedCartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain rounded-lg border"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart({ id: item.id }))}
                className="text-red-500 font-semibold hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
