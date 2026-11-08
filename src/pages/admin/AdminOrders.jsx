import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, changeOrderStatus, removeOrder } from '../../redux/ordersSlice'; 
import { 
  Trash2, Edit3, Eye, Search, CheckCircle, AlertTriangle, X, 
  MapPin, Phone, Package, User, Truck, Clock, CreditCard, ChevronDown
} from 'lucide-react';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [viewOrder, setViewOrder] = useState(null);
  const [modalData, setModalData] = useState({ isOpen: false, type: '', title: '', message: '', orderId: null });
  const [openDropdownId, setOpenDropdownId] = useState(null);

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

  // إضافة الروح في الـ Status Colors (ألوان دافئة ومميزة)
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9] shadow-sm shadow-[#C8E6C9]';
      case 'shipped': return 'bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB] shadow-sm shadow-[#BBDEFB]';
      case 'processing': return 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7] shadow-sm shadow-[#E1BEE7]';
      case 'cancelled': return 'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2] shadow-sm shadow-[#FFCDD2]';
      default: return 'bg-[#FFF8E1] text-[#F57F17] border-[#FFE082] shadow-sm shadow-[#FFE082]';
    }
  };

  const filteredOrders = orders.filter(
    (order) => 
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-screen bg-[#F4EFE6]"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B8860B]"></div></div>;
  if (error) return <div className="p-8 text-center text-red-700 font-medium bg-red-100 rounded-xl m-10 border border-red-300">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F4EFE6] p-6 md:p-10" dir="ltr">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* الهيدر - ضفنا خط رفيع جدًا تحته عشان يدي فخامة */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-2 pb-6 border-b border-[#D8C9B3]">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-[#B8860B]/10 rounded-xl text-[#B8860B] ">
                <Package size={24} />
              </div>
              <h1 className="text-3xl font-serif font-bold text-[#875f10] tracking-tight ">Orders Management</h1>
            </div>
            <p className="text-sm text-[#7A6B5E] mt-1">Review, track, and update all customer orders.</p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#9A8B7F] group-focus-within:text-[#B8860B] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#D8C9B3] rounded-lg text-sm text-[#2C1F17] placeholder-[#9A8B7F] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/30 focus:border-[#B8860B] transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* الجدول - ضفنا ظلال عميقة وحدود دافئة */}
        <div className="bg-[#EBE2D6] rounded-xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] border border-[#D8C9B3] overflow-visible">
          <div className="overflow-x-auto overflow-y-visible min-h-[400px]">
            <table className="w-full text-left border-collapse">
              {/* رأس الجدول: لون بني غامق شوية، مع خط ذهبي رفيع تحته */}
              <thead>
                <tr className="bg-[#E0D3C3] text-[#2C1F17] text-xs uppercase tracking-wider border-b-2 border-[#C49B47]">
                  <th className="py-4 px-6 font-bold border-l text-center border-[#C49B47]">Order Ref</th>
                  <th className="py-4 px-6 font-bold border-l text-center border-[#C49B47]">Customer</th>
                  <th className="py-4 px-6 font-bold text-center border-l border-[#C49B47]">Date</th>
                  <th className="py-4 px-6 font-bold text-center border-l border-[#C49B47]">Total</th>
                  <th className="py-4 px-6 font-bold text-center border-l border-[#C49B47]">Status</th>
                  <th className="py-4 px-6 font-bold text-center border-l border-[#C49B47]">Actions</th>
                </tr>
              </thead>
              {/* الصفوف: hover بيغير لون الخلفية لدرجة دافئة جدًا */}
              <tbody className="divide-y divide-[#D8C9B3]/70">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-colors duration-200 group">
                    <td className="py-4 px-6 font-mono text-sm font-bold text-[#B8860B]">#{order.id?.slice(-6)}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-bold text-[#2C1F17]">{order.user?.name || 'Guest'}</div>
                      <div className="text-xs text-[#7A6B5E]">{order.user?.email || '-'}</div>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-[#7A6B5E] border-l border-[#D8C9B3]/50">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-[#2C1F17] border-l border-[#D8C9B3]/50">
                      ${order.totalPrice?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-4 px-6 text-center border-l border-[#D8C9B3]/50">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize border ${getStatusColor(order.status)}`}>
                        {order.status === 'delivered' ? <CheckCircle size={12}/> : order.status === 'shipped' ? <Truck size={12}/> : <Clock size={12}/>}
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-l border-[#D8C9B3]/50">
                      <div className="flex justify-center gap-1.5">
                        {/* الأزرار بقت دائرية شوية وخلفيتها شفافة، وبتتحرك بلمسة hover */}
                        <button onClick={() => setViewOrder(order)} className="p-2 text-[#7A6B5E] hover:text-[#B8860B] hover:bg-[#B8860B]/10 rounded-full transition-all duration-200 hover:scale-110" title="View Details">
                          <Eye size={18}  className='text-blue-600'/>
                        </button>

                        <div className="relative">
                          <button onClick={() => setOpenDropdownId(openDropdownId === order.id ? null : order.id)} className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${openDropdownId === order.id ? 'text-[#B8860B] bg-[#B8860B]/10' : 'text-[#7A6B5E] hover:text-[#B8860B] hover:bg-[#B8860B]/10'}`} title="Update Status">
                            <Edit3 size={18}   className='text-green-600'/>
                          </button>

                          {openDropdownId === order.id && (
                            <>
                              {/* Overlay شفاف يدي إحساس بالعمق */}
                              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)}></div>
                              {/* Dropdown بظل خفيف وشكل انسيابي */}
                              <div className="absolute right-0 top-full mt-2 w-40 bg-[#FAF7F2] border border-[#D8C9B3] rounded-xl shadow-xl z-20 overflow-hidden animate-scale-in">
                                <div className="p-1">
                                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                                    <button key={status} onClick={() => handleStatusChange(order.id, status)} className="w-full text-left px-3 py-2 text-xs font-medium text-[#2C1F17] hover:bg-[#EBE2D6] hover:text-[#B8860B] rounded-lg capitalize transition-colors flex items-center gap-2">
                                      <div className={`w-1.5 h-1.5 rounded-full ${
                                        status === 'delivered' ? 'bg-green-500' : 
                                        status === 'shipped' ? 'bg-blue-500' : 
                                        status === 'cancelled' ? 'bg-red-500' : 
                                        status === 'processing' ? 'bg-purple-500' : 'bg-yellow-500'
                                      }`}></div>
                                      {status}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <button onClick={() => openDeleteConfirm(order.id)} className="p-2 text-[#7A6B5E] hover:text-red-600 hover:bg-red-100 rounded-full transition-all duration-200 hover:scale-110" title="Delete Order">
                          <Trash2 size={18}   className='text-red-600'/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <Package size={40} className="mx-auto text-[#D8C9B3] mb-4" />
                      <h3 className="text-lg font-bold text-[#2C1F17] mb-1">No orders found</h3>
                      <p className="text-[#7A6B5E] text-sm">When customers place orders, they'll appear here.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: تفاصيل الطلب - خلفية دافئة وحدود ناعمة */}
      {viewOrder && (
        <div className="fixed inset-0 bg-[#2C1F17]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D8C9B3] animate-scale-in">
            <div className="flex justify-between items-center mb-6 border-b border-[#D8C9B3] pb-4">
              <h2 className="text-xl font-bold text-[#2C1F17] flex items-center gap-2">
                <Package size={20} className="text-[#B8860B]"/> Order Details
              </h2>
              <button onClick={() => setViewOrder(null)} className="p-1 text-[#7A6B5E] hover:text-[#B8860B] transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-6">
              <div className="bg-[#F4EFE6] rounded-xl p-4 border border-[#D8C9B3]">
                <h3 className="text-xs font-bold text-[#B8860B] uppercase tracking-wider mb-3">Customer Information</h3>
                <div className="space-y-2.5 text-sm text-[#2C1F17]">
                  <div className="flex items-center gap-3"><User size={16} className="text-[#9A8B7F]"/> {viewOrder.user?.name || 'Guest User'}</div>
                  <div className="flex items-center gap-3"><Phone size={16} className="text-[#9A8B7F]"/> {viewOrder.shippingAddress?.phone || 'No phone'}</div>
                  <div className="flex items-center gap-3"><MapPin size={16} className="text-[#9A8B7F]"/> {viewOrder.shippingAddress?.address || 'No address'}, {viewOrder.shippingAddress?.city || ''}</div>
                  <div className="flex items-center gap-3"><CreditCard size={16} className="text-[#9A8B7F]"/> {viewOrder.paymentMethod || 'Cash on Delivery'}</div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#B8860B] uppercase tracking-wider mb-3">Items Ordered</h3>
                <div className="space-y-2">
                  {viewOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#FAF7F2] border border-[#D8C9B3] p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F4EFE6] rounded-lg flex items-center justify-center border border-[#D8C9B3]"><Package size={18} className="text-[#B8860B]"/></div>
                        <div>
                          <p className="text-sm font-semibold text-[#2C1F17]">{item.name || item.product?.name}</p>
                          <p className="text-xs text-[#7A6B5E]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-[#2C1F17]">${((item.price || 0) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#D8C9B3] pt-4 flex justify-between items-center">
                <span className="text-[#7A6B5E] font-semibold text-sm">Total Amount</span>
                <span className="text-2xl font-bold text-[#B8860B]">${viewOrder.totalPrice?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals: تأكيد / نجاح / خطأ - أضفنا أيقونات وظلال ناعمة */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-[#2C1F17]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-[#D8C9B3] animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-full ${modalData.type === 'confirm' || modalData.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-[#B8860B]/10 text-[#B8860B]'}`}>
                {modalData.type === 'success' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
              </div>
              <h3 className="text-lg font-bold text-[#2C1F17]">{modalData.title}</h3>
              <button onClick={() => setModalData({ ...modalData, isOpen: false })} className="ml-auto p-1 text-[#7A6B5E] hover:text-[#2C1F17]"><X size={18} /></button>
            </div>
            <p className="text-sm text-[#7A6B5E] mb-6">{modalData.message}</p>
            <div className="flex justify-end gap-2">
              {modalData.type === 'confirm' ? (
                <>
                  <button onClick={() => setModalData({ ...modalData, isOpen: false })} className="px-4 py-2 text-sm font-medium text-[#7A6B5E] bg-[#F4EFE6] border border-[#D8C9B3] rounded-lg hover:bg-[#E0D3C3] transition-colors">Cancel</button>
                  <button onClick={handleConfirmAction} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm">Delete</button>
                </>
              ) : (
                <button onClick={() => setModalData({ ...modalData, isOpen: false })} className="w-full py-2.5 text-sm font-bold text-white bg-[#B8860B] rounded-lg hover:bg-[#9A6F09] transition-colors shadow-md">Got it</button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;