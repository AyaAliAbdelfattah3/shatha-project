import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../redux/authSlice"
import { Eye, EyeOff, Loader2 } from "lucide-react"; 
import { fetchCart } from "../redux/cartSlice";
import { fetchMe } from "../redux/authSlice";
// استدعاء مكتبات جوجل
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
            const token = result.payload.token || result.payload.data?.token;
            if (token) {
                localStorage.setItem("token", token);
            }
            dispatch(fetchCart())
            setEmail("")
            setPassword("")
            navigate("/")
        }
    }

    // ✅ دالة نجاح تسجيل الدخول بجوجل
    const handleGoogleSuccess = async (credentialResponse) => {
        const googleToken = credentialResponse.credential;
        
        try {
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: googleToken })
            });

            const data = await res.json();

            if (res.ok) {
                const appToken = data.data.token || data.token;
                localStorage.setItem("token", appToken);
                await dispatch(fetchMe()).unwrap(); 
                dispatch(fetchCart());
                navigate("/");
            } else {
                console.error("server wrong", data.message || data.error);
            }
        } catch (error) {
            console.error("Backend connection problem:", error);
        }
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="min-h-screen flex items-center justify-center bg-[#F3ECE0] px-4 py-16 relative overflow-hidden font-sans">
                
                {/* إضاءات خلفية */}
                <div className="absolute w-[500px] h-[500px] bg-[#D3A250]/15 rounded-full blur-[130px] -top-32 -left-32 pointer-events-none"></div>
                <div className="absolute w-[500px] h-[500px] bg-[#C1903E]/10 rounded-full blur-[130px] -bottom-32 -right-32 pointer-events-none"></div>

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
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#32251D] mb-2">Email Address</label>
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
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#32251D] mb-2">Password</label>
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
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* زر الإرسال */}
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

                    {/* ✅ فاصل (أو) */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-[#E2D7C7]"></div>
                        <span className="flex-shrink-0 mx-4 text-[#7D6E63] text-xs font-medium">OR</span>
                        <div className="flex-grow border-t border-[#E2D7C7]"></div>
                    </div>

                    {/* ✅ زرار جوجل المخصص (Responsive) */}
                    <div className="relative w-full h-[54px]">
                        {/* الزرار اللي بيظهر للمستخدم (تصميمك) */}
                        <div className="absolute inset-0 w-full bg-white hover:bg-[#F9F6F0] border border-[#E2D7C7] text-[#32251D] font-bold rounded-xl shadow-sm transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center gap-3 pointer-events-none">
                            {/* أيقونة جوجل */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </div>

                        {/* زرار جوجل الحقيقي مخفي فوق بتصميمك */}
                        <div className="absolute inset-0 opacity-0 overflow-hidden cursor-pointer flex items-center justify-center scale-150">
                            <GoogleLogin
                                text="continue_with"
                                shape="rectangular"
                                width="100%"
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    console.log('Google Login Failed');
                                }}
                            />
                        </div>
                    </div>
                    
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
        </GoogleOAuthProvider>
    )
}

export default Login