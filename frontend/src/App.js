import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Navbar from './components/Navbar';

// Toast Config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard';
import UpdateProduct from './pages/admin/update_product/UpdateProduct';
import { CartProvider } from './components/cart/CartContext';
import  Cartpage from './pages/cart/cartpage'

// Task create for login and register
function App() {
  return (
 <CartProvider>
  <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>

        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path ='/mycart' element ={< Cartpage />} />
        

        {/* Admin routes */}
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/update/:id' element={<UpdateProduct/>} />

      </Routes>
    </Router>
   
 </CartProvider>
     
   
  );
}

export default App;
