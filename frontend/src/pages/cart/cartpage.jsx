import React, { useContext } from 'react';
import { CartContext } from '../../components/cart/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.productPrice * item.quantity * (item.size === 'full' ? 2 : 1));
    }, 0);
  };

  const handleRemoveFromCart = (itemId) => {
    const confirmed = window.confirm('Are you sure you want to remove this item from your cart?');
    if (confirmed) {
      removeFromCart(itemId);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="row">
        <div className="col-lg-8">
          {cart.map((item, index) => (
            <div key={item._id} className="row mb-3 border-bottom pb-3">
              <div className="col-md-2">
                <img src={item.image || 'default-image-url.jpg'} alt={item.productName} className="img-fluid" />
              </div>
              <div className="col-md-7">
                <h5>{item.productName}</h5>
                <p>{item.productDescription || 'Description not available'}</p>
              </div>
              <div className="col-md-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="fw-bold">Quantity:</span> {item.quantity}
                  </div>
                  <div>
                    <span className="fw-bold">Size:</span> {item.size}
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button className="btn btn-sm btn-danger" onClick={() => handleRemoveFromCart(item._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total</h5>
              <h6 className="card-subtitle mb-2 text-muted">Items ({cart.length})</h6>
              <p className="fs-5">Total Price: Rs {calculateTotalPrice()}</p>
              <button className="btn btn-primary w-100">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
