



import { Heart, Search, ShoppingCart, User , LogOut, Menu, X} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { clearCart, selectCartCount } from "../redux/cartSlice";
import {
  searchProducts,
  clearSearchResults,
} from "../redux/searchSlice";
import { logOut } from "../redux/authSlice";

import { useEffect, useState } from "react";

const Navbar = () => {
  const totalCartQuantity = useSelector(selectCartCount) || 0;
 
    const { user, status: authStatus, error: authError } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // ✅ جديد

  const {
    results: searchResults,
    status,
  } = useSelector((state) => state.search);

  // لو خرجنا من صفحة المنتجات إلى تفاصيل منتج
  // نمسح الـ input والـ dropdown
  useEffect(() => {
    if (!location.pathname.startsWith("/products")) {
      setSearchTerm("");
      setIsSearchOpen(false);
    }
  }, [location.pathname]);
 // ✅ جديد: إغلاق user menu عند الانتقال لصفحة أخرى
  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);
  // عند الكتابة في البحث
  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    if (value.trim().length < 1) {
      dispatch(clearSearchResults());
      setIsSearchOpen(false);
      return;
    }

    // فتح الـ dropdown
    setIsSearchOpen(false);

    // البحث
    dispatch(searchProducts(value.toLowerCase()));
  };

  // عند الضغط على الـ input
  const handleSearchFocus = () => {
    if (searchTerm.trim().length >= 1) {
      setIsSearchOpen(true);
    }
  };

  // عند الضغط على منتج من الـ dropdown
  const handleProductClick = (productId) => {
    // مسح الـ input
    setSearchTerm("");

    // قفل الـ dropdown
    setIsSearchOpen(false);

    // مسح نتائج الـ dropdown
    dispatch(clearSearchResults());

    // الانتقال لتفاصيل المنتج
    navigate(`/products/${productId}`);
  };

  // عند الضغط على Enter
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      return;
    }

    const value = searchTerm.trim();

    // قفل الـ dropdown
    setIsSearchOpen(false);

    // مسح الـ input
    setSearchTerm("");

    // الانتقال لصفحة المنتجات
    navigate(
      `/products?search=${encodeURIComponent(value)}`
    );

    // مهم:
    // لا نعمل clearSearchResults هنا
    // لأن Products محتاجة نتائج البحث
  };

  // مسح البحث من زر X
  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearchOpen(false);

    dispatch(clearSearchResults());

    if (location.pathname === "/products") {
      navigate("/products", { replace: true });
    } else {
      navigate("/products");
    }
  };
  // ✅ جديد: دالة logout
  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();

  } catch (error) {
      console.error("Logout failed:", error);
    }finally{
dispatch(clearCart()); // 🟢 تصفير بيانات السلة في Redux عند الخروج
      setIsUserMenuOpen(false);
      navigate("/");
      localStorage.clear();   // مسح أي بيانات مخزنة مثل التوكن
    }
      
  
  };
  // console.log("Current User Data:", user);
  return (
    <>
      {/* Shipping Bar */}
      <div className="bg-[#966907] w-full h-[20px] fixed z-[5000] text-md text-center font-bold font-mono text-white">
        FREE SHIPPING ON ORDERS OVER $80 || USE CODE Shatha FOR 15% OFF YOUR FIRST ORDER
      </div>

      {/* Navbar */}
      <nav className="bg-[#e4d7c5] shadow-md w-full fixed z-[1000] mt-5">
        <div className="container mx-auto flex justify-between items-center h-[70px] px-6">

          {/* Logo */}
          <Link to="/">
            <h2 className="text-3xl font-bold text-[#473428] italic font-serif">
              Shatha
            </h2>
          </Link>

          {/* Nav Links */}
          <ul className="flex justify-center items-center gap-8 text-[#473428] font-medium">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8"
                  : "hover:text-[#C88EA7] cursor-pointer"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8"
                  : "hover:text-[#C88EA7] cursor-pointer"
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/candles"
              className={({ isActive }) =>
                isActive
                  ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8"
                  : "hover:text-[#C88EA7] cursor-pointer"
              }
            >
              Candles
            </NavLink>

            <NavLink
              to="/perfumes"
              className={({ isActive }) =>
                isActive
                  ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8"
                  : "hover:text-[#C88EA7] cursor-pointer"
              }
            >
              Perfumes
            </NavLink>

            <NavLink
              to="/home-fragrance"
              className={({ isActive }) =>
                isActive
                  ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8"
                  : "hover:text-[#C88EA7] cursor-pointer"
              }
            >
              Home Fragrance
            </NavLink>

          </ul>

          {/* Search & Icons */}
          <div className="flex justify-center items-center gap-5 text-[#473428]">

            {/* Search Bar */}
            <div className="relative">

              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-white/70 border border-[#d8c9b3] rounded-full px-3 py-1.5 focus-within:border-[#473428] transition-colors"
              >

                {/* Search Icon */}
                <button
                  type="submit"
                  className="focus:outline-none"
                >
                  <Search className="w-4 h-4 text-[#473428] cursor-pointer hover:text-[#C88EA7]" />
                </button>

                {/* Input */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm ml-2 w-36 text-[#473428] placeholder-[#9A8B7F]"
                />

                {/* X */}
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="ml-auto focus:outline-none text-[#9A8B7F] hover:text-[#C88EA7] transition-colors"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}

              </form>

              {/* Dropdown */}
              {isSearchOpen &&
                searchTerm.trim().length >= 1 && (
                  <ul className="absolute top-full mt-2 left-0 w-64 bg-white border border-[#E5DFD3] rounded-xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto">

                    {status === "loading" ? (

                      <li className="px-4 py-3 text-sm text-[#9A8B7F]">
                  Loading....
                      </li>

                    ) : searchResults &&
                      searchResults.length > 0 ? (

                      <>
                        {/* أول 5 نتائج */}
                        {searchResults
                          .slice(0, 5)
                          .map((product) => (
                            <li
                              key={
                                product._id ||
                                product.id
                              }
                              onClick={() =>
                                handleProductClick(
                                  product._id ||
                                    product.id
                                )
                              }
                              className="px-4 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] cursor-pointer flex items-center justify-between border-b border-[#F4EFE6] last:border-0 transition-colors"
                            >
                              <span className="font-medium truncate">
                                {product.name}
                              </span>
                            </li>
                          ))}

                        {/* عرض جميع النتائج */}
                        {searchResults.length > 5 && (
                          <li
                            onClick={
                              handleSearchSubmit
                            }
                            className="px-4 py-2 text-xs text-[#A35266] font-bold text-center border-t border-[#F4EFE6] hover:bg-[#F9F6F0] cursor-pointer"
                          >
All Products                          </li>
                        )}
                      </>

                    ) : (

                      <li className="px-4 py-3 text-sm text-[#9A8B7F]">
                       No Products Found
                      </li>

                    )}

                  </ul>
                )}

            </div>

            {/* Wishlist */}
            <Heart className="cursor-pointer hover:text-[#C88EA7] transition-colors" />

           {/* User Menu Button */}
<div className="relative">
  <button
    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
    className="focus:outline-none flex items-center gap-2 hover:text-[#C88EA7] transition-colors"
  >
    {/* عرض اسم المستخدم إذا كان مسجلاً لدخول */}
    {user && (
      <span className="text-sm font-medium max-w-[80px] sm:max-w-[120px] truncate">
        {user?.name || user?.email?.split("@")[0]}
      </span>
    )}
    
    {/* الأيقونة بحجم ثابت لمنع اختفائها */}
    <User className="w-6 h-6 shrink-0" />
  </button>

{/* User Menu Dropdown */}
{isUserMenuOpen && (
  <div className="absolute top-full mt-2 right-0 bg-white border border-[#E5DFD3] rounded-lg shadow-xl w-48 z-50">
    {user ? (
      <>
        <div className="px-4 py-3 border-b border-[#F4EFE6]">
          <p className="text-sm font-medium text-[#473428] truncate">
            {user?.name || user?.email}
          </p>
          <p className="text-xs text-[#9A8B7F] truncate">
            {user?.email}
          </p>
          {user?.role?.toLowerCase() === "admin" && (
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-[#8C3A48] text-white rounded">
              Admin
            </span>
          )}
        </div>

        {/* الخيارات بناءً على رتبة المستخدم */}
        {user?.role?.toLowerCase() === "admin" ? (
          <>
            <NavLink
              to="/admin"
              className="block px-4 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] transition-colors border-b border-[#F4EFE6]"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Manage Products
            </NavLink>

            <NavLink
              to="/admin/orders"
              className="block px-4 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] transition-colors border-b border-[#F4EFE6]"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Manage Orders
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/profile"
              className="block px-4 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] transition-colors border-b border-[#F4EFE6]"
              onClick={() => setIsUserMenuOpen(false)}
            >
              My Profile
            </NavLink>

            <NavLink
              to="/orders"
              className="block px-4 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] transition-colors border-b border-[#F4EFE6]"
              onClick={() => setIsUserMenuOpen(false)}
            >
              My Orders
            </NavLink>
          </>
        )}

        {authError && (
          <div className="px-4 py-2 text-xs text-[#8C3A48] bg-red-50 border-b border-[#F4EFE6]">
            {authError}
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={authStatus === "loading"}
          className="w-full text-left px-4 py-2.5 text-sm text-[#8C3A48] hover:bg-red-50 transition-colors flex items-center gap-2 font-medium disabled:opacity-60"
        >
          <LogOut className="w-4 h-4" />
          {authStatus === "loading" ? "Logging out..." : "Logout"}
        </button>
      </>
    ) : (
      <>
        <NavLink
          to="/login"
          className="block px-4 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] transition-colors border-b border-[#F4EFE6]"
          onClick={() => setIsUserMenuOpen(false)}
        >
          Sign In
        </NavLink>

        <NavLink
          to="/register"
          className="block px-4 py-2.5 text-sm text-[#A35266] font-medium hover:bg-[#F9F6F0] transition-colors"
          onClick={() => setIsUserMenuOpen(false)}
        >
          Create Account
        </NavLink>
      </>
    )}
  </div>
)}
</div>
  

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative inline-block cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 text-[#2C241E] hover:text-[#C88EA7] transition-colors" />

              {totalCartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8C3A48] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCartQuantity}
                </span>
              )}
            </NavLink>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;





