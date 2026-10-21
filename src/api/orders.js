import api from "./axios";

export const getAllOrders = () => api.get("/orders");
export const updateOrderStatus = (orderId, status) => api.patch(`/orders/${orderId}/status`, { status });
export const deleteOrder = (orderId) => api.delete(`/orders/${orderId}`);

// دالة إنشاء طلب جديد
export const createOrder = (orderData) => api.post("/orders", orderData);