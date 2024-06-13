import React, { useContext } from 'react';
import { CartContext } from '../../components/cart/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MyOrders = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (!item) return total; // Skip null/undefined items
      return total + (item.productPrice * item.quantity * (item.size === 'full' ? 2 : 1));
    }, 0);
  };

//   const handleRemoveFromCart = (itemId) => {
//     const confirmed = window.confirm('Are you sure you want to remove this item from your cart?');
//     if (confirmed) {
//       removeFromCart(itemId);
//     }
//   };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Orders</h2>
      <div className="row">
        <div className="col-lg-8">
          {cart.map((item) => {
            if (!item) return null; // Skip rendering null/undefined items
            return (
              <div key={item._id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:3000/products/${item.productImage || 'default.jpg'}`}
                      alt={item.productName || 'Product Image'}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.productName || 'Unknown Product'}</h5>
                      <p className="card-text">{item.productDescription || 'Description not available'}</p>
                      <div className="d-flex justify-content-between">
                        <div>
                          <span className="fw-bold">Quantity:</span> {item.quantity}
                        </div>
                        <div>
                          <span className="fw-bold">Size:</span> {item.size}
                        </div>
                      </div>
                      {/* <div className="text-end mt-3">
                        <button className="btn btn-sm btn-danger" onClick={() => handleRemoveFromCart(item._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <hr />
              <p className="card-text">Items ({cart.length})</p>
              <p className="fs-5">Total Price: Rs {calculateTotalPrice()}</p>
              <button className="btn btn-primary w-100 mt-3">Total Price</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
