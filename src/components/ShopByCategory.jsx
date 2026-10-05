import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../redux/productsSlice"
import { getProducts } from "../api/products"
import { resolveProductImage } from "../utils/image"
import useAddToCart from "../hook/useAddToCart"
const ShopByCategory = () => {

const handleAddToCart = useAddToCart();
const dispatch = useDispatch()
const categories = useSelector((state) =>state.products.categories)

const status = useSelector((state) => state.products.categoriesStatus)



const [selectedCategory , setSelectedCategory] = useState(null);
const [products , setProducts] = useState([])
const [productsStatus , setProductsStatus] = useState("idle")


useEffect(()=>{
    if(status === "idle"){
        dispatch(fetchCategories())
    }
},[status , dispatch])


useEffect(()=>{
    let cancelled = false;
setProductsStatus("loading");

const params = selectedCategory ? {category : selectedCategory , limit:8 }: {limit:8}


getProducts(params)
.then((res) =>{
    if(cancelled) return;
    setProducts(res.data.data.products)
    setProductsStatus("succeeded")

})

.catch(()=>{
    if(cancelled) return;
    setProductsStatus("failed")
})

//clean up

return()=>{
    cancelled = true;
}





}, [selectedCategory])




if(status === "failed" ||   (status === "succeeded" &&  categories.length === 0)){
   return null;

}











  return (
<div className="bg-[#FAF7F2] min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-9" >
  <div className="max-w-7xl mx-auto">
    
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-serif text-[#2C241E] font-semibold text-center mb-8 tracking-wide">
      Shop by category
    </h2>

    {/* Category Chips Container */}
    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
      <button
        type="button"
        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
          selectedCategory === null
            ? "bg-[#C48B28] text-white shadow-md shadow-[#C48B28]/20 scale-105"
            : "bg-[#EFEAE1] text-[#5A4D41] hover:bg-[#E5DDD0] hover:text-[#2C241E]"
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </button>

      {categories.map((name) => (
        <button
          key={name}
          type="button"
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
            selectedCategory === name
              ? "bg-[#C48B28] text-white shadow-md shadow-[#C48B28]/20 scale-105"
              : "bg-[#EFEAE1] text-[#5A4D41] hover:bg-[#E5DDD0] hover:text-[#2C241E]"
          }`}
          onClick={() => setSelectedCategory(name)}
        >
          {name}
        </button>
      ))}
    </div>

    {/* Products & Status Section */}
    <div>
      {/* Error State */}
      {productsStatus === "failed" && (
        <div className="max-w-md mx-auto p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-600 text-center font-medium my-8">
          <p>couldn't load products , try again </p>
        </div>
      )}

      {/* Empty State */}
      {productsStatus === "succeeded" && products.length === 0 && (
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#EFEAE1]/60 border border-[#E5DDD0] text-[#7A6B5D] text-center font-medium my-8">
          <p>no products in this category</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id } 
            className="group bg-white rounded-2xl p-4 border border-[#EBE5DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
           {/* Image Wrapper + Luxury Floating Action */}
            <div className="relative overflow-hidden rounded-2xl bg-[#F5F2EC] mb-4">
              <img 
                src={resolveProductImage(product.image)} 
                alt={product.name} 
                className="w-full h-80 object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Silk Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C241E]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

             {/* Modern Floating Circle Button */}
<div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-auto">
  <button 
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      handleAddToCart(product, 1);
    }}
    type="button"
    title="Add to Cart"
    className="w-12 h-12 rounded-full bg-[#e4d7c5] backdrop-blur-md text-[#2C241E] hover:bg-[#C48B28] hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer border border-white/50"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2} 
      stroke="currentColor" 
      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</div>

              {/* Brand Tag (Floating Top Left) */}
              {product.brand && (
                <span className="absolute top-3 left-3 bg-[#EFDCE4] backdrop-blur-md text-[#2C241E] text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-white/40 shadow-xs">
                  {product.brand}
                </span>
              )}
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col  justify-between">
                {/* <p className="bg-[#EFDCE4] w-37.5 rounded-3xl text-center">{product.brand}</p> */}
                    <div className="overflow-hidden rounded-lg bg-[#F5F2EC] mb-4 font-semibold mt-4">
             <h2>{product.name}</h2>
            </div>
              <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed mb-3">
                {product.description}
              </p>
            
              <h5 className="text-xl font-bold text-[#C48B28]">
                price : {product.price} $
              </h5>


 
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</div>    
  )
}

export default ShopByCategory
