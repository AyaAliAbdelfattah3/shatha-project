import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  updateProfileAsync, 
  updatePasswordAsync, 
  updateAvatarAsync 
} from "../../redux/authSlice"; // ظبط المسار
import { CheckCircle, AlertCircle, Camera } from "lucide-react"; // أيقونات شيك

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // بنجيب الداتا من الـ Redux
  const { user, loading, error, successMessage } = useSelector((state) => state.auth || {});

  // States الفورم
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // تحديث الفورم لو الداتا في الـ Redux اتغيرت
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // عرض التنبيهات (نجاح / خطأ) بناءً على رد الـ Redux
  useEffect(() => {
    if (successMessage) {
      setAlert({ show: true, type: 'success', message: successMessage });
      setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
    }
    if (error) {
      setAlert({ show: true, type: 'error', message: error });
      setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
    }
  }, [successMessage, error]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 1. تحديث البيانات الشخصية
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfileAsync(formData));
  };

  // 2. تحديث الباسورد
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setAlert({ show: true, type: 'error', message: "New passwords do not match" });
    }
    dispatch(updatePasswordAsync({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    }));
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  // 3. اختيار صورة
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 4. رفع الصورة
  const handleAvatarUpload = () => {
    if (!avatar) return;
    const formDataToSend = new FormData();
    formDataToSend.append("avatar", avatar);
    dispatch(updateAvatarAsync(formDataToSend));
    setAvatar(null); // تصفير الحالة بعد الرفع
  };

  // عشان نعرض الصورة القديمة من السيرفر
  const SERVER_ORIGIN = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-24 font-sans text-[#3d2f1a] relative">
      
      {/* ================= التنبيهات (Alerts) ================= */}
      {alert.show && (
        <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-xl shadow-lg border flex items-center gap-3 transition-all animate-fade-in ${
          alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{alert.message}</span>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="mb-12 border-b border-[#956907]/20 pb-6">
          <h1 className="text-4xl font-serif text-[#2A231B]">My Profile</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ================= 1. كارت الصورة (Avatar) ================= */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#956907]/10 shadow-sm flex flex-col items-center text-center">
              
              <div className="relative group cursor-pointer mb-6">
                <div className="w-32 h-32 rounded-full bg-[#956907]/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-md relative">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : user?.avatar ? (
                    <img src={`${SERVER_ORIGIN}${user.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-serif text-[#956907] italic">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                  
                  {/* تراكب لتغيير الصورة */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera size={28} className="text-white" />
                  </div>
                </div>
                
                {/* حقل رفع الصورة المخفي */}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
              </div>

              {/* زرار حفظ الصورة بيظهر بس لو إختار صورة جديدة */}
              {avatar && (
                <button 
                  onClick={handleAvatarUpload} 
                  disabled={loading} 
                  className="mb-4 text-xs bg-[#956907] text-white px-6 py-2 rounded-full hover:bg-[#735109] transition-colors disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Save Photo"}
                </button>
              )}

              <h2 className="text-2xl font-bold text-[#2A231B] mb-1">{user?.name || "User Name"}</h2>
              <p className="text-sm text-gray-500 mb-8">{user?.email || "email@example.com"}</p>
              
              <div className="w-full h-px bg-[#956907]/10 mb-8"></div>

              <button 
                onClick={handleLogout} 
                className="w-full py-3 rounded-full border border-[#2A231B] text-[#2A231B] text-xs font-bold uppercase tracking-widest hover:bg-[#2A231B] hover:text-white transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* ================= 2. فورمات التعديل ================= */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            
            {/* فورم البيانات الشخصية */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif text-[#2A231B] mb-6">Personal Information</h3>
              
              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+20 123 456 7890" className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors" />
                </div>
                
                <div className="flex justify-end mt-4">
                  <button type="submit" disabled={loading} className="px-8 py-3 bg-[#956907] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#735109] transition-all duration-300 disabled:opacity-50">
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>

            {/* فورم تغيير كلمة المرور */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif text-[#2A231B] mb-6">Security</h3>
              
              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-6">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Current Password</label>
                  <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">New Password</label>
                    <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Confirm Password</label>
                    <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors" />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button type="submit" disabled={loading} className="px-8 py-3 bg-[#2A231B] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#956907] transition-all duration-300 disabled:opacity-50">
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;