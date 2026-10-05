// src/pages/ProductDetails.jsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProducts } from "../redux/searchSlice";
import useAddToCart from "../hook/useAddToCart";
import { Loader2, ArrowLeft, Star, ShoppingCart } from "lucide-react";

const SERVER_ORIGIN = import.meta.env.VITE_API_URL.replace("/api", "");

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = useAddToCart();

  const { productDetails, status, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (id) {
      dispatch(detailsProducts(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="w-12 h-12 animate-spin text-[#B8860B]" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <p className="text-red-500 text-xl font-bold">حدث خطأ</p>
          <p className="text-[#9A8B7F]">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#966907] transition-colors"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <p className="text-[#9A8B7F] text-xl">المنتج غير موجود</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#966907] transition-colors"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto mt-10">
        {/* زر العودة */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#473428] hover:text-[#B8860B] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* تفاصيل المنتج */}
        <div className="bg-white rounded-2xl border border-[#E5DFD3] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* الصورة */}
            <div className="bg-[#F5F2EC] rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={`${SERVER_ORIGIN}${productDetails.image}`}
                alt={productDetails.name}
                className="w-full h-auto max-h-125 object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/500x500?text=No+Image";
                }}
              />
            </div>

            {/* المعلومات */}
            <div className="flex flex-col justify-between">
              <div>
                {/* التصنيف */}
                <span className="inline-block px-3 py-1 bg-[#FAF7F2] text-[#9A8B7F] text-sm rounded-full mb-3">
                  {productDetails.category}
                </span>

                {/* الاسم */}
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#473428] mb-2">
                  {productDetails.name}
                </h1>

                {/* العلامة التجارية */}
                {productDetails.brand && (
                  <p className="text-sm text-[#9A8B7F] mb-4">
                    Brand: <span className="font-medium text-[#473428]">{productDetails.brand}</span>
                  </p>
                )}

                {/* السعر */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-[#B8860B]">
                    ${productDetails.price}
                  </span>
                  {productDetails.oldPrice && (
                    <span className="text-lg text-[#9A8B7F] line-through">
                      ${productDetails.oldPrice}
                    </span>
                  )}
                </div>

                {/* المخزون */}
                <div className="mb-4">
                  <span className={`text-sm font-medium ${productDetails.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {productDetails.countInStock > 0 ? "✅ Available" : "❌ unavailable"}
                  </span>
                  {productDetails.countInStock > 0 && (
                    <span className="text-sm text-[#9A8B7F] ml-2">
                     (Available quantity: {productDetails.countInStock})
                    </span>
                  )}
                </div>

                {/* الوصف */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[#473428] mb-2">Description</h3>
                  <p className="text-[#7A685D] leading-relaxed">
                    {productDetails.description || "there is no description for this product."}
                  </p>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-[#E5DFD3]">
                <button
                  onClick={() => handleAddToCart(productDetails, 1)}
                  disabled={productDetails.countInStock === 0}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#B8860B] text-white py-3 rounded-xl font-medium hover:bg-[#966907] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                {/* <button
                  className="px-6 py-3 border border-[#E5DFD3] rounded-xl hover:bg-[#FAF7F2] transition-colors"
                >
                  ♡ أضف إلى المفضلة
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;