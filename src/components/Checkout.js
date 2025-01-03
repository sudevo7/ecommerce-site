import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit_card",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      dispatch(clearCart());
      navigate("/my-orders");
    }, 2000); // Simulates a brief delay for the popup
  };

  return (
    <div className="container mx-auto py-12 px-6">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600">You will be redirected to your orders shortly.</p>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex space-x-2">
          {["Order Summary", "Enter Details", "Confirm Order"].map((label, index) => (
            <div
              key={index}
              className={`flex-1 text-center py-2 rounded ${
                step === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="mb-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between py-2 border-b">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
              <button
                onClick={() => setStep(2)}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Enter Your Details</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
            </div>
          </form>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Confirm Your Order</h1>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Address:</strong> {formData.address}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {formData.paymentMethod.replace("_", " ")}
          </p>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              onClick={handleOrderSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
