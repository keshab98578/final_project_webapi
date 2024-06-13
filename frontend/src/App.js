import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/Navbar";

// Toast Config
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/admin_dashboard/AdminDashboard";
import UpdateProduct from "./pages/admin/update_product/UpdateProduct";
import { CartProvider } from "./components/cart/CartContext";
import Cartpage from "./pages/cart/cartpage";
import AdminRoutes from "./protected_routes/AdminRoutes";
import UserRoute from "./protected_routes/UserRoute";
import Profile from "./pages/profile/Profile";
import Myorders from "./pages/myorders/Myorders";

// Task create for login and register
function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mycart" element={<Cartpage />} />
          <Route path="/myorders" element={< Myorders />} />

          {/* Admin routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/update/:id" element={<UpdateProduct />} />
          </Route>
          
          {/* User Routes */}
          <Route element={<UserRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/update/:id' element={<UpdateProduct/>} /> */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;