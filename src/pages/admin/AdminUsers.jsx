import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, changeUserRole, removeUser } from '../../redux/usersSlice'; 
import { 
  Trash2, Edit3, Shield, User, CheckCircle, AlertTriangle, X, Search, 
  Eye, Mail, Calendar, Fingerprint, Phone 
} from 'lucide-react';

const SERVER_ORIGIN = import.meta.env.VITE_API_URL?.replace("/api", "") || "https://backend-shatha-project.vercel.app";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [modalData, setModalData] = useState({
    isOpen: false, type: '', title: '', message: '', user: null
  });

  const [viewUser, setViewUser] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const openDeleteConfirm = (user) => {
    setModalData({
      isOpen: true, type: 'confirm', title: 'Delete User',
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      user: user
    });
  };

  const handleConfirmAction = async () => {
    if (modalData.type === 'confirm') {
      try {
        await dispatch(removeUser(modalData.user.id)).unwrap();
        setModalData({ isOpen: true, type: 'success', title: 'Deleted', message: 'User has been removed successfully.', user: null });
      } catch (err) {
        setModalData({ isOpen: true, type: 'error', title: 'Error', message: err || 'Failed to delete user.', user: null });
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setOpenDropdownId(null);
    if (!newRole) return;
    
    try {
      await dispatch(changeUserRole({ userId, role: newRole })).unwrap();
      setModalData({ isOpen: true, type: 'success', title: 'Role Updated', message: `User role changed to ${newRole === 'admin' ? 'Admin' : 'Customer'}.`, user: null });
    } catch (err) {
      setModalData({ isOpen: true, type: 'error', title: 'Update Failed', message: err || 'Failed to update role.', user: null });
    }
  };

  const closeModal = () => setModalData({ ...modalData, isOpen: false });

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#F4EFE6]">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C49B47]"></div>
    </div>
  );
  
  if (error) return <div className="p-8 text-center text-red-700 font-medium bg-red-100 rounded-xl m-4 md:m-10 border border-red-300">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F4EFE6] p-4 md:p-10" dir="ltr">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-7">
        
        {/* الهيدر - بيترتب فوق بعضه في الموبايل */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-2 pb-6 border-b border-[#D8C9B3]">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-[#C49B47]/10 rounded-xl text-[#875f10]">
                <User size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#875f10] tracking-tight">Users Management</h1>
            </div>
            <p className="text-sm text-[#7A6B5E] mt-1">Manage your customers, admins, and their permissions.</p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#9A8B7F] group-focus-within:text-[#C49B47] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#D8C9B3] rounded-lg text-sm text-[#2C1F17] placeholder-[#9A8B7F] focus:outline-none focus:ring-2 focus:ring-[#C49B47]/30 focus:border-[#C49B47] transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* الجدول - تم تعديله ليصبح متجاوب */}
        <div className="bg-[#EBE2D6] rounded-xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] border border-[#D8C9B3] overflow-visible">
          <div className="overflow-x-auto overflow-y-visible min-h-[400px]">
            
            {/* على الموبايل هنشيل شكل الجدول التقليدي ونحوله لبلوكات */}
            <table className="w-full text-left border-collapse block md:table">
              <thead className="hidden md:table-header-group">
                <tr className="bg-[#E0D3C3] text-[#C49B47] text-xs uppercase tracking-wider border-b-2 border-[#C49B47]">
                  <th className="py-4 px-6 font-bold border-r border-[#C49B47] text-amber-900 last:border-r-0">User</th>
                  <th className="py-4 px-6 font-bold text-center border-r border-[#C49B47] text-amber-900 last:border-r-0">Status / Role</th>
                  <th className="py-4 px-6 font-bold text-center text-amber-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C49B47]/20 block md:table-row-group">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FAF7F2]/60 transition-colors duration-200 group flex flex-col md:table-row p-4 md:p-0 border-b border-[#D8C9B3] md:border-none">
                    
                    {/* بيانات المستخدم */}
                    <td className="py-3 md:py-4 px-2 md:px-6 border-none md:border-r border-[#C49B47] last:border-r-0 block md:table-cell">
                      <div className="flex items-center gap-4">
                        {user.avatar ? (
                          <img 
                            src={user.avatar.startsWith("http") ? user.avatar : `${SERVER_ORIGIN}${user.avatar}`} 
                            alt={user.name} 
                            className="w-12 h-12 md:w-11 md:h-11 rounded-full object-cover border-2 border-[#ca8e33] shadow-sm" 
                          />
                        ) : (
                          <div className="w-12 h-12 md:w-11 md:h-11 rounded-full bg-[#C49B47]/20 flex items-center justify-center text-[#5d4006] font-bold text-lg border border-[#C49B47]/30">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="text-base md:text-sm font-bold text-[#493305]">{user.name}</div>
                          <div className="text-sm md:text-xs text-[#483b2f]">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* الحالة والصلاحية */}
                    <td className="py-3 md:py-4 px-2 md:px-6 text-left md:text-center border-none md:border-r border-[#C49B47] last:border-r-0 block md:table-cell mt-3 md:mt-0">
                      <div className="md:hidden text-[10px] text-[#7A6B5E] uppercase font-bold tracking-widest mb-1">Role</div>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${
                        user.role === 'admin' 
                          ? 'bg-[#C49B47]/10 text-[#C49B47] border-[#C49B47]/30' 
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-[#0fae46] animate-pulse' : 'bg-blue-400'}`}></span>
                        {user.role === 'admin' ? 'Admin' : 'Customer'}
                      </span>
                    </td>

                    {/* الأزرار */}
                    <td className="py-4 px-2 md:px-6 block md:table-cell mt-2 md:mt-0 border-t border-[#D8C9B3]/50 md:border-none">
                      <div className="flex justify-start md:justify-center gap-2 md:gap-1.5 opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                        
                        <button 
                          onClick={() => setViewUser(user)} 
                          className="flex-1 md:flex-none flex justify-center items-center gap-2 p-2 md:p-2 text-[#7A6B5E] bg-white md:bg-transparent rounded-lg md:rounded-full border border-gray-200 md:border-none hover:text-[#C49B47] hover:bg-[#C49B47]/10 transition-all duration-200 md:hover:scale-110 shadow-sm md:shadow-none"
                          title="View Details"
                        >
                          <Eye size={18} className='text-blue-600'/> <span className="md:hidden text-xs font-medium text-gray-700">View</span>
                        </button>

                        <div className="relative flex-1 md:flex-none">
                          <button 
                            onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)} 
                            className={`w-full md:w-auto flex justify-center items-center gap-2 p-2 md:p-2 rounded-lg md:rounded-full transition-all duration-200 md:hover:scale-110 bg-white md:bg-transparent border border-gray-200 md:border-none shadow-sm md:shadow-none ${
                              openDropdownId === user.id 
                                ? 'text-[#C49B47] bg-[#C49B47]/10' 
                                : 'text-[#7A6B5E] hover:text-[#C49B47] hover:bg-[#C49B47]/10'
                            }`}
                            title="Change Role"
                          >
                            <Edit3 size={18} className='text-green-600'/> <span className="md:hidden text-xs font-medium text-gray-700">Role</span>
                          </button>

                          {openDropdownId === user.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)}></div>
                              <div className="absolute right-0 md:right-0 top-full mt-2 w-40 bg-[#FAF7F2] border border-[#D8C9B3] rounded-xl shadow-xl z-20 overflow-hidden animate-scale-in">
                                <div className="p-1">
                                  <button onClick={() => handleRoleChange(user.id, 'admin')} className="w-full text-left px-3 py-2 text-xs font-medium text-[#2C1F17] hover:bg-[#EBE2D6] hover:text-[#C49B47] rounded-lg flex items-center gap-2 transition-colors">
                                    <Shield size={14} className="text-[#C49B47]" /> Admin
                                  </button>
                                  <button onClick={() => handleRoleChange(user.id, 'user')} className="w-full text-left px-3 py-2 text-xs font-medium text-[#2C1F17] hover:bg-[#EBE2D6] hover:text-[#C49B47] rounded-lg flex items-center gap-2 transition-colors">
                                    <User size={14} className="text-gray-500" /> Customer
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <button 
                          onClick={() => openDeleteConfirm(user)} 
                          className="flex-1 md:flex-none flex justify-center items-center gap-2 p-2 md:p-2 text-[#7A6B5E] bg-white md:bg-transparent rounded-lg md:rounded-full border border-gray-200 md:border-none hover:text-red-600 hover:bg-red-100 transition-all duration-200 md:hover:scale-110 shadow-sm md:shadow-none"
                          title="Delete User"
                        >
                          <Trash2 size={18} className='text-red-600'/> <span className="md:hidden text-xs font-medium text-gray-700">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr className="block md:table-row">
                    <td colSpan="3" className="py-16 text-center block md:table-cell">
                      <User size={40} className="mx-auto text-[#D8C9B3] mb-4" />
                      <h3 className="text-lg font-bold text-[#C49B47] mb-1">No users found</h3>
                      <p className="text-[#7A6B5E] text-sm">Try adjusting your search.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= بوب أب تفاصيل المستخدم ================= */}
      {viewUser && (
        <div className="fixed inset-0 bg-[#2C1F17]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-[#D8C9B3] rounded-2xl p-5 md:p-6 w-full max-w-md shadow-2xl animate-scale-in relative overflow-y-auto max-h-[90vh]">
            
            <button onClick={() => setViewUser(null)} className="absolute top-4 right-4 p-1 text-[#7A6B5E] hover:text-[#C49B47] transition-colors bg-white/50 rounded-full">
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mt-2 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#C49B47]/20 flex items-center justify-center text-[#C49B47] font-bold text-3xl shadow-md border-2 border-[#C49B47]/30 mb-4 overflow-hidden shrink-0">
                {viewUser.avatar ? (
                  <img 
                    src={viewUser.avatar.startsWith("http") ? viewUser.avatar : `${SERVER_ORIGIN}${viewUser.avatar}`} 
                    alt={viewUser.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  viewUser.name.charAt(0).toUpperCase()
                )}
              </div>
              
              <h2 className="text-xl font-bold text-[#C49B47] text-center break-all">{viewUser.name}</h2>
              <span className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                viewUser.role === 'admin' ? 'bg-[#C49B47]/10 text-[#C49B47] border-[#C49B47]/30' : 'bg-gray-100 text-gray-600 border-gray-200'
              }`}>
                {viewUser.role === 'admin' ? <Shield size={14} /> : <User size={14} />}
                {viewUser.role === 'admin' ? 'Admin' : 'Customer'}
              </span>
            </div>

            <div className="space-y-3 bg-[#F4EFE6] rounded-xl p-4 border border-[#D8C9B3]">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#FAF7F2] rounded-lg shadow-sm text-[#C49B47] shrink-0 mt-0.5">
                  <Mail size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#7A6B5E] font-medium uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-semibold text-[#2C1F17] break-all">{viewUser.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#FAF7F2] rounded-lg shadow-sm text-[#C49B47] shrink-0 mt-0.5">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-[#7A6B5E] font-medium uppercase tracking-wider">Phone Number</p>
                  <p className="text-sm font-semibold text-[#2C1F17]" dir="ltr">
                    {viewUser.phone || viewUser.phoneNumber || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#FAF7F2] rounded-lg shadow-sm text-[#C49B47] shrink-0 mt-0.5">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-[#7A6B5E] font-medium uppercase tracking-wider">Joined Date</p>
                  <p className="text-sm font-semibold text-[#2C1F17]">
                    {new Date(viewUser.createdAt || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#FAF7F2] rounded-lg shadow-sm text-[#C49B47] shrink-0 mt-0.5">
                  <Fingerprint size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#7A6B5E] font-medium uppercase tracking-wider">User ID</p>
                  <p className="text-sm font-semibold text-[#2C1F17] font-mono break-all">{viewUser.id}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setViewUser(null)} 
              className="w-full mt-5 py-3 text-sm font-bold text-white bg-[#C49B47] rounded-lg hover:bg-[#B8860B] shadow-md transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* ================= الـ Modals ================= */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-[#2C1F17]/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-[#D8C9B3] rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-full shrink-0 ${modalData.type === 'confirm' || modalData.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-[#C49B47]/10 text-[#C49B47]'}`}>
                {modalData.type === 'success' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
              </div>
              <h3 className="text-lg font-bold text-[#C49B47]">{modalData.title}</h3>
              <button onClick={closeModal} className="ml-auto p-1 text-[#7A6B5E] hover:text-[#2C1F17]"><X size={18} /></button>
            </div>
            <p className="text-sm text-[#7A6B5E] mb-6">{modalData.message}</p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-2">
              {modalData.type === 'confirm' ? (
                <>
                  <button onClick={closeModal} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-[#7A6B5E] bg-[#F4EFE6] border border-[#D8C9B3] rounded-lg hover:bg-[#E0D3C3] transition-colors">Cancel</button>
                  <button onClick={handleConfirmAction} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm">Delete User</button>
                </>
              ) : (
                <button onClick={closeModal} className="w-full py-2.5 text-sm font-bold text-white bg-[#C49B47] rounded-lg hover:bg-[#B8860B] transition-colors shadow-md">Got it</button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;