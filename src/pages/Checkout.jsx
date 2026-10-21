import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders'; 
import { clearCart, selectCartItems } from '../redux/cartSlice'; // استوردنا selectCartItems و clearCart
import { MapPin, Phone, CreditCard, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // بنجيب السلة بنفس الطريقة اللي في صفحة Cart
  const cartItems = useSelector(selectCartItems);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    phone: '',
  });

  // حساب الإجمالي
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + (price * item.quantity);
  }, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return setError('Your cart is empty.');

    setLoading(true);
    setError('');

    try {
      // تجهيز الداتا بالشكل اللي الباك إند بتاعنا بيستقبله
      const orderData = {
        items: cartItems.map(item => ({
          product: item.product._id || item.product.id, // الـ ID بتاع المنتج
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.quantity
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
        },
        paymentMethod: "Cash on Delivery",
        totalPrice: totalPrice
      };

      await createOrder(orderData);
      setSuccess(true);
      
      // مسح السلة بعد نجاح الطلب
      dispatch(clearCart());

      setTimeout(() => {
        navigate('/'); 
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0]">
        <div className="text-center p-10 bg-white rounded-2xl border border-[#E5DFD3] shadow-sm max-w-md w-full">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-3xl font-serif font-bold text-[#2C2A29] mb-2">Order Placed!</h2>
          <p className="text-gray-500">Your order has been successfully created.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] py-12 px-4" dir="ltr">
      <div className="max-w-5xl mx-auto">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#2C2A29] mb-6 transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Cart
        </button>

        <h1 className="text-3xl font-serif font-bold text-[#2C2A29] mb-8">Checkout</h1>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 border border-red-100">{error}</div>}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* فورم الشحن */}
          <div className="flex-1 bg-white p-8 rounded-2xl border border-[#E5DFD3] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#2C2A29] mb-6 flex items-center gap-2 pb-3 border-b border-[#E5DFD3]">
              <MapPin size={20} className="text-[#B8860B]"/> Shipping Details
            </h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#E5DFD3] rounded-xl focus:ring-2 focus:ring-[#B8860B] focus:outline-none transition-all" placeholder="123 Main St" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#E5DFD3] rounded-xl focus:ring-2 focus:ring-[#B8860B] focus:outline-none transition-all" placeholder="Cairo" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-[#F9F6F0] border border-[#E5DFD3] rounded-xl focus:ring-2 focus:ring-[#B8860B] focus:outline-none transition-all" placeholder="010XXXXXXXX" />
                </div>
              </div>

              <div className="pt-5 border-t border-[#E5DFD3]">
                <h3 className="font-medium text-[#2C2A29] mb-3 flex items-center gap-2">
                  <CreditCard size={18} className="text-[#B8860B]"/> Payment Method
                </h3>
                <div className="p-4 bg-[#F9F6F0] rounded-xl border border-[#E5DFD3] text-sm text-gray-600 font-medium">
                  Cash on Delivery (COD)
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full mt-4 bg-[#2C2A29] text-white py-3.5 rounded-xl font-medium hover:bg-[#B8860B] transition-colors shadow-sm disabled:opacity-50">
                {loading ? 'Processing...' : `Place Order ($${totalPrice.toFixed(2)})`}
              </button>
            </form>
          </div>

          {/* ملخص السلة */}
          <div className="lg:w-96 bg-white p-8 rounded-2xl border border-[#E5DFD3] shadow-sm h-fit">
            <h2 className="text-xl font-serif font-bold text-[#2C2A29] mb-6 flex items-center gap-2 pb-3 border-b border-[#E5DFD3]">
              <ShoppingBag size={20} className="text-[#B8860B]"/> Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    {/* بنجيب الصورة بالشكل الصح من الـ product */}
                    <img src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${item.product?.image}`} alt={item.product?.name} className="w-14 h-14 rounded-xl object-cover border border-[#E5DFD3] bg-[#F9F6F0]" />
                    <div>
                      <p className="font-serif font-semibold text-[#2C2A29]">{item.product?.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-[#B8860B]">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5DFD3] pt-4 flex justify-between items-center">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-xl font-serif font-bold text-[#B8860B]">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;