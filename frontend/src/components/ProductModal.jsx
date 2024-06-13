import React from "react";
import ReactDOM from "react-dom";
import '../css/productmodal/productmodal.css'

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById("root") // Ensure this div exists in your index.html or root component
  );
};

export default Modal;
