// Products.js

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "./cart/CartContext";
import image13 from "../images/image14.jpg";
import '../css/product/product.css'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product/get_all_products");
        const productsWithState = response.data.products.map((product) => ({
          ...product,
          quantity: 1,
          size: "half",
        }));
        setProducts(productsWithState);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const handleIncreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleSizeChange = (id, newSize) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, size: newSize } : product
      )
    );
  };

  const calculateTotalPrice = (price, quantity, size) => {
    return size === "full" ? price * quantity * 2 : price * quantity;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4">
            <div className="card mb-4">
              <img src={image13} className="card-img-top" alt={product.productName} />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDecreaseQuantity(product._id)}>-</button>
                    <span className="mx-2">{product.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleIncreaseQuantity(product._id)}>+</button>
                  </div>
                  <select
                    className="form-select form-select-sm"
                    value={product.size}
                    onChange={(e) => handleSizeChange(product._id, e.target.value)}
                  >
                    <option value="half">Half</option>
                    <option value="full">Full</option>
                  </select>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="text-success">Rs.{calculateTotalPrice(product.productPrice, product.quantity, product.size)}</div>
                  <button className="btn btn-sm btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
