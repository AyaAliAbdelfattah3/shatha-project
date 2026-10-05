import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../redux/authSlice"
import { Eye, EyeOff, Loader2 } from "lucide-react"; // استدعاء الأيقونات
import { fetchCart } from "../redux/cartSlice";





const Login = () => {
const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
const {status , error } = useSelector((state) => state.auth)

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

const submitting = status === "loading";



const handleSubmit = async (e) =>{
    e.preventDefault()
   
    const result = await dispatch(loginUser({ email , password}))
  
    if(loginUser.fulfilled.match(result)){
// 1. استخراج الـ token من الـ payload (حسب الـ structure القادم من السيرفر عندك)
    const token = result.payload.token || result.payload.data?.token;
      
    // 2. حفظ الـ token في الـ localStorage
    if (token) {
      localStorage.setItem("token", token);
    }
      dispatch(fetchCart())
    setEmail("")
        setPassword("")
        navigate("/")
    }
}







  return (
<div className="min-h-screen flex items-center justify-center bg-[#F3ECE0] px-4 py-16 relative overflow-hidden font-sans">
      
  {/* إضاءات خلفية هادئة مأخوذة من لون الذهبي المطفي والخلفية العاجية */}
  <div className="absolute w-[500px] h-[500px] bg-[#D3A250]/15 rounded-full blur-[130px] -top-32 -left-32 pointer-events-none"></div>
  <div className="absolute w-[500px] h-[500px] bg-[#C1903E]/10 rounded-full blur-[130px] -bottom-32 -right-32 pointer-events-none"></div>

  {/* البطاقة الرئيسية بتناسق فاخر وتباين قارع للعين دون أي بهتان */}
  <div className="max-w-md w-full mt-20 bg-[#FAF6F0] border border-[#E2D7C7] rounded-[28px] shadow-[0_20px_50px_rgba(50,37,29,0.08)] p-8 md:p-10 relative z-10 text-[#32251D]">
    
    {/* رأس الفورم */}
    <div className="text-center mb-9 ">
      <div className="inline-block px-3 py-1 rounded-full bg-[#D3A250]/10 border border-[#D3A250]/30 mb-3">
        <span className="text-[#C1903E] font-serif font-bold text-xs tracking-widest uppercase">✦ SHATHA ✦</span>
      </div>
      <h2 className="text-3xl font-serif font-bold tracking-tight text-[#32251D]">
        Welcome Back
      </h2>
      <p className="text-xs text-[#7D6E63] mt-2 font-medium tracking-wide">
        Seasonal drops, ritual guides, and exclusive offers.
      </p>
    </div>

    {/* رسالة الخطأ */}
    {error && (
      <div className="mb-6 bg-[#E20222]/50 p-4 rounded-xl text-[#F3ECE0] text-md font-semibold shadow-sm">
        {error}
      </div>
    )}

    {/* الفورم */}
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Email */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[#32251D] mb-2">
          Email Address
        </label>
        <input 
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3.5 rounded-xl bg-[#F3ECE0]/80 border border-[#E2D7C7] focus:border-[#C1903E] focus:bg-white focus:ring-2 focus:ring-[#C1903E]/20 outline-none transition-all duration-300 text-[#32251D] placeholder-[#9A8B7F] text-sm font-medium"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[#32251D] mb-2">
          Password
        </label>
        <div className="relative">
          <input 
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3.5 pr-12 rounded-xl bg-[#F3ECE0]/80 border border-[#E2D7C7] focus:border-[#C1903E] focus:bg-white focus:ring-2 focus:ring-[#C1903E]/20 outline-none transition-all duration-300 text-[#32251D] placeholder-[#9A8B7F] text-sm font-medium"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D6E63] hover:text-[#32251D] transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* زر الإرسال باللون الذهبي المطفي الراقص (المطابق لزر Subscribe في صورتك) */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-2 bg-[#D3A250] hover:bg-[#C1903E] text-white font-bold py-4 px-4 rounded-xl shadow-[0_6px_20px_rgba(211,162,80,0.3)] hover:shadow-[0_8px_25px_rgba(193,144,62,0.45)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-widest flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin text-white" />
            <span>Logging in...</span>
          </>
        ) : (
          "Log in"
        )}
      </button>

    </form>
    
    <p className="auth-footer text-center mt-8 text-xs font-medium text-[#7D6E63]">
      Don't have an account?{" "}
      <Link to="/register">
        <span className="text-[#C1903E] font-bold underline decoration-[#C1903E] decoration-2 underline-offset-4 hover:text-[#C1903E] transition-colors">
          Sign up
        </span>
      </Link>
    </p>
  </div>
</div>
  )
}

export default Login

