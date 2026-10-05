
const Footer = () => {
  return (
  <div>
  <footer className="bg-[#FAF7F2] border-t border-[#EFE8DE] pt-16 pb-10 px-6 mt-20 text-[#4A3427]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 lg:gap-16">
      
      {/* 1. قسم الشعار والوصف */}
      <div className="flex flex-col items-start gap-3 max-w-sm">
        <h1 className="text-4xl font-extrabold tracking-wider text-[#3B2519] font-serif italic">
          Shatha
        </h1>
        <p className="text-md leading-relaxed text-[#7A685D]">
          Small-batch scented candles, perfume oils, and room sprays, hand-poured in our atelier.
        </p>
      </div>

      {/* 2. قسم روابط التسوق */}
      <div>
        <h2 className="text-xl font-bold text-[#3B2519] uppercase tracking-widest mb-4 border-b border-[#F4C2C2]/90 pb-1">
          Shop
        </h2>
        <ul className="text-md text-[#7A685D] space-y-2.5">
          <li className="hover:text-[#8C3A48] hover:translate-x-1 transition-all duration-300 cursor-pointer">
            Products
          </li>
          <li className="hover:text-[#8C3A48] hover:translate-x-1 transition-all duration-300 cursor-pointer">
            Candles
          </li>
          <li className="hover:text-[#8C3A48] hover:translate-x-1 transition-all duration-300 cursor-pointer">
            Perfumes
          </li>
          <li className="hover:text-[#8C3A48] hover:translate-x-1 transition-all duration-300 cursor-pointer">
            Home Fragrance
          </li>
        </ul>
      </div>

      {/* 3. قسم معلومات التواصل */}
      <div>
        <h2 className="text-xl font-bold text-[#3B2519] uppercase tracking-widest mb-4 border-b border-[#F4C2C2]/90 pb-1">
          Contact Us
        </h2>
        <ul className="text-md text-[#7A685D] space-y-2.5">
          <li className="hover:text-[#8C3A48] transition-colors duration-300">
            <span className="font-semibold text-[#3B2519]">Email:</span> info@shatha.com
          </li>
          <li className="hover:text-[#8C3A48] transition-colors duration-300">
            <span className="font-semibold text-[#3B2519]">Phone:</span> +1 (555) 123-4567
          </li>
          <li className="hover:text-[#8C3A48] transition-colors duration-300">
            <span className="font-semibold text-[#3B2519]">Address:</span> 123 cairo St, Cairo City, Egypt
          </li>
        </ul>
      </div>

    </div>

    {/* خط فاصل وحقوق النشر لللمسة النهائية */}
    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#EFE8DE] flex flex-col sm:flex-row justify-between items-center text-[12px] text-[#7A685D] gap-4">
      <p>© {new Date().getFullYear()} Shatha. All rights reserved.</p>
      <div className="flex gap-4">
        <span className="hover:text-[#8C3A48] cursor-pointer transition-colors ">Privacy Policy</span>
        <span>•</span>
        <span className="hover:text-[#8C3A48] cursor-pointer transition-colors">Terms of Service</span>
      </div>
    </div>
  </footer>
</div>
  )
}

export default Footer
