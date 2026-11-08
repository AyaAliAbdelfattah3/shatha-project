import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../../redux/ordersSlice';
import { Package, Truck, CheckCircle, Clock, Eye, X, MapPin, CreditCard } from 'lucide-react';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders, loading } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'shipped': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'processing': return 'text-[#B8860B] bg-amber-50 border-amber-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle size={14}/>;
      case 'shipped': return <Truck size={14}/>;
      case 'cancelled': return <X size={14}/>;
      default: return <Clock size={14}/>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B8860B]"></div>
      </div>
    );
  }

  return (
    // ظبطنا المسافات العلوية والسفلية عشان تناسب الموبايل
    <div className="min-h-screen bg-[#F9F6F0] py-8 md:py-16 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="max-w-5xl mx-auto">
        
        {/* عنوان الصفحة */}
        <div className="mb-8 md:mb-10 border-b border-[#E5DFD3] pb-6 mt-16 md:mt-10">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2A29]">My Orders</h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">Track and view all your recent orders.</p>
        </div>

        {myOrders.length === 0 ? (
          <div className="text-center py-16 md:py-20 bg-white rounded-3xl border border-[#E5DFD3] shadow-sm px-4">
            <Package size={64} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-serif font-bold text-[#2C2A29] mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders.</p>
            <button onClick={() => window.location.href = '/'} className="bg-[#2C2A29] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#B8860B] transition-colors w-full sm:w-auto">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {myOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-[#E5DFD3] shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                
                {/* تفاصيل الطلب الأساسية */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider">Order</span>
                    <span className="font-mono text-[#2C2A29] font-bold text-sm md:text-base">#{order.id?.slice(-6)}</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 font-medium">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                {/* السعر والحالة */}
                <div className="flex items-center gap-6 md:gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-none pt-4 md:pt-0 border-[#F0EAE1]">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-lg md:text-xl font-bold text-[#B8860B]">${order.totalPrice?.toFixed(2)}</p>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status || 'Pending'}
                  </span>
                </div>

                {/* زرار التفاصيل */}
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="w-full md:w-auto mt-2 md:mt-0 px-6 py-2.5 md:py-3 bg-[#F9F6F0] text-[#2C2A29] border border-[#E5DFD3] rounded-xl text-sm md:text-base font-medium hover:bg-[#E5DFD3] transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={18} /> View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* بوب أب تفاصيل الطلب */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-[#2C2A29]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* شلنا الـ mt-30 الغريبة وخليت المودال ياخد مساحة الشاشة في الموبايل */}
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            
            {/* هيدر البوب أب */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-[#E5DFD3] p-4 md:p-6 flex justify-between items-center z-10">
              <div className="min-w-0 pr-4">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2C2A29]">Order Details</h2>
                <p className="text-xs md:text-sm text-gray-500 font-mono mt-1 break-all">#{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 bg-[#F9F6F0] text-gray-500 hover:text-red-500 rounded-full transition-colors shrink-0">
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-6 md:space-y-8">
              {/* معلومات الشحن */}
              <div className="bg-[#F9F6F0] rounded-2xl p-4 md:p-5 border border-[#E5DFD3]">
                <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 md:mb-4">Shipping Information</h3>
                <div className="space-y-3 text-sm md:text-base text-gray-700">
                  <div className="flex items-start gap-3"><MapPin size={18} className="text-[#B8860B] shrink-0 mt-0.5"/> <span className="break-words">{selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}</span></div>
                  <div className="flex items-start gap-3"><CreditCard size={18} className="text-[#B8860B] shrink-0 mt-0.5"/> <span>{selectedOrder.paymentMethod}</span></div>
                </div>
              </div>

              {/* المنتجات */}
              <div>
                <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 md:mb-4">Items Ordered</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white border border-[#E5DFD3] p-3 md:p-4 rounded-xl gap-3">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <img 
                          src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${item.image}`} 
                          alt={item.name} 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover border border-[#F0EAE1] bg-[#F9F6F0] shrink-0" 
                        />
                        <div className="min-w-0">
                          <p className="font-serif font-semibold text-[#2C2A29] text-sm md:text-base truncate">{item.name}</p>
                          <p className="text-xs md:text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-[#B8860B] text-sm md:text-base shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* الإجمالي */}
              <div className="border-t border-[#E5DFD3] pt-4 md:pt-6 flex justify-between items-center pb-4 md:pb-10">
                <span className="text-base md:text-lg font-medium text-gray-600">Total Amount</span>
                <span className="text-2xl md:text-3xl font-serif font-bold text-[#B8860B]">${selectedOrder.totalPrice?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;