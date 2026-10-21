import { useState } from "react";
import AdminProducts from "./AdminProducts";
import { Package, Users, LayoutDashboard } from "lucide-react";
import AdminUsers from "./AdminUsers";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");



  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#473428] text-[#F4EFE6] flex flex-col justify-between p-6 shadow-lg">
        <div>
          <div className="flex items-center gap-3 mb-8 mt-25 pb-4 border-b border-[#6E5341]">
            <LayoutDashboard className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl font-bold font-serif text-[#F4EFE6]">
              Admin Panel
            </h2>
          </div>

          <nav className="space-y-2">
            <button
            // إذا كانت activeTab === "products"، يتم إعطاء الزر خلفية ذهبية داكنة (#966907) لتمييزه كـ مُفعّل.
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
               
                activeTab === "products"
                  ? "bg-[#966907] text-white shadow-sm"
                  : "hover:bg-[#5C4334] text-[#E5DFD3]"
              }`}
            >
              <Package className="w-5 h-5" />
              Products Management
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "users"
                  ? "bg-[#966907] text-white shadow-sm"
                  : "hover:bg-[#5C4334] text-[#E5DFD3]"
              }`}
            >
              <Users className="w-5 h-5" />
              Users Management

            </button>
          </nav>
        </div>

    
      </aside>
{/* الشرط الأول (activeTab === "products"): عند تحقق الشرط، يتم استدعاء مكون <AdminProducts/> والذي يعرض جدول المنتجات وأزرار الإضافة والتعديل والحذف. */}

{/* الشرط الثاني (activeTab === "users"): عند تحقق الشرط، يتم إخفاء المنتجات وعرض بطاقة بيضاء بها عنوان ووصف لقسم إدارة المستخدمين مع إضافة mt-25 لمكافأة المسافة العلوية. */}
      {/* Main Content Area */}
          {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "products" && <AdminProducts />}
        
        {/* السطر ده بس هو اللي محتاجينه */}
        {activeTab === "users" && <AdminUsers />}
      </main>
    </div>
  );
};

export default AdminDashboard;