import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, changeOrderStatus, removeOrder } from '../../redux/ordersSlice'; 
import { 
  Trash2, Edit3, Eye, Search, CheckCircle, AlertTriangle, X, 
  MapPin, Phone, Package, User, Truck, Clock, CreditCard
} from 'lucide-react';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [viewOrder, setViewOrder] = useState(null);
  const [modalData, setModalData] = useState({ isOpen: false, type: '', title: '', message: '', orderId: null });
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpenDropdownId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    setOpenDropdownId(null);
    try {
      await dispatch(changeOrderStatus({ orderId, status: newStatus })).unwrap();
      setModalData({ isOpen: true, type: 'success', title: 'Status Updated', message: `Order status changed to ${newStatus}.`, orderId: null });
    } catch (err) {
      setModalData({ isOpen: true, type: 'error', title: 'Update Failed', message: err, orderId: null });
    }
  };

  const openDeleteConfirm = (orderId) => {
    setModalData({ isOpen: true, type: 'confirm', title: 'Delete Order', message: `Are you sure you want to delete this order?`, orderId: orderId });
  };

  const handleConfirmAction = async () => {
    if (modalData.type === 'confirm') {
      try {
        await dispatch(removeOrder(modalData.orderId)).unwrap();
        setModalData({ isOpen: true, type: 'success', title: 'Deleted', message: 'Order has been removed.', orderId: null });
      } catch (err) {
        setModalData({ isOpen: true, type: 'error', title: 'Error', message: err, orderId: null });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const filteredOrders = orders.filter(
    (order) => 
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#FAF7F2] to-[#F4EFE6]"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8b6b3e]"></div></div>;
  if (error) return <div className="p-8 text-center text-red-500 font-medium bg-red-50 rounded-xl m-10">{error}</div>;

  return (
    // خلفية الصفحة بتدرج لوني فخم
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#F1ECE4] p-6 md:p-10" dir="ltr">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* الهيدر الفخم */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-25">
          <div>
            <h1 className="text-4xl font-serif font-black text-[#473428] tracking-tight">Orders</h1>
            <p className="text-[15px] text-[#9A8B7F] mt-2 font-medium tracking-wide">Manage and track all your customer orders in one place.</p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-[#9A8B7F] group-focus-within:text-[#8b6b3e] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl text-sm text-[#473428] placeholder-[#9A8B7F] focus:outline-none focus:ring-2 focus:ring-[#8b6b3e]/20 focus:border-[#8b6b3e] transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* الجدول الشيك */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-white/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2]/50 text-[#9A8B7F] text-[11px] uppercase tracking-widest border-b border-[#E5DFD3]/60">
                  <th className="py-5 px-6 font-bold">Order Ref</th>
                  <th className="py-5 px-6 font-bold">Customer</th>
                  <th className="py-5 px-6 font-bold text-center border-l border-[#E5DFD3]/40">Date</th>
                  <th className="py-5 px-6 font-bold text-center border-l border-[#E5DFD3]/40">Total</th>
                  <th className="py-5 px-6 font-bold text-center border-l border-[#E5DFD3]/40">Status</th>
                  <th className="py-5 px-6 font-bold text-center border-l border-[#E5DFD3]/40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]/30">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-all duration-300 group">
                    <td className="py-5 px-6 font-mono text-sm font-semibold text-[#8b6b3e]">#{order.id?.slice(-6)}</td>
                    <td className="py-5 px-6">
                      <div className="text-[15px] font-bold text-[#473428]">{order.user?.name || 'Guest'}</div>
                      <div className="text-xs text-[#9A8B7F] font-medium">{order.user?.email}</div>
                    </td>
                    <td className="py-5 px-6 text-center text-sm text-[#9A8B7F] border-l border-[#E5DFD3]/20">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-5 px-6 text-center font-black text-[#473428] border-l border-[#E5DFD3]/20">
                      ${order.totalPrice?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-5 px-6 text-center border-l border-[#E5DFD3]/20">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                        {order.status === 'delivered' ? <CheckCircle size={14}/> : order.status === 'shipped' ? <Truck size={14}/> : <Clock size={14}/>}
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-5 px-6 border-l border-[#E5DFD3]/20">
                      <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        
                        <button onClick={() => setViewOrder(order)} className="p-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#8b6b3e] hover:text-white hover:border-[#8b6b3e] hover:bg-[#8b6b3e] hover:shadow-lg hover:shadow-[#8b6b3e]/30 hover:-translate-y-0.5 transition-all duration-300" title="View Details">
                          <Eye size={18} />
                        </button>

                        <div className="relative">
                          <button onClick={() => setOpenDropdownId(openDropdownId === order.id ? null : order.id)} className={`p-2.5 border rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${openDropdownId === order.id ? 'border-[#8b6b3e] text-white bg-[#8b6b3e] shadow-lg shadow-[#8b6b3e]/30' : 'bg-white border-[#E5DFD3] text-[#8b6b3e] hover:text-white hover:border-[#8b6b3e] hover:bg-[#8b6b3e]'}`} title="Update Status">
                            <Edit3 size={18} />
                          </button>

                          {openDropdownId === order.id && (
                            <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-40 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-20 overflow-hidden animate-scale-in">
                              <div className="p-2 space-y-1">
                                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                                  <button key={status} onClick={() => handleStatusChange(order.id, status)} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#473428] hover:bg-[#FAF7F2] hover:text-[#8b6b3e] rounded-xl capitalize transition-colors">
                                    {status}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <button onClick={() => openDeleteConfirm(order.id)} className="p-2.5 bg-white border border-[#E5DFD3] rounded-xl text-red-400 hover:text-white hover:border-red-500 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all duration-300" title="Delete Order">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FAF7F2] mb-6 shadow-inner">
                        <Package size={32} className="text-[#9A8B7F]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#473428] mb-2">No orders yet</h3>
                      <p className="text-[#9A8B7F] text-sm max-w-sm mx-auto">When customers start placing orders, they will magically appear right here.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* بوب أب التفاصيل */}
      {viewOrder && (
        <div className="fixed inset-0 bg-[#473428]/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 w-full max-w-[500px] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_-15px_rgba(71,52,40,0.3)] animate-scale-in">
            <div className="flex justify-between items-center mb-8 border-b border-[#E5DFD3] pb-5">
              <h2 className="text-2xl font-serif font-bold text-[#473428]">Order Details</h2>
              <button onClick={() => setViewOrder(null)} className="p-2 text-[#9A8B7F] hover:text-[#473428] hover:bg-[#FAF7F2] rounded-full transition-colors"><X size={22} /></button>
            </div>

            <div className="space-y-8">
              <div className="bg-[#FAF7F2]/60 rounded-2xl p-6 border border-[#E5DFD3]/50">
                <h3 className="text-[11px] font-bold text-[#9A8B7F] uppercase tracking-widest mb-5">Customer Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[#473428] font-medium"><User size={20} className="text-[#8b6b3e]"/> {viewOrder.user?.name || 'Guest User'}</div>
                  <div className="flex items-center gap-4 text-[#473428] font-medium"><Phone size={20} className="text-[#8b6b3e]"/> {viewOrder.shippingAddress?.phone || 'No phone'}</div>
                  <div className="flex items-center gap-4 text-[#473428] font-medium"><MapPin size={20} className="text-[#8b6b3e]"/> {viewOrder.shippingAddress?.address || 'No address'}, {viewOrder.shippingAddress?.city || ''}</div>
                  <div className="flex items-center gap-4 text-[#473428] font-medium"><CreditCard size={20} className="text-[#8b6b3e]"/> {viewOrder.paymentMethod || 'Cash on Delivery'}</div>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-bold text-[#9A8B7F] uppercase tracking-widest mb-4">Items Ordered</h3>
                <div className="space-y-3">
                  {viewOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white border border-[#E5DFD3]/60 p-4 rounded-2xl shadow-sm hover:border-[#8b6b3e]/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FAF7F2] rounded-xl flex items-center justify-center border border-[#E5DFD3]/50"><Package size={22} className="text-[#8b6b3e]"/></div>
                        <div>
                          <p className="text-sm font-bold text-[#473428]">{item.name || item.product?.name}</p>
                          <p className="text-xs text-[#9A8B7F] font-medium mt-0.5">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-black text-[#8b6b3e]">${((item.price || 0) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E5DFD3] pt-6 flex justify-between items-center">
                <span className="text-[#9A8B7F] font-bold uppercase tracking-widest text-xs">Total Amount</span>
                <span className="text-3xl font-black text-[#473428]">${viewOrder.totalPrice?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* الـ Modals (نجاح/خطأ/تأكيد) */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-[#473428]/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-8 w-full max-w-[420px] shadow-[0_20px_50px_-12px_rgba(71,52,40,0.3)] animate-scale-in">
            <div className={`flex items-center gap-4 mb-6 ${modalData.type === 'confirm' || modalData.type === 'error' ? 'text-red-500' : 'text-[#8b6b3e]'}`}>
              <div className={`p-2.5 rounded-2xl ${modalData.type === 'confirm' || modalData.type === 'error' ? 'bg-red-50' : 'bg-[#8b6b3e]/10'}`}>
                {modalData.type === 'success' ? <CheckCircle size={28} /> : <AlertTriangle size={28} />}
              </div>
              <h3 className="text-xl font-bold text-[#473428] tracking-tight">{modalData.title}</h3>
              <button onClick={() => setModalData({ ...modalData, isOpen: false })} className="ml-auto p-2 text-[#9A8B7F] hover:text-[#473428] hover:bg-[#FAF7F2] rounded-full transition-colors"><X size={20} /></button>
            </div>
            <p className="text-[#9A8B7F] text-[15px] leading-relaxed mb-8 font-medium">{modalData.message}</p>
            <div className="flex justify-end gap-3">
              {modalData.type === 'confirm' ? (
                <>
                  <button onClick={() => setModalData({ ...modalData, isOpen: false })} className="px-6 py-2.5 text-sm font-bold text-[#9A8B7F] bg-[#FAF7F2] rounded-xl hover:bg-[#E5DFD3] transition-colors">Cancel</button>
                  <button onClick={handleConfirmAction} className="px-6 py-2.5 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5">Delete</button>
                </>
              ) : (
                <button onClick={() => setModalData({ ...modalData, isOpen: false })} className="w-full py-3.5 text-sm font-bold text-white bg-[#8b6b3e] rounded-xl hover:bg-[#6b522f] shadow-lg shadow-[#8b6b3e]/30 transition-all hover:-translate-y-0.5">Got it, Thanks</button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;