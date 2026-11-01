const Mail = () => {
  return (
    <section className="w-full bg-[#EFDCE4] py-20 px-6 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
        
        {/* عنصر جمالي: علامة فاخرة صغيرة */}
        <div className="w-8 h-8 rounded-full border border-[#d4a852] flex items-center justify-center text-[#d4a852] mb-6 text-sm font-serif">
          ✦
        </div>

        {/* اقتباس أو عنوان تعبيري أنيق */}
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#473428] leading-tight mb-6">
          "Scents that speak in whispers, <br className="hidden md:block" /> leaving a lasting impression."
        </h2>

        {/* فاصل خطي ذهبي ناعم */}
        <div className="w-24 h-[1px] bg-[#d4a852] my-4"></div>

        {/* وصف تفصيلي هادئ */}
        <p className="text-base md:text-lg font-medium text-[#473428]/80 max-w-xl leading-relaxed mt-2">
          Every composition is a journey through memory and nature, thoughtfully bottled to transform your private sanctuaries into places of pure tranquility.
        </p>

    
      </div>
    </section>
  );
};

export default Mail;