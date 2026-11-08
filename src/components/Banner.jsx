import { useSelector } from "react-redux";
import { banner } from "../assets";
import { Link } from "react-router-dom";

const Banner = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-full relative">
    
      <img src={banner} alt="baaner" className="w-full h-[60vh] md:h-[80vh] lg:h-full object-cover" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 md:via-black/10 to-transparent flex flex-col justify-center items-start px-6 md:px-16 lg:px-25 text-left">
 
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white max-w-lg leading-tight">
          Scent as <span className="text-[#b28421]">Memory</span> & Ritual
        </h1>

        
        <p className="text-sm sm:text-base md:text-lg font-semibold text-white mt-3 md:mt-4 max-w-md md:max-w-lg leading-relaxed">
          Scented candles, perfume oils, and room sprays composed from natural wax and fine perfumer's essences — designed to be lived with, not just displayed.
        </p>
      </div>

      <div className="absolute bottom-6 md:bottom-12 lg:bottom-15 flex justify-center items-start gap-5 px-6 md:px-16 lg:px-25">
     
        <button className="border-2 border-[#b28421] bg-[#b28421] px-10 sm:px-14 md:px-18 lg:px-20 py-2.5 md:py-3 text-lg md:text-xl text-white font-bold rounded-2xl">
         {user?.role?.toLowerCase() !== "admin" && (
  <Link to="/products" className="...">
    shop
  </Link>
)}
        </button>
      </div>
    </div>
  );
};

export default Banner;