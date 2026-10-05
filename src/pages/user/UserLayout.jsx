import {  NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  LogOut,
  
} from "lucide-react";

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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

  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#473428] text-[#F4EFE6] flex flex-col fixed h-full shadow-lg">
        <div className="flex-1 p-6 mt-25">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#6E5341]">
            <h2 className="text-xl font-bold font-serif text-[#F4EFE6]">
              حسابى
            </h2>
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

        {/* زر الخروج فى أسفل الـ Sidebar */}
        <div className="p-6 border-t border-[#6E5341]">
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
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;