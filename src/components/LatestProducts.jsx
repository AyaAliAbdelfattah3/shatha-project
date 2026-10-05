import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchLatestProducts } from "../redux/productsSlice"
import { resolveProductImage } from "../utils/image"
import Tilt from 'react-parallax-tilt';
import { addToCart } from "../redux/cartSlice";
import useAddToCart from "../hook/useAddToCart";
const LatestProducts = () => {
 const tiltOptions = {
    glareEnable: true,      // تفعيل تأثير اللمعان (الضوء)
    glareMaxOpacity: 0.3,   // قوة اللمعان
    glareColor: "#ffffff",  // لون اللمعان
    glarePosition: "all",   // مكان اللمعان
    scale: 1.05,            // تكبير البطاقة قليلاً عند الهوفر
    perspective: 1000,      // عمق التأثير الـ 3D (كلما قل زاد الميلان)
    max: 15,                // أقصى زاوية ميلان (بالدرجات)
    speed: 1000,            // سرعة الدخول والخروج من التأثير
    transition: true,       // تفعيل الحركة السلسة
    gyroscope: true         // تفعيل الحركة عبر الهزاز في الموبايل
  };

  const handleAddToCart = useAddToCart()

const dispatch = useDispatch()
const items = useSelector((state) =>state.products.latestItems)

const status = useSelector((state) => state.products.latestStatus)


useEffect(()=>{
    if(status === "idle"){
        dispatch(fetchLatestProducts())
    }
},[status , dispatch])


if(status === "failed" ||   (status === "succeeded" &&  items.length === 0)){
   return null;

}

  return (
  <section className="bg-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* خلفية جمالية ناعمة */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8DEC9]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E0D5C1]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header القسم */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-[#E3D9CC] pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D3] text-[#8C6B4F] text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#8C6B4F] animate-pulse" />
              Interactive Collection
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-medium text-[#2A2421] tracking-tight">
          New Arrivals
            </h2>
          </div>
         
        </div>

        {/* شبكة المنتجات (3D Tilt Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            // 3. تغليف الكارت بمكون Tilt مع التمرير الإعدادات
            <Tilt 
              key={item.id || index} 
              {...tiltOptions}
              className="[transform-style:preserve-3d]" // ضروري لعمل تأثير عمق لداخل الكارت
            >
              <div
                className="group relative bg-[#FCFAF7] rounded-2xl p-4 transition-all duration-300 border border-[#EBE3D8] shadow-sm hover:shadow-2xl flex flex-col justify-between h-full w-full"
              >
                {/* حاوية الصورة */}
                {/* 4. إضافة preserve-3d هنا أيضاً إذا أردت جعل الصورة تطفو */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F2ECE4] mb-4 [transform-style:preserve-3d]">
                  <span className="absolute top-3 left-3 z-10 bg-[#2A2421] text-[#FAF7F2] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                    New
                  </span>

                  <img
                    src={resolveProductImage ? resolveProductImage(item.image) : item.image}
                    alt={item.title || item.category || 'Product'}
                    // 5. تأثير Parallax اختياري: جعل الصورة تتحرك عكس البطاقة
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:[transform:translateZ(20px)_scale(1.1)]"
                  />
                </div>

                {/* تفاصيل المنتج */}
                <div className="flex flex-col grow justify-between px-1">
                  <div>
                    <span className="text-[11px] font-medium tracking-wider text-[#9C826B] uppercase block mb-1">
                      {item.category}
                    </span>
                    {item.title && (
                      <h3 className="text-base font-medium text-[#2A2421] group-hover:text-[#8C6B4F] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                    )}
                  </div>

                  {/* السعر والزر */}
                  <div className="mt-4 pt-3 border-t border-[#F0E8DD] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8C8075] block">Price</span>
                      <span className="text-lg font-serif font-bold text-[#2A2421]">
                        ${item.price}
                      </span>
                    </div>

                
                      <button onClick={() =>handleAddToCart(item ,1)}
                    
                      aria-label="Add to cart"
                      className="w-9 h-9 rounded-full bg-[#F2ECE4] hover:bg-[#2A2421] text-[#2A2421] hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>

      </div>
    </section>
  )
}

export default LatestProducts
