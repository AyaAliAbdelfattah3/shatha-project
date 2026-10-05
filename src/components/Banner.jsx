import { banner } from "../assets";
const Banner = () => {
  return (
    <div className="w-full relative">
      <img src={banner} alt="baaner" className="w-full h-full" />
<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/10 to-transparent flex flex-col justify-center items-start px-25  text-left">
{/* العنوان الرئيسي بألوان فاتحة وواضحة */}
        <h1 className="text-6xl font-serif font-bold text-white max-w-lg leading-tight">
          Scent as <span className="text-[#b28421]">Memory</span> & Ritual
        </h1>

        {/* النص الوصفي */}
        <p className="text-lg font-semibold  text-white  mt-4 max-w-lg leading-relaxed">
          Scented candles, perfume oils, and room sprays composed from natural wax and fine perfumer's essences — designed to be lived with, not just displayed.
        </p>
      </div>
      <div className="absolute bottom-15  flex justify-center items-start gap-5 px-25">
                <button className="border-3 border-[#b28421]  px-15 py-3 text-xl text-white font-bold rounded-2xl">our craft</button>

        <button className=" border-2 border-[#b28421] bg-[#b28421] px-20 py-3 text-xl text-white font-bold rounded-2xl ">shop</button>
      </div>

    </div>

   
  );
};

export default Banner;
