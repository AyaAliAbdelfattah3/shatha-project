import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFeaturedProducts } from "../redux/productsSlice"
import { resolveProductImage } from "../utils/image"

const FeaturedProducts = () => {


const dispatch = useDispatch()
const featured = useSelector((state) =>state.products.featuredItems)

const status = useSelector((state) => state.products.featuredStatus)



useEffect(()=>{
    if(status === "idle"){
        dispatch(fetchFeaturedProducts())
    }
},[status , dispatch])


if(status === "failed" ||   (status === "succeeded" &&  featured.length === 0)){
   return null;

}





  return (
  <section className="bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    
    {/* عنوان القسم Header */}
    <div className="text-center mb-12">
      <span className="text-xs font-semibold tracking-[0.2em] text-[#A88B73] uppercase block mb-2">
        Our Collection
      </span>
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3A332C]">
        Featured Products
      </h2>
      <div className="w-16 h-0.5 bg-[#D4C3B3] mx-auto mt-4 rounded-full"></div>
    </div>

    {/* شبكة المنتجات Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {featured.map((item) => (
        <div
          key={item.id}
          /* 
            التعديلات الرئيسية هنا:
            1. rounded-[32px] لحواف دائرية عريضة تماماً كالصورة
            2. shadow-[0_10px_30px_rgba(0,0,0,0.08)] لإعطاء ظلال هادئة وبارزة
            3. bg-[#EFECE6] يعطي نفس درجة اللون البيج الناعم والملمس البارز
          */
          className="group relative bg-[#c88ea7]/35 rounded-4xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between border border-white/50"
        >
          {/* حاوية الصورة */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[stone-200/60] mb-5 flex items-center justify-center">
            
            {/* بادج "مميز" Featured Badge */}
            <span className="absolute top-3 left-3 z-10 bg-[#3A332C]/85 text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
              Featured
            </span>

            <img
              src={resolveProductImage(item.image)}
              alt={item.category || 'Product image'}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-3xl"
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="flex flex-col grow justify-between text-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#7A736C] uppercase block mb-1">
                {item.category}
              </span>

              {item.title && (
                <h4 className="text-base font-bold text-[#2C2621] mb-2 line-clamp-1">
                  {item.title}
                </h4>
              )}
            </div>

            {/* السعر */}
            <div className="mt-3 pt-3 border-t border-[#3A332C]/10">
              <h5 className="text-lg font-bold text-[#2C2621]">
                ${item.price}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
  )
}

export default FeaturedProducts

