import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetails from './components/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
};

export default App;
