import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [hoveredArea, setHoveredArea] = useState(null); // For zoomed-in view
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://6776e01f80a79bf919007780.mockapi.io/laptops/${id}`
        );
        setProduct(response.data);
        setSelectedImage(response.data.images[0]);

        // Fetch other products of the same brand
        const brandResponse = await axios.get(
          "https://6776e01f80a79bf919007780.mockapi.io/laptops"
        );
        setBrandProducts(
          brandResponse.data.filter(
            (item) => item.brand === response.data.brand && item.id !== id
          )
        );
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          Product added to cart successfully!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex flex-col md:w-1/2 relative">
          <div
            className="relative mb-4"
            style={{ height: "400px" }} // Increase main image area
            onMouseMove={(e) => {
              const { left, top, width, height } =
                e.target.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              setHoveredArea({ x, y });
            }}
            onMouseLeave={() => setHoveredArea(null)}
          >
            {/* Main Image */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full rounded-lg shadow object-contain bg-gray-100"
            />
            {/* Cursor Highlight Overlay */}
            {hoveredArea && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: `${hoveredArea.y - 10}%`,
                  left: `${hoveredArea.x - 10}%`,
                  width: "20%",
                  height: "20%",
                  border: "2px solid rgba(255, 255, 255, 0.8)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              />
            )}
            {/* Zoom Area */}
            {hoveredArea && (
              <div
                className="absolute top-0 left-full ml-4 w-96 h-96 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden shadow-lg"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: "200%",
                  backgroundPosition: `${hoveredArea.x}% ${hoveredArea.y}%`,
                }}
              />
            )}
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-20 object-contain cursor-pointer border ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                style={{ maxHeight: "80px" }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-xl font-semibold text-blue-500 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <ul className="list-disc list-inside mb-6">
            {product.keyFeatures.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* More from Brand Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          More from {product.brand}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brandProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 block"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-blue-500 font-bold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
