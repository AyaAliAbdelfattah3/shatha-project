import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  deleteCartItem,
  fetchCart,
  updateQuantity,
  selectCartItems,
  selectCartTotal,
} from "../redux/cartSlice";

const SERVER_ORIGIN = import.meta.env.VITE_API_URL.replace("/api", "");

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);
  const { status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // كل دوسة على +/- بتبعت طلب للسيرفر على طول
  const handleQuantityChange = (productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    dispatch(updateQuantity({ productId, quantity: newQty }));
  };

  const handleRemove = (productId) => {
    dispatch(deleteCartItem(productId));
  };

  if (status === "loading" && items.length === 0) {
    return <div className="text-center py-10 font-bold">Loading your cart...</div>;
  }

  if (status === "failed") {
    return <div className="text-center py-10 text-red-500 font-bold">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] py-12 px-4 sm:px-6 lg:px-8 text-[#333333]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b border-[#E5DFD3] pb-6 mt-25 ">
          <h1 className="text-3xl font-serif font-bold text-[#2C2A29]">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-2xl border border-[#E5DFD3] shadow-sm max-w-4xl mx-auto mt-10">
            <p className="text-lg text-red-500 font-serif my-4 font-semibold"> 🛒 Your cart is empty 🛒</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-[#E5DFD3] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#B8860B] text-white font-serif">
                      <tr>
                        <th className="p-4">Product</th>
                        <th className="p-4 text-center">Price</th>
                        <th className="p-4 text-center">Quantity</th>
                        <th className="p-4 text-center">Subtotal</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5DFD3]">
                      {items.map((singleItem) => {
                        const product = singleItem.product || {};
                        const productId = product._id || product.id;

                        return (
                          <tr key={productId} className="hover:bg-[#F9F6F0]/50 transition-colors">
                            <td className="p-4 flex items-center gap-4">
                              <img
                                src={`${SERVER_ORIGIN}${product.image}`}
                                alt={product.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-[#F0EAE1] bg-[#F9F6F0]"
                              />
                              <div>
                                <h3 className="font-serif font-semibold text-base text-[#2C2A29]">
                                  {product.name}
                                </h3>
                              </div>
                            </td>

                            <td className="p-4 text-center font-bold text-[#B8860B] whitespace-nowrap">
                              ${product.price}
                            </td>

                            <td className="p-4 text-center">
                              <div className="inline-flex items-center border border-[#E5DFD3] rounded-full bg-[#F9F6F0] p-1">
                                <button
                                  onClick={() => handleQuantityChange(productId, singleItem.quantity, -1)}
                                  className="w-8 h-8 rounded-full bg-white text-[#2C2A29] font-bold shadow-sm hover:bg-[#B8860B] hover:text-white transition-colors flex items-center justify-center cursor-pointer active:scale-90"
                                >
                                  -
                                </button>

                                <span className="px-4 font-semibold text-sm">
                                  {singleItem.quantity}
                                </span>

                                <button
                                  onClick={() => handleQuantityChange(productId, singleItem.quantity, 1)}
                                  className="w-8 h-8 rounded-full bg-white text-[#2C2A29] font-bold shadow-sm hover:bg-[#B8860B] hover:text-white transition-colors flex items-center justify-center cursor-pointer active:scale-90"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            <td className="p-4 text-center font-bold text-[#2C2A29] whitespace-nowrap">
                              ${((product.price || 0) * singleItem.quantity).toFixed(2)}
                            </td>

                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleRemove(productId)}
                                className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors px-2 py-1 cursor-pointer"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-sm font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-colors border border-red-200 cursor-pointer"
                >
                  Clear All Items
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl border border-[#E5DFD3] shadow-sm space-y-4">
                <h2 className="text-xl font-serif font-bold text-[#2C2A29] border-b border-[#E5DFD3] pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <h3 className="text-xl font-serif font-bold text-[#B8860B]">
                      ${totalPrice.toFixed(2)}
                    </h3>
                  </div>
                </div>

                <button 
                  className="w-full bg-[#2C2A29] text-white py-3 rounded-xl font-medium hover:bg-[#B8860B] transition-colors shadow-sm mt-4 cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

 export default Cart;