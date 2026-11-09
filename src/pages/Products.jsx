import { useEffect } from "react";
import { fetchProducts, setPage } from "../redux/productsSlice";
import { searchProducts, clearSearchResults } from "../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import useAddToCart from "../hook/useAddToCart";
import { Eye } from "lucide-react";
// 1. استيراد دالة الصورة اللي شغالة في صفحة الشوب
import { resolveProductImage } from "../utils/image";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleAddToCart = useAddToCart();
  const dispatch = useDispatch();

  const {
    items,
    status,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.products);

  const {
    results: searchResults,
    searchTerm: reduxSearchTerm,
    status: searchStatus,
  } = useSelector(
    (state) =>
      state.search || {
        results: [],
        searchTerm: "",
        status: "idle",
      }
  );

  // البحث الموجود في URL
  const urlSearchTerm = searchParams.get("search") || "";

  // نستخدم URL لو موجود، وإلا Redux
  const activeSearchTerm = urlSearchTerm || reduxSearchTerm || "";
  
  // تصحيح عشان نضمن إنها boolean
  const isSearching = Boolean(reduxSearchTerm && reduxSearchTerm.trim().length >= 1);

  // جلب المنتجات العادية
  useEffect(() => {
    if (!isSearching) {
      dispatch(
        fetchProducts({
          page,
          limit: 8,
        })
      );
    }
  }, [dispatch, page, isSearching]);

  // لو دخلنا Products ومعانا search في URL
  useEffect(() => {
    if (urlSearchTerm && urlSearchTerm.trim().length >= 1) {
      dispatch(searchProducts(urlSearchTerm));
    }
  }, [urlSearchTerm, dispatch]);

  // المنتجات اللي هتتعرض
  const displayedItems = isSearching ? searchResults || [] : items;

  const isLoading =
    status === "loading" ||
    (isSearching && searchStatus === "loading");

  return (
    <>
      {/* Loading */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-4 pt-28 md:pt-36 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#FAF7F2] rounded-[28px] p-4 border border-[#E8E2D9] animate-pulse"
              >
                <div className="w-full h-64 bg-[#EFE9E0] rounded-2xl mb-4"></div>
                <div className="h-5 bg-[#EFE9E0] rounded-md w-2/3 mb-3"></div>
                <div className="h-3.5 bg-[#EFE9E0] rounded-md w-full mb-2"></div>
                <div className="h-3.5 bg-[#EFE9E0] rounded-md w-4/5"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="min-h-screen bg-[#FDFBF7] px-4 pt-28 md:pt-36 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* 👇 العنوان الاحترافي في نص الشاشة */}
            <div className="text-start mb-12">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#A88B73] uppercase block mb-2">
                Discover Our Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold italic text-[#7e4206]">
                {isSearching ? "Search Results" : "All Products"}
              </h2>
              <div className="w-50 h-0.5 bg-[#814207] mt-4 rounded-full"></div>
            </div>

            {/* Search Title */}
            {isSearching && (
              <div className="mb-6 pb-4 border-b border-[#EFE8DE]">
                <p className="text-[#7A685D] text-sm">
                  Search results for:
                  <span className="font-bold text-[#3B2519] ml-1">
                    "{activeSearchTerm}"
                  </span>
                </p>
              </div>
            )}

            {/* Products */}
            {displayedItems && displayedItems.length > 0 ? (
              <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {displayedItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() =>
                      navigate(`/products/${item._id || item.id}`)
                    }
                    className="group bg-[#FAF7F2] rounded-[30px] border border-[#EFE8DE] p-3
                      shadow-[0_4px_20px_rgba(74,52,39,0.04)]
                      hover:shadow-[0_22px_45px_rgba(140,58,72,0.18)]
                      hover:border-[#F4C2C2]
                      hover:-translate-y-3 hover:scale-[1.01]
                      transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      flex flex-col overflow-hidden relative cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative w-full h-64 rounded-[22px] bg-[#F5EFE6] overflow-hidden pointer-events-none">
                      
                      {/* 2. استخدام دالة resolveProductImage هنا */}
                      <img
                        src={resolveProductImage(item.image)} 
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />

                      {/* 👇 أيقونة العين - تظهر عند الـ Hover */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="w-5 h-5 text-[#8a5331]" />
                        </div>
                        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-1.5 rounded-full">
                          View Product
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col grow">
                      <h3 className="text-base font-bold text-[#3B2519] group-hover:text-[#A35266] transition-colors duration-300 line-clamp-1 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#7A685D] line-clamp-2 leading-relaxed grow">
                        {item.description}
                      </p>
                    </div>

                    {/* Price + Cart */}
                    <div className="mt-4 pt-3 px-3 pb-2 border-t border-[#EFE8DE] flex items-center justify-between relative z-30">
                      <h5 className="text-base font-extrabold text-[#3B2519]">
                        {item.price}$
                      </h5>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleAddToCart(item, 1);
                        }}
                        className="relative z-40 pointer-events-auto px-4 py-2 bg-[#b28421] text-[#FAF7F2] text-xs font-bold rounded-2xl
                          shadow-sm cursor-pointer hover:bg-[#8C3A48]
                          hover:scale-105 active:scale-95
                          transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-[#7A685D] font-bold text-lg">
                {isSearching
                  ? "No products match the current search"
                  : "No products available"}
              </div>
            )}

            {/* Pagination */}
            {!isSearching && (
              <div className="mt-20 pt-10 border-t border-[#EFE8DE] flex justify-center items-center">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) => dispatch(setPage(newPage))}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;