import React, { useContext } from 'react';
import { CartContext } from '../../components/cart/CartContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotalPrice = (price, quantity, size) => {
    return size === "full" ? price * quantity * 2 : price * quantity;
  };

  const handleRemoveFromCart = (itemId) => {
    const confirmed = window.confirm("Are you sure you want to remove this item from your cart?");
    if (confirmed) {
      removeFromCart(itemId);
    }
  };

  if (cart.length === 0) {
    return <div className="container mt-5"><h2>Your cart is empty</h2></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>
      <table className="table table-bordered table-hover">
        <thead className="bg-dark text-white">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Size</th>
            <th scope="col">Total Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item._id} className={index % 2 === 0 ? 'table-light' : ''}>
              <th scope="row">{index + 1}</th>
              <td>
                <img src={item.image  || 'default-image-url.jpg'} alt={item.productName} style={{ width: '100px' }} />
              </td>
              <td>{item.productName}</td>
              <td>{item.productCategory}</td>
              <td>{item.productDescription || "Description not available"}</td>
              <td>{item.quantity}</td>
              <td>{item.size}</td>
              <td>Rs {calculateTotalPrice(item.productPrice, item.quantity, item.size)}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
