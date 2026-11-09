import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { bg2 } from "../assets";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsSending(false);
        setStatus({ type: "success", message: "Message sent successfully!" });
        form.current.reset();
        setTimeout(() => setStatus({ type: "", message: "" }), 5000);
      })
      .catch((error) => {
        setIsSending(false);
        setStatus({ type: "error", message: "Failed to send message. Please try again." });
        console.error("EmailJS Error:", error);
      });
  };

  return (
    // شلنا h-screen وحطينا min-h-screen عشان يسمح بالسكرول لو الشاشة صغيرة
    <div className="relative font-sans bg-[#1A1614] min-h-screen w-full flex items-center justify-center py-10 px-4">
      
      {/* 1. الصورة كاملة وخلفية ثابتة */}
      <div className="fixed inset-0 z-0">
        <img 
          src={bg2} 
          alt="Shatha Background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
      </div>

      {/* 2. المحتوى */}
      <div className="relative z-10 w-full max-w-7xl mt-35 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-5">
        
        {/* العنوان الضخم */}
        <div className="text-center  ml-10 lg:text-left max-w-lg animate-fade-in-up shrink-0 ">
          <span className="text-[#eba80d] text-[10px] sm:text-sm font-bold tracking-[0.4em] uppercase mb-1 sm:mb-2 block drop-shadow-md">
            Shatha Store
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white italic leading-tight drop-shadow-2xl">
            Let's create <br className="hidden sm:block" /> something <span className="text-[#ffb303]">beautiful.</span>
          </h1>
        </div>

        {/* كارت الفورم الزجاجي */}
        <div className="relative w-full max-w-7xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row animate-fade-in-up delay-200">
          
          {/* الخلفية الزجاجية */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/50 backdrop-blur-2xl border border-white/20 rounded-[2rem] pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2rem]"></div>

          <div className="relative z-10 w-full flex flex-col lg:flex-row">
            
            {/* الجانب الأيسر: البيانات */}
            <div className="w-full lg:w-5/12 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-3 sm:mb-4">
                  Contact Information
                </h2>
                <p className="text-[12px] sm:text-sm text-white/80 leading-relaxed mb-6">
                  Fill out the form and our team will get back to you within 24 hours. We look forward to hearing from you.
                </p>

                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="group cursor-pointer">
                    <p className="text-[10px] sm:text-[12px] font-bold tracking-widest uppercase text-[#ffb303] mb-1">Email</p>
                    <a href="mailto:hello@shatha.com" className="text-sm sm:text-base text-white/90 group-hover:text-[#ffb303] transition-colors duration-300">hello@shatha.com</a>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-[10px] sm:text-[12px] font-bold tracking-widest uppercase text-[#ffb303] mb-1">Phone</p>
                    <a href="tel:+201234567890" className="text-sm sm:text-base text-white/90 group-hover:text-[#ffb303] transition-colors duration-300">+20 123 456 7890</a>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-[10px] sm:text-[12px] font-bold tracking-widest uppercase text-[#ffb303] mb-1">Visit Us</p>
                    <p className="text-sm sm:text-base text-white/90 group-hover:text-[#ffb303] transition-colors duration-300">123 Nile Street, Zamalek<br/>Cairo, Egypt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* الجانب الأيمن: الفورم */}
            <div className="w-full lg:w-7/12 p-6 sm:p-8 md:p-10">
              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5 sm:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      name="user_name"
                      required
                      className="w-full bg-transparent border-b border-white/30 py-2 text-white text-sm focus:outline-none focus:border-[#ffb303] transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-2 text-white/60 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#ffb303] peer-focus:font-bold peer-focus:uppercase peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-[#ffb303] peer-valid:font-bold peer-valid:uppercase pointer-events-none">
                      First Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      name="user_email"
                      required
                      className="w-full bg-transparent border-b border-white/30 py-2 text-white text-sm focus:outline-none focus:border-[#ffb303] transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-2 text-white/60 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#ffb303] peer-focus:font-bold peer-focus:uppercase peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-[#ffb303] peer-valid:font-bold peer-valid:uppercase pointer-events-none">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative group mt-2">
                  <textarea 
                    name="message"
                    rows="3"
                    required
                    className="w-full bg-transparent border-b border-white/30 py-2 text-white text-sm focus:outline-none focus:border-[#ffb303] transition-colors resize-none peer"
                    placeholder=" "
                  ></textarea>
                  <label className="absolute left-0 top-2 text-white/60 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#ffb303] peer-focus:font-bold peer-focus:uppercase peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-[#ffb303] peer-valid:font-bold peer-valid:uppercase pointer-events-none">
                    Your Message
                  </label>
                </div>

                {status.message && (
                  <p className={`text-xs sm:text-sm font-medium ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
                    {status.message}
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={isSending}
                  className={`mt-2 w-full sm:w-auto self-start px-8 py-3 bg-[#ffb303] text-[#1A1614] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 
                    ${isSending ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:shadow-[0_0_20px_rgba(255,179,3,0.4)]"}`}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* أنيميشن */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        .delay-200 { animation-delay: 200ms; }
      `}} />
    </div>
  )
}

export default Contact;