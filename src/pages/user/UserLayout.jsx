import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  LogOut,
  Menu,
  X
} from "lucide-react";

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  // حالة فتح وقفل القائمة في الموبايل
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard/profile", label: "My Profile", icon: User },
    { path: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
    { path: "/dashboard/addresses", label: "MY Address", icon: MapPin },
    { path: "/dashboard/wishlist", label: "Favorite", icon: Heart },
  ];

  const handleLogout = async () => {
    await dispatch(logOut());
    dispatch(clearCart());
    navigate("/");
  };

  // دالة بتقفل القائمة لما تدوس على أي لينك (مهمة للموبايل)
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      
      {/* خلفية سوداء شفافة تظهر في الموبايل لما القائمة تكون مفتوحة */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-[#473428] text-[#F4EFE6] flex flex-col fixed h-full shadow-lg z-50 transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* ظبطنا المسافات العلوية عشان تبان كويسة في الموبايل */}
        <div className="flex-1 p-6 pt-24 lg:pt-28 overflow-y-auto">
          
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#6E5341]">
            <h2 className="text-xl font-bold font-serif text-[#F4EFE6]">
              حسابى
            </h2>
            {/* زرار قفل القائمة يظهر في الموبايل بس */}
            <button onClick={closeSidebar} className="lg:hidden text-[#F4EFE6]/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* اسم المستخدم */}
          <div className="mb-6 pb-4 border-b border-[#6E5341]">
            <p className="text-sm text-[#D4AF37] font-medium">{user?.name}</p>
            <p className="text-xs text-[#9A8B7F] truncate">{user?.email}</p>
          </div>

          {/* قائمة الروابط */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar} // تقفل القائمة بعد ما تختار صفحة
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#966907] text-white shadow-sm"
                      : "hover:bg-[#5C4334] text-[#E5DFD3]"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* زر الخروج */}
        <div className="p-6 border-t border-[#6E5341] bg-[#473428]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 transition-all"
          >
            <LogOut className="w-5 h-5" />
           Logout
          </button>
        </div>
      </aside>

      {/* المحتوى الرئيسى */}
      <main className="flex-1 lg:ml-64 w-full min-h-screen">
        
        {/* الهيدر العلوي اللي بيظهر في الموبايل بس */}
        <div className="lg:hidden fixed top-0 w-full bg-[#FAF7F2]/90 backdrop-blur-md z-30 flex items-center justify-between p-4 border-b border-[#E5DFD3]">
          <span className="font-serif font-bold text-[#473428]">حسابى</span>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-[#473428] text-white rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* ظبطنا الـ padding عشان ميتغطاش بالهيدر العلوي في الموبايل */}
        <div className="p-4 pt-20 lg:p-8 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;