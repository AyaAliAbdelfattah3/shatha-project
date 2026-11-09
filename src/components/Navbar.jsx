import { Search, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
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

const SERVER_ORIGIN = import.meta.env.VITE_API_URL?.replace("/api", "") || "https://backend-shatha-project.vercel.app";

const Navbar = () => {
  const totalCartQuantity = useSelector(selectCartCount) || 0;

  const { user, status: authStatus, error: authError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    results: searchResults,
    status,
  } = useSelector((state) => state.search);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  useEffect(() => {
    if (!location.pathname.startsWith("/products")) {
      setSearchTerm("");
      setIsSearchOpen(false);
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length < 1) {
      dispatch(clearSearchResults());
      setIsSearchOpen(false);
      return;
    }
    setIsSearchOpen(false);
    dispatch(searchProducts(value.toLowerCase()));
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim().length >= 1) {
      setIsSearchOpen(true);
    }
  };

  const handleProductClick = (productId) => {
    setSearchTerm("");
    setIsSearchOpen(false);
    dispatch(clearSearchResults());
    navigate(`/products/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    const value = searchTerm.trim();
    setIsSearchOpen(false);
    setSearchTerm("");
    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

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

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearCart());
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/");
      localStorage.clear();
    }
  };

  return (
    <>
      {/* Shipping Bar */}
      <div className="bg-[#966907] w-full h-[20px] fixed z-[5000] text-[10px] md:text-md text-center font-bold font-mono text-white overflow-hidden whitespace-nowrap">
        FREE SHIPPING ON ORDERS OVER $80 || USE CODE Shatha FOR 15% OFF YOUR FIRST ORDER
      </div>

      {/* Navbar */}
      <nav className="bg-[#e4d7c5] shadow-md w-full fixed z-[1000] mt-5">
        <div className="container mx-auto flex justify-between items-center h-[70px] px-4 md:px-6">

          <button 
            className="md:hidden text-[#473428]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex-shrink-0">
            <img src={logo} className="w-24 md:w-35 mb-2" alt="Logo" />
          </Link>

          <ul className="hidden md:flex justify-center items-center gap-8 text-[#473428] font-medium">
            <NavLink to="/" className={({ isActive }) => isActive ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8" : "hover:text-[#C88EA7] cursor-pointer"}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8" : "hover:text-[#C88EA7] cursor-pointer"}>Products</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8" : "hover:text-[#C88EA7] cursor-pointer"}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "underline decoration-[#C88EA7] decoration-2 underline-offset-8" : "hover:text-[#C88EA7] cursor-pointer"}>Contact Us</NavLink>
          </ul>

          <div className="flex justify-center items-center gap-3 md:gap-5 text-[#473428]">
            
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-white/70 border border-[#d8c9b3] rounded-full px-3 py-1.5 focus-within:border-[#473428] transition-colors">
                <button type="submit" className="focus:outline-none">
                  <Search className="w-4 h-4 text-[#473428] cursor-pointer hover:text-[#C88EA7]" />
                </button>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm ml-2 w-24 lg:w-36 text-[#473428] placeholder-[#9A8B7F]"
                />
                {searchTerm && (
                  <button type="button" onClick={handleClearSearch} className="ml-auto focus:outline-none text-[#9A8B7F] hover:text-[#C88EA7] transition-colors" title="Clear search">
                    ✕
                  </button>
                )}
              </form>

              {/* Dropdown */}
              {isSearchOpen && searchTerm.trim().length >= 1 && (
                <ul className="absolute top-full mt-2 left-0 w-64 bg-white border border-[#E5DFD3] rounded-xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                  {status === "loading" ? (
                    <li className="px-4 py-3 text-sm text-[#9A8B7F]">Loading....</li>
                  ) : searchResults && searchResults.length > 0 ? (
                    <>
                      {searchResults.slice(0, 5).map((product) => (
                        <li key={product._id || product.id} onClick={() => handleProductClick(product._id || product.id)} className="px-4 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] cursor-pointer flex items-center justify-between border-b border-[#F4EFE6] last:border-0 transition-colors">
                          <span className="font-medium truncate">{product.name}</span>
                        </li>
                      ))}
                      {searchResults.length > 5 && (
                        <li onClick={handleSearchSubmit} className="px-4 py-2 text-xs text-[#A35266] font-bold text-center border-t border-[#F4EFE6] hover:bg-[#F9F6F0] cursor-pointer">All Products</li>
                      )}
                    </>
                  ) : (
                    <li className="px-4 py-3 text-sm text-[#9A8B7F]">No Products Found</li>
                  )}
                </ul>
              )}
            </div>

            {/* User Menu Button */}
            <div className="relative">
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="group focus:outline-none flex flex-col items-center justify-center gap-1.5 pt-1.5 transition-all duration-300">
                <div className="relative">
              {user?.avatar ? (
  <img
    // التعديل هنا: استخدمنا user.avatar بدل item.image
     key={user.avatar} 
    src={user.avatar.startsWith("http") ? user.avatar : `${SERVER_ORIGIN}${user.avatar}`}    
    alt="Profile"
    // ضفنا onError عشان لو الصورة باظت تتحول لأيقونة
    onError={(e) => {
      e.target.onerror = null; 
      e.target.style.display = 'none'; 
      e.target.nextSibling.style.display = 'flex'; // بيظهر الأيقونة اللي تحتها
    }}
    className={`w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 shadow-sm transition-all duration-300 group-hover:scale-105 ${isUserMenuOpen ? "border-[#C88EA7] scale-105" : "border-white group-hover:border-[#C88EA7]"}`}
  />
) : null}

{/* الأيقونة الافتراضية - بتظهر لو مفيش صورة أو لو الصورة باظت */}
<div 
  className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-sm border-2 transition-all duration-300 group-hover:scale-105 ${
    isUserMenuOpen 
      ? "bg-[#C88EA7] border-[#C88EA7] text-white scale-105" 
      : "bg-[#e4d7c5] border-white text-[#473428] group-hover:bg-[#C88EA7] group-hover:border-[#C88EA7] group-hover:text-white"
  }`}
  style={{ display: user?.avatar ? 'none' : 'flex' }} // بيخفي الأيقونة لو فيه صورة
>
  <User className="w-4 h-4 md:w-5 md:h-5" />
</div>
                  
                </div>
                {user && (
                  <span className={`text-[10px] md:text-[12px] font-medium tracking-wide transition-colors duration-300 max-w-[60px] md:max-w-[80px] truncate leading-none ${isUserMenuOpen ? "text-[#C88EA7]" : "text-[#473428] group-hover:text-[#C88EA7]"}`}>
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
                        {user?.avatar ? (
                          <img src={user.avatar.startsWith("http") ? user.avatar : `${SERVER_ORIGIN}${user.avatar}`} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-[#E5DFD3]" />
                        ) : (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#e4d7c5] text-[#473428] shrink-0">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#473428] truncate">{user?.name || user?.email}</p>
                          <p className="text-xs text-[#9A8B7F] truncate">{user?.email}</p>
                        </div>
                      </div>

                      <div className="py-2">
                        {/* لو الأدمن، بنعرضله زرار يوديه على الداشبورد، غير كده بنعرضله بروفايله وطلباته */}
                        {isAdmin ? (
                          <NavLink to="/admin" className="block px-5 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                            Go to Dashboard
                          </NavLink>
                        ) : (
                          <>
                            <NavLink to="/profile" className="block px-5 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors" onClick={() => setIsUserMenuOpen(false)}>My Profile</NavLink>
                            <NavLink to="/my-orders" className="block px-5 py-2.5 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors" onClick={() => setIsUserMenuOpen(false)}>My Orders</NavLink>
                          </>
                        )}
                      </div>

                      {authError && (
                        <div className="px-5 py-2 text-xs text-[#8C3A48] bg-red-50 border-t border-[#F4EFE6]">{authError}</div>
                      )}

                      <div className="border-t border-[#F4EFE6] p-1">
                        <button onClick={handleLogout} disabled={authStatus === "loading"} className="w-full text-left px-4 py-2.5 text-sm text-[#8C3A48] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 font-medium disabled:opacity-60">
                          <LogOut className="w-4 h-4" />
                          {authStatus === "loading" ? "Logging out..." : "Logout"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-2">
                      <NavLink to="/login" className="block px-5 py-3 text-sm text-[#473428] hover:bg-[#F9F6F0] hover:text-[#C88EA7] transition-colors" onClick={() => setIsUserMenuOpen(false)}>Sign In</NavLink>
                      <NavLink to="/register" className="block px-5 py-3 text-sm text-[#A35266] font-bold hover:bg-[#F9F6F0] transition-colors" onClick={() => setIsUserMenuOpen(false)}>Create Account</NavLink>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart - مخفية عن الأدمن */}
            {!isAdmin && (
              <NavLink to="/cart" className="relative inline-block cursor-pointer">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-[#2C241E] hover:text-[#C88EA7] transition-colors" />
                {totalCartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8C3A48] text-white text-[10px] md:text-xs font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
                    {totalCartQuantity}
                  </span>
                )}
              </NavLink>
            )}

          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#e4d7c5] border-t border-[#d8c9b3] px-4 py-4 space-y-3 text-[#473428] font-medium">
            <NavLink to="/" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Products</NavLink>
            <NavLink to="/about" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</NavLink>
            
            {/* لو الأدمن، بنعرضله زرار يوديه على الداشبورد بس */}
            {isAdmin && (
              <div className="pt-4 border-t border-[#d8c9b3] mt-4">
                <NavLink to="/admin" className="block py-2 font-bold text-[#8C3A48]" onClick={() => setIsMobileMenuOpen(false)}>Go to Dashboard</NavLink>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;