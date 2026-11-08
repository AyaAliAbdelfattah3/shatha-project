// import { useDispatch } from "react-redux"
// import Login from "./pages/Login"
// import { useEffect } from "react"
// import { fetchMe } from "./redux/authSlice"
// import Navbar from "./components/Navbar"
// import { Route, Routes } from "react-router-dom"
// import ProtectRoutes from "./components/ProtectRoutes"
// import Register from "./pages/Register"
// import Home from "./pages/Home"
// import Products from "./pages/Products"
// // import { Toaster } from 'react-hot-toast';
// import Cart from "./pages/Cart"
// import { fetchCart } from "./redux/cartSlice"
// import ProtectAdminRoutes from "./components/ProtectAdminRoutes"
// import AdminDashboard from "./pages/admin/AdminDashboard"
// import AdminProducts from "./pages/admin/AdminProducts"
// import AdminOrders from "./pages/admin/AdminOrders"
// import ProductDetails from "./pages/ProductDetails"
// import About from "./pages/About"
// import ContactUs from "./pages/ContactUs"
// import Footer from "./components/Footer"
// import Profile from "./pages/user/Profile"
// // import AdminDashboard from "./pages/admin/AdminDashboard"
// import AdminUsers from './pages/admin/AdminUsers';
// import Checkout from "./pages/Checkout"
// import MyOrders from "./pages/user/MyOrders"
 


// const App = () => {
//   const dispatch = useDispatch()
//   const isAdminPage = location.pathname.startsWith("/admin");

//   useEffect(() =>{
//     if(localStorage.getItem("token")) {
//       dispatch(fetchMe())
//       dispatch(fetchCart())
//     }
//   }, [dispatch])
//   return (
//     <>
//     {/* <Toaster position="top-center" reverseOrder={false} /> */}


//     <Navbar/>
  
//     <Routes>
//       <Route element={<ProtectRoutes/>}>
//       </Route>
//           <Route path="/" element={<Home/>}/>
//           <Route path="/products" element={<Products/>}/>
//           <Route path="/login" element={<Login/>}/>
//           <Route path="/register" element={<Register/>}/>
//           <Route path="/cart" element={<Cart/>}/>
//           <Route path="/products/:id" element={<ProductDetails />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<ContactUs />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/my-orders" element={<MyOrders />} />

    

//       {/* Protected Admin Routes */}
//         <Route element={<ProtectAdminRoutes />}>
//           <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/products" element={<AdminProducts />} />
//         <Route path="/admin/orders" element={<AdminOrders />} />
//         <Route path="/admin/users" element={<AdminUsers/>} />
//         </Route>
   
//     </Routes>
    
// {!isAdminPage && <Footer />}    </>
//   )
// }

// export default App

import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import { useEffect } from "react";
import { fetchMe } from "./redux/authSlice";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom"; // ضفنا useLocation
import ProtectRoutes from "./components/ProtectRoutes";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { fetchCart } from "./redux/cartSlice";
import ProtectAdminRoutes from "./components/ProtectAdminRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import Profile from "./pages/user/Profile";
import AdminUsers from './pages/admin/AdminUsers';
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/user/MyOrders";
//  استيراد ملف CSS الخاص بالتطبيق
import './App.css';
import CustomCursor from "./components/CustomCursor";



const App = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // تعريف الـ location

  // 1. تحديد الصفحات اللي مش عايزين يظهر فيها النافبار والفوتر
  const hideNavbarAndFooter = 
    location.pathname.startsWith("/admin") || 
    location.pathname === "/login" || 
    location.pathname === "/register";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchMe());
      dispatch(fetchCart());
    }
  }, [dispatch]);

  return (
    <>
            <CustomCursor />

      {/* النافبار بيظهر بس لو مش في صفحة أدمن أو لوجن أو ريجستر */}
      {!hideNavbarAndFooter && <Navbar />}

      <Routes>
        {/* ================= المسارات العامة (مش محتاجة تسجيل دخول) ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        
        {/* صفحات اللوجن والريجستر (بره الحماية عشان الزائر يقدر يدخلها) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= المسارات المحمية (محتاجة تسجيل دخول) ================= */}
        <Route element={<ProtectRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Route>

        {/* ================= مسارات الأدمن (محمية للأدمن بس) ================= */}
        <Route element={<ProtectAdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>

      {/* الفوتر بيظهر بس لو مش في صفحة أدمن أو لوجن أو ريجستر */}
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

export default App;
