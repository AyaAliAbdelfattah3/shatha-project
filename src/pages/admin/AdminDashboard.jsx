import { useState, useEffect } from "react";
import { Package, Users, LayoutDashboard, ShoppingBag, BarChart3, LogOut, Store, TrendingUp, DollarSign, Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/authSlice";

// استيراد الـ Actions لجلب البيانات
import { fetchOrders } from "../../redux/ordersSlice";
import { fetchProducts } from "../../redux/productsSlice";
import { fetchUsers } from "../../redux/usersSlice";

// استيراد مكونات recharts
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';

// استيراد المكونات الداخلية
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders"; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // حالة فتح وقفل القائمة في الموبايل
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { items: products, loading: productsLoading } = useSelector((state) => state.products);
  const { users, loading: usersLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts({ page: 1, limit: 1000 }));
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalRevenue = orders?.reduce((acc, order) => {
    if (order.status?.toLowerCase() !== 'cancelled') {
      return acc + (order.totalPrice || 0);
    }
    return acc;
  }, 0) || 0;

  const totalOrders = orders?.length || 0;
  const totalCustomers = users?.filter(u => u.role?.toLowerCase() !== 'admin').length || 0;
  const totalProducts = products?.length || 0;

  const getSalesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const last6Months = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      last6Months.push({ name: months[monthIndex], sales: 0, monthIndex });
    }

    orders?.forEach(order => {
      if (order.status?.toLowerCase() !== 'cancelled' && order.createdAt) {
        const orderDate = new Date(order.createdAt);
        const orderMonth = orderDate.getMonth();
        
        const monthData = last6Months.find(m => m.monthIndex === orderMonth);
        if (monthData) {
          monthData.sales += (order.totalPrice || 0);
        }
      }
    });

    return last6Months;
  };

  const salesData = getSalesData();

  const getOrderStatusData = () => {
    const statusCounts = {
      delivered: 0,
      shipped: 0,
      processing: 0,
      pending: 0,
      cancelled: 0,
    };

    orders?.forEach(order => {
      const status = order.status?.toLowerCase() || 'pending';
      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      } else {
        statusCounts.pending++;
      }
    });

    return [
      { name: 'Delivered', value: statusCounts.delivered, color: '#2E7D32' },
      { name: 'Shipped', value: statusCounts.shipped, color: '#1565C0' },
      { name: 'Processing', value: statusCounts.processing, color: '#6A1B9A' },
      { name: 'Pending', value: statusCounts.pending, color: '#F57F17' },
      { name: 'Cancelled', value: statusCounts.cancelled, color: '#C62828' },
    ].filter(item => item.value > 0);
  };

  const orderStatusData = getOrderStatusData();
  const isLoading = ordersLoading || productsLoading || usersLoading;

  const handleLogout = async () => {
    await dispatch(logOut());
    navigate("/");
  };

  // دالة لتغيير التبويب وقفل القائمة في الموبايل تلقائياً
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); 
  };

  return (
    <div className="flex min-h-screen bg-[#F4EFE6] font-sans">
      
      {/* شاشة سوداء شفافة تظهر خلف القائمة في الموبايل لما تكون مفتوحة */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* ===== Sidebar ===== */}
      <aside className={`w-64 bg-[#2C1F17] text-[#F4EFE6] flex flex-col justify-between p-4 shadow-2xl fixed h-full z-50 transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="flex items-center justify-between mb-10 mt-6 px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#C49B47] rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-[#2C1F17]" />
              </div>
              <h2 className="text-xl font-bold font-serif text-[#F4EFE6]">Admin Panel</h2>
            </div>
            {/* زرار قفل القائمة يظهر في الموبايل بس */}
            <button className="lg:hidden text-[#F4EFE6]" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-1">
            <button onClick={() => handleTabChange("overview")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "overview" ? "bg-[#C49B47] text-[#2C1F17] shadow-md" : "hover:bg-[#3D332B] text-[#E5DFD3]"}`}>
              <BarChart3 className="w-5 h-5" /> Overview
            </button>
            <button onClick={() => handleTabChange("products")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "products" ? "bg-[#C49B47] text-[#2C1F17] shadow-md" : "hover:bg-[#3D332B] text-[#E5DFD3]"}`}>
              <Package className="w-5 h-5" /> Products Management
            </button>
            <button onClick={() => handleTabChange("orders")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "orders" ? "bg-[#C49B47] text-[#2C1F17] shadow-md" : "hover:bg-[#3D332B] text-[#E5DFD3]"}`}>
              <ShoppingBag className="w-5 h-5" /> Orders Management
            </button>
            <button onClick={() => handleTabChange("users")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "users" ? "bg-[#C49B47] text-[#2C1F17] shadow-md" : "hover:bg-[#3D332B] text-[#E5DFD3]"}`}>
              <Users className="w-5 h-5" /> Users Management
            </button>
          </nav>
        </div>

        <div className="space-y-2 pb-4">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#E5DFD3] hover:bg-[#3D332B] transition-all">
            <Store className="w-5 h-5" /> Back to Store
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#FFCDD2] hover:bg-[#8C3A48] hover:text-white transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8 overflow-y-auto min-h-screen w-full">
        
        {/* الهيدر اللي بيظهر في الموبايل بس (فيه زرار القائمة) */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border border-[#D8C9B3]">
          <h2 className="text-lg font-bold font-serif text-[#2C1F17]">Admin Dashboard</h2>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-[#F4EFE6] rounded-lg text-[#2C1F17]">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* ================= 1. التبويب الأول: Overview ================= */}
        {activeTab === "overview" && (
          <div className="animate-fadeIn space-y-8">
            
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#C49B47] mb-1">Dashboard Overview</h1>
              <p className="text-sm text-[#7A6B5E]">Welcome back! Here's what's happening in your store today.</p>
            </div>

            {/* كروت الإحصائيات - ديناميكية */}
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C49B47]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#D8C9B3] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#7A6B5E] mb-1">Total Revenue</p>
                    <h3 className="text-xl md:text-2xl font-bold text-[#C49B47]">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                  </div>
                  <div className="p-3 bg-[#C49B47]/10 rounded-full text-[#C49B47]"><DollarSign size={24} /></div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#D8C9B3] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#7A6B5E] mb-1">Total Orders</p>
                    <h3 className="text-xl md:text-2xl font-bold text-[#C49B47]">{totalOrders}</h3>
                  </div>
                  <div className="p-3 bg-[#C49B47]/10 rounded-full text-[#C49B47]"><ShoppingBag size={24} /></div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#D8C9B3] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#7A6B5E] mb-1">Total Customers</p>
                    <h3 className="text-xl md:text-2xl font-bold text-[#C49B47]">{totalCustomers}</h3>
                  </div>
                  <div className="p-3 bg-[#C49B47]/10 rounded-full text-[#C49B47]"><Users size={24} /></div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#D8C9B3] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#7A6B5E] mb-1">Active Products</p>
                    <h3 className="text-xl md:text-2xl font-bold text-[#C49B47]">{totalProducts}</h3>
                  </div>
                  <div className="p-3 bg-[#C49B47]/10 rounded-full text-[#C49B47]"><Package size={24} /></div>
                </div>
              </div>
            )}

            {/* الرسوم البيانية (Charts) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* رسم بياني للمبيعات - ديناميكي */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#D8C9B3] lg:col-span-2 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-[#2C1F17]">Sales Overview (Last 6 Months)</h2>
                </div>
                <div className="h-64 md:h-72 w-full">
                  {salesData.every(d => d.sales === 0) ? (
                     <div className="flex flex-col items-center justify-center h-full text-[#7A6B5E]">
                        <BarChart3 size={40} className="text-[#D8C9B3] mb-2"/>
                        <p>No sales data available yet.</p>
                     </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C49B47" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#C49B47" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#7A6B5E', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#7A6B5E', fontSize: 12}} tickFormatter={(value) => `$${value}`} width={50}/>
                        <CartesianGrid vertical={false} stroke="#E0D3C3" strokeDasharray="3 3" />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid #D8C9B3', backgroundColor: '#FAF7F2', color: '#2C1F17' }}
                          itemStyle={{ color: '#C49B47', fontWeight: 'bold' }}
                          formatter={(value) => [`$${value}`, 'Sales']}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#C49B47" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* رسم دائري لحالات الطلبات - ديناميكي */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#D8C9B3] overflow-hidden">
                <h2 className="text-lg font-bold text-[#2C1F17] mb-6">Orders by Status</h2>
                <div className="h-64 md:h-60 w-full flex justify-center">
                  {orderStatusData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#7A6B5E]">
                        <ShoppingBag size={40} className="text-[#D8C9B3] mb-2"/>
                        <p>No orders yet.</p>
                     </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={orderStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {orderStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid #D8C9B3', backgroundColor: '#FAF7F2', color: '#2C1F17' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* باقي التبويبات */}
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "orders" && <AdminOrders />}
        {activeTab === "users" && <AdminUsers />}
        
      </main>
    </div>
  );
};

export default AdminDashboard;