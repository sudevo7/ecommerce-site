import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-64 w-full">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain bg-gray-100 rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition duration-300"></div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
        <p className="text-blue-500 font-bold text-xl">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
