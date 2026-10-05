//ملف خاص بالاتصال بال server الخاص بال productd
//A file related to connecting to the products' server


import api from "./axios"


export const getProducts = (params = {}) => api.get("/products" , {params})
// البارامترات المتاحة: category, priceMin, priceMax, sort, search, page, limit, featured





export const getCategories = () => api.get("/products/categories/list")
export const getFeaturedProducts = () => api.get("/products" , {params : {featured : true , limit:4}})
export const getLatestProducts = () => api.get("/products" , {params : {sort : "newest" , limit:4}})



//search

export const searchProducts = (searchTerm) => api.get("/products" , {params:{search : searchTerm}})
export const detailsProducts = (id) => api.get(`/products/${id}`)



// --- Admin Endpoints ---

// 1. إضافة منتج
export const createProduct = (productData) => {
  const isFormData = productData instanceof FormData;
  return api.post("/products", productData, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });
};

// 2. تعديل منتج
export const updateProduct = (id, productData) => {
  const isFormData = productData instanceof FormData;
  return api.put(`/products/${id}`, productData, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });
};

// 3. حذف منتج
export const deleteProduct = (id) => api.delete(`/products/${id}`); 