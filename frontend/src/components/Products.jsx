import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "./cart/CartContext";
import Modal from "./ProductModal";
import "../css/product/product.css";
import "../css/productmodal/productmodal.css";
import { ToastContainer,toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product
  const { addToCart } = useContext(CartContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for confirmation modal

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

  // Function to handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  // Function to increase quantity
  const handleIncreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  // Function to decrease quantity
  const handleDecreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Function to handle size change
  const handleSizeChange = (id, newSize) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, size: newSize } : product
      )
    );
  };

  // Function to calculate total price
  const calculateTotalPrice = (price, quantity, size) => {
    return size === "full" ? price * quantity * 2 : price * quantity;
  };

  // Function to add product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Function to handle Buy Now button click
  const handleBuyNow = (product) => {
    setSelectedProduct(product); // Set selected product for confirmation
    setShowConfirmationModal(true); // Show confirmation modal
  };

  // Function to close confirmation modal
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedProduct(null); // Reset selected product
  };

  // Function to confirm purchase
  const confirmPurchase = () => {
    addToCart(selectedProduct); // Add to cart action
    closeConfirmationModal(); // Close confirmation modal
  toast.success('Your purchase was successful!') // You can replace this with your desired action
  handleAddToCart('');
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
              <button className="card-link" onClick={() => setSelectedProduct(product)}>
                <img src={`http://localhost:3000/products/${product.productImage}`} className="card-img-top" alt={product.productName} />
              </button>
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
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

      {/* Product details modal */}
      {selectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)}>
          <div className="modal-header">
            <h5 className="modal-title">{selectedProduct.productName}</h5>
            <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
          </div>
          <div className="modal-body">
            <img src={`http://localhost:3000/products/${selectedProduct.productImage}`} className="img-fluid" alt={selectedProduct.productName} />
            <p>{selectedProduct.productDescription}</p>
            <div>
              <strong>Price:</strong> Rs.{calculateTotalPrice(selectedProduct.productPrice, selectedProduct.quantity, selectedProduct.size)}
            </div>
            <button className="btn btn-sm btn-primary mt-2" onClick={() => handleBuyNow(selectedProduct)}>Buy Now</button>
          </div>
        </Modal>
      )}

      {/* Confirmation modal */}
      {showConfirmationModal && (
        <Modal onClose={closeConfirmationModal}>
          <div className="modal-header">
            <h5 className="modal-title">Confirm Purchase</h5>
            <button type="button" className="btn-close" onClick={closeConfirmationModal}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to buy "{selectedProduct.productName}"?</p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-sm btn-danger me-2" onClick={closeConfirmationModal}>No</button>
              <Link to="/myorders" className="btn btn-sm btn-success" onClick={confirmPurchase}>Yes</Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Products;
