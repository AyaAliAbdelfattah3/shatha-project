import { Heart, Search, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
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
import { logo } from "../assets";

const Navbar = () => {
  const totalCartQuantity = useSelector(selectCartCount) || 0;

  const { user, status: authStatus, error: authError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  // إغلاق user menu عند الانتقال لصفحة أخرى
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

  // دالة logout
  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();

    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearCart()); // تصفير بيانات السلة في Redux عند الخروج
      setIsUserMenuOpen(false);
      navigate("/");
      localStorage.clear(); // مسح أي بيانات مخزنة مثل التوكن
    }
  };

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
            <img src={logo} className="w-35 mb-2" alt="Logo" />
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
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8"
                  : "hover:text-[#C88EA7] cursor-pointer"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8"
                  : "hover:text-[#C88EA7] cursor-pointer"
              }
            >
              Contact Us
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
                            All Products
                          </li>
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

            
                                {/* User Menu Button - صورة وتحتها الاسم (محسن) */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="group focus:outline-none flex flex-col items-center justify-center gap-1.5 pt-1.5 transition-all duration-300"
              >
                {/* الصورة أو الأيقونة */}
                <div className="relative">
                  {user?.profilePic || user?.avatar || user?.image ? (
                    <img
                      src={user.profilePic || user.avatar || user.image}
                      alt="Profile"
                      className={`w-9 h-9 rounded-full object-cover border-2 shadow-sm transition-all duration-300 group-hover:scale-105 ${
                        isUserMenuOpen 
                          ? "border-[#C88EA7] scale-105" 
                          : "border-white group-hover:border-[#C88EA7]"
                      }`}
                    />
                  ) : (
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm border-2 transition-all duration-300 group-hover:scale-105 ${
                        isUserMenuOpen 
                          ? "bg-[#C88EA7] border-[#C88EA7] text-white scale-105" 
                          : "bg-[#e4d7c5] border-white text-[#473428] group-hover:bg-[#C88EA7] group-hover:border-[#C88EA7] group-hover:text-white"
                      }`}
                    >
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* الاسم تحت الصورة */}
                {user && (
                  <span 
                    className={`text-[12px] font-medium tracking-wide transition-colors duration-300 max-w-[80px] truncate leading-none ${
                      isUserMenuOpen 
                        ? "text-[#C88EA7]" 
                        : "text-[#473428] group-hover:text-[#C88EA7]"
                    }`}
                  >
                    {user?.name?.split(" ")[0] || user?.email?.split("@")[0]}
                  </span>
                )}
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute top-full mt-3 right-0 bg-white border border-[#E5DFD3] shadow-2xl w-60 z-50 animate-fadeIn rounded-xl overflow-hidden">
                  {user ? (
                    <>
                      <div className="px-5 py-4 border-b border-[#F4EFE6] bg-[#FDFBF7] flex items-center gap-3">
                        {/* صورة مصغرة جوه القائمة */}
                        {user?.profilePic || user?.avatar || user?.image ? (
                          <img
                            src={user.profilePic || user.avatar || user.image}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-[#E5DFD3]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#e4d7c5] text-[#473428] shrink-0">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#473428] truncate">
                            {user?.name || user?.email}
                          </p>
                          <p className="text-xs text-[#9A8B7F] truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      {user?.role?.toLowerCase() === "admin" && (
                        <div className="px-5 py-2 bg-[#FDFBF7] border-b border-[#F4EFE6]">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C3A48]">
                            Admin Account
                          </span>
                        </div>
                      )}

                      <div className="py-2">
                        {user?.role?.toLowerCase() === "admin" ? (
                          <>
                            <NavLink
                              to="/admin"
                              className="block px-5 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Manage Products
                            </NavLink>
                            <NavLink
                              to="/admin/orders"
                              className="block px-5 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Manage Orders
                            </NavLink>
                          </>
                        ) : (
                          <>
                            <NavLink
                              to="/profile"
                              className="block px-5 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              My Profile
                            </NavLink>
                            <NavLink
                              to="/my-orders"
                              className="block px-5 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              My Orders
                            </NavLink>
                          </>
                        )}
                      </div>

                      {authError && (
                        <div className="px-5 py-2 text-xs text-[#8C3A48] bg-red-50 border-t border-[#F4EFE6]">
                          {authError}
                        </div>
                      )}

                      <div className="border-t border-[#F4EFE6] p-1">
                        <button
                          onClick={handleLogout}
                          disabled={authStatus === "loading"}
                          className="w-full text-left px-4 py-2.5 text-sm text-[#8C3A48] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 font-medium disabled:opacity-60"
                        >
                          <LogOut className="w-4 h-4" />
                          {authStatus === "loading" ? "Logging out..." : "Logout"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-2">
                      <NavLink
                        to="/login"
                        className="block px-5 py-3 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="block px-5 py-3 text-sm text-[#A35266] font-bold hover:bg-[#F9F6F0] transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Create Account
                      </NavLink>
                    </div>
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