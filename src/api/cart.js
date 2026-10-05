
import api from "./axios"

// Add a product to the cart
// (productId, quantity) => data

export const addToCart = (data) => api.post("/cart/items", data);
export const getCartItems = () => api.get("/cart");
export const updateQuantity = (productId, data) => api.patch(`/cart/items/${productId}`, data);
export const deleteCartItem = (productId) => api.delete(`/cart/items/${productId}`);
export const clearCart = () => api.delete("/cart");

// في الرابط (URL): يذهب المعامل الأول productId.
//في الـ Body: يذهب المعامل الثاني data ليصبح { "quantity": 3 }.