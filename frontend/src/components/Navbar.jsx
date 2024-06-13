import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from './cart/CartContext';
import '../css/navbar/navbar.css';



const Navbar = () => {
    const { cart } = useContext(CartContext);

    // Function to handle logout
    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        // Force a re-render to update the navbar
        window.location.reload();
        // window.location.href='/login'
    };

    // Get user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <nav className="navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">Go <span className="text-danger">Food</span></Link>
                <div className="menu">
    <ul className="navbar-nav d-flex flex-row align-items-center">
        <li className="nav-item">
            <Link className="nav-link" to="/" activeClassName="active">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/menu" activeClassName="active">Menu</Link>
        </li>

        <li className="nav-item">
            <Link className="nav-link" to="/menu" activeClassName="active">Contact</Link>
        </li>
    </ul>
</div>
                <div className="user-section">
                    {user ? (
                        <div className="user-dropdown">
                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                               Welcome  {user.firstName}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="login-section">
                            <Link to="/login" className="btn btn-primary">Login</Link>
                            <Link to="/register" className="btn btn-success">Register</Link>
                        </div>
                    )}
                    <Link to="/mycart" className="cart-icon">
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        <span className="badge bg-danger">{cart.length}</span> {/* Cart count */}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
