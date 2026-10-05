import { useDispatch } from "react-redux"
import Login from "./pages/Login"
import { useEffect } from "react"
import { fetchMe } from "./redux/authSlice"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import ProtectRoutes from "./components/ProtectRoutes"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Products from "./pages/Products"
// import { Toaster } from 'react-hot-toast';
import Cart from "./pages/Cart"
import { fetchCart } from "./redux/cartSlice"
import ProtectAdminRoutes from "./components/ProtectAdminRoutes"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import ProductDetails from "./pages/ProductDetails"
// import AdminDashboard from "./pages/admin/AdminDashboard"
const App = () => {
  const dispatch = useDispatch()

  useEffect(() =>{
    if(localStorage.getItem("token")) {
      dispatch(fetchMe())
      dispatch(fetchCart())
    }
  }, [dispatch])
  return (
    <>
    {/* <Toaster position="top-center" reverseOrder={false} /> */}


    <Navbar/>
  
    <Routes>
      <Route element={<ProtectRoutes/>}>
      </Route>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/products/:id" element={<ProductDetails />} />


      {/* Protected Admin Routes */}
        <Route element={<ProtectAdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
   
    </Routes>
    
    
    </>
  )
}

export default App
