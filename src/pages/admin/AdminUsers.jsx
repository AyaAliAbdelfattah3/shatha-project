import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, changeUserRole, removeUser } from '../../redux/usersSlice'; 
import { 
  Trash2, Edit3, Shield, User, CheckCircle, AlertTriangle, X, Search, 
  Eye, Mail, Calendar, Fingerprint, Phone 
} from 'lucide-react';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [modalData, setModalData] = useState({
    isOpen: false, type: '', title: '', message: '', user: null
  });

  const [viewUser, setViewUser] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8b6b3e]"></div>
    </div>
  );
  if (error) return <div className="p-8 text-center text-red-500 font-medium bg-red-50 rounded-xl">{error}</div>;

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 min-h-[80vh] relative transition-all">
      
      {/* ================= بوب أب تفاصيل المستخدم ================= */}
      {viewUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-8 w-[450px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] animate-scale-in relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#8b6b3e]/10 to-transparent -z-10"></div>

            <button onClick={() => setViewUser(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all">
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mt-2 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#8b6b3e] to-[#c4a474] flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-[#8b6b3e]/30 border-4 border-white mb-4">
                {viewUser.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{viewUser.name}</h2>
              <span className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                viewUser.role === 'admin' ? 'bg-[#8b6b3e]/10 text-[#8b6b3e]' : 'bg-gray-100 text-gray-600'
              }`}>
                {viewUser.role === 'admin' ? <Shield size={14} /> : <User size={14} />}
                {viewUser.role === 'admin' ? 'Admin' : 'Customer'}
              </span>
            </div>

            <div className="space-y-4 bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm text-[#8b6b3e]">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-semibold text-gray-800">{viewUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm text-[#8b6b3e]">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone Number</p>
                  <p className="text-sm font-semibold text-gray-800" dir="ltr">
                    {viewUser.phone || viewUser.phoneNumber || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm text-[#8b6b3e]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Joined Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {new Date(viewUser.createdAt || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm text-[#8b6b3e]">
                  <Fingerprint size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">User ID</p>
                  <p className="text-sm font-semibold text-gray-800 font-mono">{viewUser.id}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setViewUser(null)} 
              className="w-full mt-6 py-3 text-sm font-medium text-white bg-gray-800 rounded-xl hover:bg-gray-900 shadow-lg transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* ================= الـ Modal الزجاجي ================= */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 transition-all">
          <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl p-7 w-[420px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] animate-scale-in">
            <div className={`flex items-center gap-4 mb-5 ${modalData.type === 'confirm' || modalData.type === 'error' ? 'text-red-500' : 'text-[#8b6b3e]'}`}>
              <div className={`p-2 rounded-full ${modalData.type === 'confirm' || modalData.type === 'error' ? 'bg-red-100' : 'bg-[#8b6b3e]/10'}`}>
                {modalData.type === 'success' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
              </div>
              <h3 className="text-xl font-bold text-gray-800 tracking-tight">{modalData.title}</h3>
              <button onClick={closeModal} className="ml-auto p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"><X size={20} /></button>
            </div>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">{modalData.message}</p>
            <div className="flex justify-end gap-3">
              {modalData.type === 'confirm' ? (
                <>
                  <button onClick={closeModal} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
                  <button onClick={handleConfirmAction} className="px-5 py-2.5 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all">Delete User</button>
                </>
              ) : (
                <button onClick={closeModal} className="w-full py-3 text-sm font-medium text-white bg-[#8b6b3e] rounded-xl hover:bg-[#6b522f] shadow-lg shadow-[#8b6b3e]/30 transition-all">Okay, Got it</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= الهيدر ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-5 mt-19">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Team Members</h1>
          <p className="text-[15px] text-gray-500 mt-1">Manage your users, roles, and access permissions.</p>
        </div>
        
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search members..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200/80 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#8b6b3e]/10 focus:border-[#8b6b3e] transition-all bg-gray-50/50 hover:bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ================= الجدول (بفريم وخطوط وألوان) ================= */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200/80 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200/80">
              <th className="py-4 px-6 font-semibold w-1/2">User</th>
              <th className="py-4 px-6 font-semibold text-center border-l border-gray-200/80">Status / Role</th>
              <th className="py-4 px-6 font-semibold text-center border-l border-gray-200/80 w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8b6b3e] to-[#c4a474] flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-[#8b6b3e]/20">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6 text-center border-l border-gray-100">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium tracking-wide border ${
                    user.role === 'admin' 
                      ? 'bg-purple-50 text-purple-700 border-purple-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-purple-500 animate-pulse' : 'bg-blue-500'}`}></span>
                    {user.role === 'admin' ? 'Admin' : 'Customer'}
                  </span>
                </td>

                <td className="py-4 px-6 border-l border-gray-100">
                  <div className="flex justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                    
                    {/* زرار العين (أزرق) */}
                    <button 
                      onClick={() => setViewUser(user)} 
                      className="p-2.5 bg-white border border-gray-200 rounded-xl text-blue-500 hover:text-white hover:border-blue-500 hover:bg-blue-500 hover:shadow-md transition-all"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>

                    {/* زرار التعديل (بني) */}
                    <div className="relative">
                      <button 
                        onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)} 
                        className={`p-2.5 bg-white border rounded-xl transition-all ${
                          openDropdownId === user.id 
                            ? 'border-[#8b6b3e] text-white bg-[#8b6b3e] shadow-md' 
                            : 'border-gray-200 text-[#8b6b3e] hover:text-white hover:border-[#8b6b3e] hover:bg-[#8b6b3e] hover:shadow-md'
                        }`}
                        title="Change Role"
                      >
                        <Edit3 size={18} />
                      </button>

                      {openDropdownId === user.id && (
                        <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-40 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-scale-in">
                          <div className="p-1.5">
                            <button onClick={() => handleRoleChange(user.id, 'admin')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors">
                              <Shield size={14} className="text-purple-500" />  Admin
                            </button>
                            <button onClick={() => handleRoleChange(user.id, 'user')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors">
                              <User size={14} className="text-blue-500" />  Customer
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* زرار الحذف (أحمر) */}
                    <button 
                      onClick={() => openDeleteConfirm(user)} 
                      className="p-2.5 bg-white border border-gray-200 rounded-xl text-red-500 hover:text-white hover:border-red-500 hover:bg-red-500 hover:shadow-md transition-all"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;