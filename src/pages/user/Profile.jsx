import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { logout } from "../redux/authSlice" // استورد أكشن تسجيل الخروج لو موجود

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // جلب بيانات المستخدم من الـ Redux
  const { user } = useSelector((state) => state.auth)

  // حالات الفورم
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // حالة الصورة (مبدئياً بناخد أول حرف من الاسم، وتقدر تغيرها لصورة حقيقية)
  const [avatar, setAvatar] = useState(null)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value })

  const handleLogout = () => {
    // dispatch(logout())
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    // هنا تعمل dispatch للأكشن اللي بيحدث البيانات في الباك إند
    console.log("Updating Profile:", formData)
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    // هنا تعمل dispatch للأكشن اللي بيحدث الباسورد
    console.log("Updating Password:", passwords)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-24 font-sans text-[#3d2f1a]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* العنوان الرئيسي */}
        <div className="mb-12 border-b border-[#956907]/20 pb-6">
          <h1 className="text-4xl font-serif text-[#2A231B]">My Profile</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 1. كارت الصورة والبيانات المختصرة (الشمال) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#956907]/10 shadow-sm flex flex-col items-center text-center">
              
              {/* الصورة الرمزية */}
              <div className="relative group cursor-pointer mb-6">
                <div className="w-32 h-32 rounded-full bg-[#956907]/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-md relative">
                  {avatar ? (
                    <img src={URL.createObjectURL(avatar)} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-serif text-[#956907] italic">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                  {/* تراكب لتغيير الصورة */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                {/* حقل إدخال مخفي لاختيار الصورة */}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

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

          {/* 2. فورمات التعديل (اليمين) */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            
            {/* فورم البيانات الشخصية */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif text-[#2A231B] mb-6">Personal Information</h3>
              
              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+20 123 456 7890"
                      className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors"
                  />
                </div>
                
                <div className="flex justify-end mt-4">
                  <button type="submit" className="px-8 py-3 bg-[#956907] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#735109] transition-all duration-300">
                    Save Changes
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
                  <input 
                    type="password" 
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">New Password</label>
                    <input 
                      type="password" 
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Confirm Password</label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-transparent border-b border-[#956907]/20 py-2 text-[15px] text-[#2A231B] focus:outline-none focus:border-[#956907] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button type="submit" className="px-8 py-3 bg-[#2A231B] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#956907] transition-all duration-300">
                    Update Password
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile