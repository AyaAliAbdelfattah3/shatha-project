
const Mail = () => {
  return (
  
      <div className="flex flex-col items-center justify-center gap-4 py-10 bg-[#EFDCE4]">
        <div className="flex flex-col items-center justify-center gap-4 py-10  ">
          <h1 className="text-4xl font-bold text-[#473428]">
            Join the inner circle
          </h1>
          <p className="text-xl font-bold text-[#473428]/70 ">Early access to seasonal releases, atelier notes, and a little something for your first order.</p>

          <div>
            <input type="email" placeholder="Enter your email" className="px-3 mt-7 py-2 rounded-l-3xl border border-[#d4a852] focus:outline-none focus:ring-1 focus:ring-[#3B2519]" />
            <button className="px-3 py-2 bg-[#d4a852] text-[#FAF7F2] rounded-r-3xl hover:bg-[#A35266] transition-colors duration-300">
              Subscribe
              </button>
          </div>
      </div>
      </div>
 
  )
}

export default Mail
