import { bg2 } from "../assets"

const Contact = () => {
  return (
    <div className="relative font-sans bg-[#1A1614] h-screen w-screen overflow-hidden">
      
      {/* 1. الصورة كاملة وخلفية ثابتة */}
      <div className="fixed inset-0 z-0">
        <img 
          src={bg2} 
          alt="Shatha Background" 
          className="w-full h-screen object-cover object-center"
        />
        {/* تظليل خفيف جداً عشان الصورة تبان بوضوح */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* 2. المحتوى */}
      <div className="relative z-10 h-full w-full flex  items-center justify-center px-4 sm:px-6 overflow-hidden my-auto">
        
        {/* العنوان الضخم */}
        <div className="text-center max-w-4xl animate-fade-in-up">
          <span className="text-[#eba80d] text-md font-bold tracking-[0.4em] uppercase mb-2 block drop-shadow-md">
            Shatha Store
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white italic leading-tight drop-shadow-2xl">
            Let's create <br /> something <span className="text-[#ffb303]">beautiful.</span>
          </h1>
        </div>

        {/* كارت الفورم الزجاجي الحقيقي */}
        <div className="relative w-full max-w-5xl mt-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row animate-fade-in-up delay-200">
          
          {/* طبقة الزجاج الحقيقية (الخلفية) */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl border border-white/20 rounded-[2rem] pointer-events-none"></div>
          
          {/* توهج خفيف جوه الزجاج عشان يبان كريستال */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2rem]"></div>

          {/* المحتوى بتاع الكارت فوق الزجاج */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row">
            
            {/* الجانب الأيسر: البيانات */}
            <div className="w-full lg:w-5/12 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
                  Contact Information
                </h2>
                <p className="text-sm text-white leading-relaxed mb-6">
                  Fill out the form and our team will get back to you within 24 hours. We look forward to hearing from you.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="group cursor-pointer">
                    <p className="text-[16px] font-bold tracking-widest uppercase text-[#ffb303] mb-1">Email</p>
                    <a href="mailto:hello@shatha.com" className="text-white group-hover:text-[#ffb303] transition-colors duration-300">hello@shatha.com</a>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-[16px] font-bold tracking-widest uppercase text-[#ffb303] mb-1">Phone</p>
                    <a href="tel:+201234567890" className="text-white group-hover:text-[#ffb303] transition-colors duration-300">+20 123 456 7890</a>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-[16px] font-bold tracking-widest uppercase text-[#ffb303] mb-1">Visit Us</p>
                    <p className="text-white group-hover:text-[#ffb303] transition-colors duration-300">123 Nile Street, Zamalek<br/>Cairo, Egypt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* الجانب الأيمن: الفورم */}
            <div className="w-full lg:w-7/12 p-8 md:p-10">
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-white/30 py-2 text-white text-[15px] focus:outline-none focus:border-[#c9a24a] transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-2 text-[50px] text-white/60 transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#ffb303] peer-focus:font-bold peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-4 peer-valid:text-[15px] peer-valid:text-[#ffb303] peer-valid:font-bold peer-valid:tracking-widest peer-valid:uppercase pointer-events-none">
                      First Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      className="w-full bg-transparent border-b border-white/30 py-2 text-white text-[15px] focus:outline-none focus:border-[#ffb303] transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-2 text-[50px] text-white/60 transition-all duration-300 peer-focus:-top-4 peer-focus:text-[15px] peer-focus:text-[#ffb303] peer-focus:font-bold peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#ffb303] peer-valid:font-bold peer-valid:tracking-widest peer-valid:uppercase pointer-events-none">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative group mt-2">
                  <textarea 
                    rows="3"
                    className="w-full bg-transparent border-b border-white/30 py-2 text-white text-[15px] focus:outline-none focus:border-[#ffb303] transition-colors resize-none peer"
                    placeholder=" "
                  ></textarea>
                  <label className="absolute left-0 top-2 text-white/60 text-[50px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[15px] peer-focus:text-[#ffb303] peer-focus:font-bold peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#ffb303] peer-valid:font-bold peer-valid:tracking-widest peer-valid:uppercase pointer-events-none">
                    Your Message
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="mt-4 self-start px-10 py-3 bg-[#ffb303] text-[#1A1614] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,162,74,0.4)]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* أنيميشن وإخفاء السكرول بار تماماً */}
      <style dangerouslySetInnerHTML={{__html: `
        html, body {
          overflow: hidden;
          height: 100%;
        }
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

export default Contact